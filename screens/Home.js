import { View, Text, StyleSheet, Pressable } from "react-native";
import { deleteProfile, updateProfile } from "../utills/storage";

export const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.info}>Home</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Profile")}>
        <Text style={styles.buttonText}>View profile</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => deleteProfile()}>
        <Text style={styles.buttonText}>Log out</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fefefe",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
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
