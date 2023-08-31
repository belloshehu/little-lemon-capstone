import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { Onboarding } from "../screens/Onboarding";
import { Profile } from "../screens/Profile";
import { Image, StyleSheet, View } from "react-native";
import { Header } from "../components/Header";

const Stack = createNativeStackNavigator();
export const StackNavigator = ({ profile }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: (props) => (
          <View {...props}>
            <Image source={require("../assets/Logo.png")} style={styles.logo} />
          </View>
        ),
      }}
      initialRouteName={profile ? "Home" : "Onboarding"}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "",
          headerTitle: (props) => (
            <View style={styles.wrapper}>
              <Image
                source={require("../assets/Logo.png")}
                style={styles.logo}
              />
              <Image
                source={require("../assets/Profile.png")}
                style={styles.profilePic}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    padding: 5,
    paddingHorizontal: 20,
  },
  profilePic: {
    height: 50,
    width: 50,
    resizeMode: "cover",
  },
  logo: { resizeMode: "cover" },
});
