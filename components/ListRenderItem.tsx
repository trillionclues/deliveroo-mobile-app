import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { CategoryItem } from "@/types/Category";

const ListRenderItem: React.FC<CategoryItem> = ({
  item,
  itemList,
  setItemList,
}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.itemText}>
        {item.name} ({item.count})
      </Text>
      <BouncyCheckbox
        fillColor={Colors.primary}
        disableBuiltInState={true}
        unfillColor={Colors.light.background}
        isChecked={item.checked}
        iconStyle={{
          borderColor: Colors.primary,
          borderRadius: 4,
          borderWidth: 2,
        }}
        innerIconStyle={{ borderRadius: 4 }}
        onPress={() => {
          const isChecked = item.checked;
          const updatedItems = itemList.map((listItem) => {
            if (listItem.name === item.name) {
              listItem.checked = !isChecked;
            }

            return listItem;
          });

          setItemList(updatedItems);
          // console.log(updatedItems);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },
  itemText: {
    flex: 1,
  },
});

export default ListRenderItem;
