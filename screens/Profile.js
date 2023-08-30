import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import CheckBox from "react-native-check-box";
import { useState, useEffect } from "react";
import { SplashScreen } from "./SplashScreen";
import { useReadProfile } from "../utills/hooks";
import { Header } from "../components/Header";
import { PhotoPicker } from "../components/PhotoPicker";
import { deleteProfile, updateProfile } from "../utills/storage";
import { useProfileContext } from "../context/profileContext";

export const Profile = ({ navigation }) => {
  // const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { profile, setProfile } = useProfileContext();
  const getData = useReadProfile();
  const saveChanges = () => {
    updateProfile(profile);
  };

  useEffect(() => {
    const getProfile = async () => {
      const [data, loadingFlag] = await getData();
      setLoading(loadingFlag);
      setProfile(data);
    };
    getProfile();
  }, []);

  const logout = () => {
    deleteProfile();
    navigation.navigate("Onboarding");
  };
  if (loading) {
    return <SplashScreen />;
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Header /> */}
      <View style={styles.main}>
        <Text style={styles.headingText}>Personal information</Text>
        <PhotoPicker />
        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <Text>First Name</Text>
            <TextInput
              style={styles.input}
              value={profile?.personalInfo?.firstName}
              onChangeText={(firstName) =>
                setProfile((prev) => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, firstName },
                }))
              }
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text>Last Name</Text>
            <TextInput
              style={styles.input}
              value={profile?.personalInfo?.lastName}
              onChangeText={(lastName) =>
                setProfile((prev) => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, lastName },
                }))
              }
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              value={profile?.personalInfo?.email}
              onChangeText={(email) =>
                setProfile((prev) => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, email },
                }))
              }
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text>Phone number</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              value={profile?.personalInfo?.phoneNumber}
              onChangeText={(phoneNumber) =>
                setProfile((prev) => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, phoneNumber },
                }))
              }
            />
          </View>
        </View>
        <View style={{ gap: 6 }}>
          <Text style={{ ...styles.headingText, marginBottom: 5 }}>
            Email notifications
          </Text>
          <View style={styles.checkboxWrapper}>
            <CheckBox
              isChecked={profile?.emailNotification?.orderStatuses}
              onClick={() => {
                setProfile((prev) => ({
                  ...prev,
                  emailNotification: {
                    ...prev.emailNotification,
                    orderStatuses: !prev?.emailNotification?.orderStatuses,
                  },
                }));
              }}
              style={{ flex: 1, padding: 0 }}
              rightText="Order Statuses"
            />
          </View>

          <View style={styles.checkboxWrapper}>
            <CheckBox
              style={{ flex: 1, padding: 0 }}
              isChecked={profile?.emailNotification?.passwordChange}
              onClick={() => {
                setProfile((prev) => ({
                  ...prev,
                  emailNotification: {
                    ...prev.emailNotification,
                    passwordChange: !prev?.emailNotification?.passwordChange,
                  },
                }));
              }}
              rightText={"Password Changes"}
            />
          </View>
          <View style={styles.checkboxWrapper}>
            <CheckBox
              style={{ flex: 1 }}
              isChecked={profile?.emailNotification?.specialOffer}
              onClick={() => {
                setProfile((prev) => ({
                  ...prev,
                  emailNotification: {
                    ...prev.emailNotification,
                    specialOffer: !prev?.emailNotification?.specialOffer,
                  },
                }));
              }}
              rightText="Special offer"
            />
          </View>
          <View style={styles.checkboxWrapper}>
            <CheckBox
              style={{ flex: 1 }}
              isChecked={profile?.emailNotification?.newsletter}
              onClick={() => {
                setProfile((prev) => ({
                  ...prev,
                  emailNotification: {
                    ...prev.emailNotification,
                    newsletter: !prev?.emailNotification?.newsletter,
                  },
                }));
              }}
              rightText="Newsletter"
            />
          </View>
        </View>
        <Pressable
          style={{
            ...styles.button,
            backgroundColor: "#F4CE14",
            width: "100%",
          }}
          onPress={logout}>
          <Text style={{ ...styles.buttonText, color: "black" }}>Log out</Text>
        </Pressable>
        <View style={styles.updateButtonsWrapper}>
          <Pressable
            style={{
              ...styles.button,
              backgroundColor: "white",
              color: "#475e59",
              borderWidth: 1,
              borderColor: "#475e59",
            }}>
            <Text style={{ ...styles.buttonText, color: "#475e59" }}>
              Discard Change
            </Text>
          </Pressable>
          <Pressable
            style={{
              ...styles.button,
            }}
            onPress={saveChanges}>
            <Text style={{ ...styles.buttonText }}>Save changes</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#fefefe",
    backfaceVisibility: "visible",
    color: "white",
    padding: 5,
  },
  info: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  main: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: "#475e59",
    borderRadius: 10,
    padding: 10,
    gap: 4,
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    textAlign: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#495e57",
    marginLeft: "auto",
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  input: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    width: "100%",
    marginVertical: 5,
  },
  inputWrapper: {
    width: "100%",
    paddingVertical: 5,
  },
  checkboxWrapper: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginVertical: 2,
  },
  updateButtonsWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 20,
  },
});
