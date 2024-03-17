import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const ItemBox = () => {
  return (
    <>
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="arrow-down-outline" size={20} color={Colors.medium} />

          <Text style={{ flex: 1 }}>Sort</Text>
          <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="fast-food-outline" size={20} color={Colors.medium} />
          <Text style={{ flex: 1 }}>Hygiene rating</Text>
          <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="pricetag-outline" size={20} color={Colors.medium} />
          <Text style={{ flex: 1 }}>Offers</Text>
          <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="nutrition-outline" size={20} color={Colors.medium} />
          <Text style={{ flex: 1 }}>Dietary</Text>
          <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.headerText}>Categories</Text>
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.light.background,
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  item: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: Colors.light.background,
    borderColor: Colors.grey,
    // remove border bottom from last item
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 16,
  },
});

export default ItemBox;
