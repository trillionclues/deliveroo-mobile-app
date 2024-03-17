import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "expo-router";
import categories from "@/assets/data/filter.json";
import ListRenderItem from "@/components/ListRenderItem";
import ItemBox from "@/components/ItemBox";
import { CategoryData } from "@/types/Category";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Filter = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<CategoryData[]>(categories);
  const [selected, setSelected] = useState<CategoryData[]>([]);
  const flexWidth = useSharedValue(0);
  const scale = useSharedValue(0);

  const handleClearAll = () => {
    const updatedItems = items.map((item) => {
      item.checked = false;
      return item;
    });
    setItems(updatedItems);
  };

  useEffect(() => {
    const hasSelected = selected.length > 0;
    const selectedItems = items.filter((item) => item.checked);
    const newSelected = selectedItems.length > 0;

    if (hasSelected !== newSelected) {
      flexWidth.value = withTiming(newSelected ? 150 : 0);
      scale.value = withTiming(newSelected ? 1 : 0);
    }
    setSelected(selectedItems);
  }, [items]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: flexWidth.value,
      // opacity: flexWidth.value > 0 ? 1 : 0,
      display: flexWidth.value > 0 ? "flex" : "none",
    };
  });
  const animatedText = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={items}
        renderItem={({ item }) => (
          <ListRenderItem item={item} itemList={items} setItemList={setItems} />
        )}
        ListHeaderComponent={ItemBox}
      />
      <View style={{ height: 80 }} />

      <View style={styles.footer}>
        <View style={styles.btnContainer}>
          <Animated.View style={[animatedStyles, styles.outlineButton]}>
            <TouchableOpacity onPress={handleClearAll}>
              <Animated.Text style={[animatedText, styles.outlineBtnText]}>
                Clear All
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.footerText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.lightGray,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    padding: 10,
    elevation: 5,
    shadowOpacity: 0.1,
    shadowColor: Colors.light.text,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: Colors.light.background,
  },
  doneButton: {
    flex: 1,
    height: 56,
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  footerText: {
    color: Colors.light.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  btnContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  outlineButton: {
    borderColor: Colors.primary,
    borderWidth: 0.5,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 56,
  },
  outlineBtnText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    padding: 16,
  },
});

export default Filter;
