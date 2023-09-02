import { StyleSheet, Image, View, Pressable } from "react-native";

export const Header = ({ navigation }) => {
  return (
    <View style={styles.wrapper}>
      <Image source={require("../assets/Logo.png")} style={styles.logo} />
      <Pressable
        onPress={() => {
          navigation.navigate("Profile");
        }}>
        <Image
          source={require("../assets/Profile.png")}
          style={styles.profile}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    columnGap: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    width: "100%",
    padding: 0,
  },
  logo: {
    resizeMode: "contain",
    height: 40,
  },
  profile: {
    resizeMode: "cover",
    width: 40,
    height: 40,
    borderRadius: 100,
  },
});
