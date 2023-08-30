import { StyleSheet, View, Text, Image } from "react-native";

export const SplashScreen = () => (
  <View style={styles.container}>
    <Image style={styles.logo} source={require("../assets/Logo.png")} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    resizeMode: "cover",

    width: 300,
  },
});
