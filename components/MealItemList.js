import { FlatList, View, StyleSheet } from "react-native";
import { MealItem } from "./MealItem.";
import { CategorySection } from "./CategorySection";

const Separator = () => <View style={styles.separator}></View>;

export const MealItemList = ({ menuData }) => {
  return (
    <FlatList
      ListHeaderComponent={<CategorySection menus={menuData} />}
      keyExtractor={(item) => item.name}
      renderItem={MealItem}
      data={menuData}
      ItemSeparatorComponent={Separator}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    borderWidth: 0.5,
    borderColor: "#ddd",
  },
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 20,
  },
});
