import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";

export const CategorySection = ({ menus }) => {
  const allCategories = menus.map((menu) => menu.category);
  const set = new Set(allCategories);
  const categories = [...set.keys()];

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>ORDER FOR DELIVERY</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.categoryWrapper}>
        {categories.map((category, index) => (
          <Pressable style={styles.category} key={index}>
            <Text style={styles.categoryText}>{category}</Text>
          </Pressable>
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
    paddingBottom: 5,
  },
  categoryWrapper: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
  },
  headingText: {
    fontSize: 24,
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
