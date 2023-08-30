import { StyleSheet, Image, View } from "react-native";

export const Header = () => (
  <View style={styles.wrapper}>
    <Image source={require("../assets/Logo.png")} style={styles.logo} />
    <Image source={require("../assets/Profile.png")} style={styles.profile} />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  logo: {
    resizeMode: "cover",
    width: 100,
    height: 30,
  },
  profile: {
    resizeMode: "contain",
    width: 40,
    height: 40,
    borderRadius: 100,
  },
});
