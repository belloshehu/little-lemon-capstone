import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./navigators/stack";
import { useEffect, useState } from "react";
import { ProfileProvider } from "./context/profileContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen } from "./screens/SplashScreen";
import { MenuContextProvider } from "./context/menuContext";

export default function App() {
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const jsonValue = await AsyncStorage.getItem("profile");
        data = jsonValue === null ? null : JSON.parse(jsonValue);
        setProfile(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }
  return (
    <ProfileProvider>
      <MenuContextProvider>
        <NavigationContainer>
          <StackNavigator profile={profile} />
        </NavigationContainer>
      </MenuContextProvider>
    </ProfileProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
