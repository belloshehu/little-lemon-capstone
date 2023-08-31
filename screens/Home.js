import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { CategorySection } from "../components/CategorySection";
import { MealItemList } from "../components/MealItemList";
import { useLayoutEffect, useState } from "react";
import { createTable, getMenuItems, saveMenuItems } from "../database";

const mealsData = [
  {
    name: "Buretta",
    price: 20,
    category: "Starters",
    id: 1,
  },
  {
    name: "Pasta",
    price: 20.99,
    category: "Mains",
    id: 1,
  },
  {
    name: "Greek salad",
    price: 20,
    category: "Deserts",
    id: 1,
  },
];
const categories = mealsData.map((meal) => meal.category);

export const Home = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
      );
      const jsonData = await response.json();
      return jsonData.menu;
    } catch (error) {
      console.log("Error occured: " + error);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    (async () => {
      try {
        await createTable();
        setLoading(true);
        let items = await getMenuItems();
        if (items.length === 0) {
          items = await fetchData();
          saveMenuItems(items);
        }
        setMenuItems(items);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.heroSection}>
        <Text style={styles.heroHeadingText}>Little lemon</Text>
        <View style={styles.heroImageSection}>
          <View style={styles.heroDescriptionWrapper}>
            <Text style={styles.heroSubText}>Chicago</Text>
            <Text style={styles.heroDescriptionText}>
              We are a family owned Mediterranean restaurant, focused on
              tradional recipes served with modern twist.
            </Text>
          </View>
          <Image
            source={require("../assets/hero-image.png")}
            style={styles.heroImage}
          />
        </View>
        <View style={styles.inputWrapper}>
          <AntDesign name="search1" size={24} color="black" />
          <TextInput placeholder="Search for a meal" style={styles.input} />
        </View>
      </View>

      {loading ? (
        <View style={styles.indicatorWrapper}>
          <ActivityIndicator />
        </View>
      ) : (
        <MealItemList menuData={menuItems} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    paddingVertical: 10,
    paddingRight: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 10,
  },
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fefefe",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  heroSection: {
    backgroundColor: "#475e59",
    width: "100%",
    gap: 5,
    padding: 20,
  },
  heroHeadingText: {
    fontSize: 40,
    color: "#F4CE14",
    fontWeight: "bold",
  },
  heroImageSection: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  heroImage: {
    borderRadius: 20,
    resizeMode: "cover",
    width: 120,
    height: 150,
  },
  heroDescriptionWrapper: {
    gap: 10,
    textAlign: "left",
    width: "55%",
  },
  heroDescriptionText: {
    fontSize: 16,
    color: "#fff",
  },
  heroSubText: {
    color: "#fefefe",
    fontSize: 24,
    fontWeight: "bold",
  },
  info: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    padding: 15,
    backgroundColor: "#495e57",
    textAlign: "center",
  },
  buttonText: {
    color: "white",
  },
});
