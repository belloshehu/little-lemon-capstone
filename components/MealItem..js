import { useEffect } from "react";
import { View, Pressable, Text, Image, StyleSheet } from "react-native";

export const MealItem = ({ item }) => {
  const { name, description, image, price } = item;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.descriptionWrapper}>
        <View style={styles.descriptionTextWrapper}>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
          alt={name}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    rowGap: 10,
    backgroundColor: "white",
    paddingVertical: 10,
  },
  descriptionWrapper: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  descriptionTextWrapper: {
    rowGap: 5,
  },
  descriptionTextWrapper: {
    gap: 6,
    textAlign: "left",
    width: "60%",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  image: {
    resizeMode: "cover",
    borderRadius: 20,
    width: 120,
    height: 100,
  },
  description: {
    color: "#475e59",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#475e59",
  },
});
