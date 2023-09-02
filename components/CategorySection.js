import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useMenuContext } from "../context/menuContext";

export const CategorySection = ({ menus }) => {
  const { selectedCategories, setSelectedCategories, menuCategories } =
    useMenuContext();

  const addCategory = (category) => {
    if (selectedCategories.includes(category)) {
      const filteredCategories = selectedCategories.filter(
        (selectedCategory) =>
          selectedCategory.toLowerCase() !== category.toLowerCase()
      );
      setSelectedCategories(filteredCategories);
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>ORDER FOR DELIVERY</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.categoryWrapper}>
        {menuCategories.map((category, index) => (
          <TouchableOpacity
            style={{
              ...styles.category,
              backgroundColor: `${
                selectedCategories.includes(category) ? "#475e59" : "#ddd"
              }`,
            }}
            key={index}
            onPress={() => addCategory(category)}>
            <Text
              style={{
                ...styles.categoryText,
                color: `${
                  selectedCategories.includes(category) ? "#fff" : "#475e59"
                }`,
              }}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    borderColor: "#475e59",
    paddingBottom: 1,
  },
  categoryWrapper: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 6,
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#475e59",
  },
  category: {
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: "#ddd",
  },
  categoryText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#475e59",
  },
});
