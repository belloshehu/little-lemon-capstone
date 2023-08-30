import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { validateEmail } from "../utills";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useProfileContext } from "../context/profileContext";

export const Onboarding = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { setProfile } = useProfileContext();
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    email: "",
  });

  const createProfile = async () => {
    setLoading(true);
    try {
      const profile = { personalInfo };
      const stringifiedValue = JSON.stringify(profile);
      await AsyncStorage.setItem("profile", stringifiedValue);
      setProfile(profile);
      navigation.navigate("Profile");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.info}>Let us get to know you</Text>

      <Image
        source={require("../assets/hero-image.png")}
        alt="hero"
        resizeMode="cover"
        style={styles.heroImage}
      />

      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Text>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Type First name"
            keyboardType="default"
            value={personalInfo.firstName}
            onChangeText={(firstName) => {
              setPersonalInfo((prev) => ({
                ...prev,
                firstName,
              }));
            }}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Type email"
            value={personalInfo.email}
            onChangeText={(email) =>
              setPersonalInfo((prev) => ({
                ...prev,
                email,
              }))
            }
          />
        </View>
        <Pressable
          style={
            validateEmail(personalInfo.email) &&
            personalInfo.firstName.length > 0
              ? styles.button
              : { ...styles.button, backgroundColor: "#aaaaaa" }
          }
          onPress={createProfile}
          disabled={
            !validateEmail(personalInfo.email) &&
            !personalInfo.firstName.length > 0
          }>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.buttonText}>Next</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef",
    justify: "center",
    alignItems: "center",
    padding: 20,
    paddingVertical: 30,
    gap: 10,
    width: "100%",
  },
  logo: {
    height: 40,
  },
  info: {
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 30,
    textAlign: "center",
    color: "#495e57",
  },
  heroImage: {
    width: 320,
    height: 150,
    borderRadius: 20,
  },
  input: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 0,
    width: "100%",
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 1,
    shadowOpacity: 0.1,
  },
  inputWrapper: {
    width: "100%",
    paddingVertical: 5,
  },
  form: {
    width: "100%",
    marginVertical: 20,
  },
  button: {
    textAlign: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#495e57",
    width: "50%",
    marginLeft: "auto",
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
