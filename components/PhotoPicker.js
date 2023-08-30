import * as ImagePicker from "expo-image-picker";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { updateProfile } from "../utills/storage";
import { useProfileContext } from "../context/profileContext";
import * as Permissions from "expo-permissions";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";

async function askForPermissions() {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.CAMERA_ROLL
  );
  if (status !== "granted") {
    Alert.alert("Error", "You did not give the right to create a photo");
    return false;
  }
  return true;
}

export const PhotoPicker = () => {
  const [photo, setPhoto] = useState(null);
  const { profile, setProfile } = useProfileContext();

  const snapPhoto = async () => {
    const hasPermissions = await askForPermissions();

    if (!hasPermissions) {
      return;
    }

    const img = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      aspect: [16, 9],
      allowsEditing: false,
      base64: true,
    });

    // manipulate image
    if (!img.canceled) {
      const manipImg = await manipulateAsync(
        img.assets[0].uri,
        [{ resize: { height: 500, width: 500 } }],
        { compress: 1, format: SaveFormat.PNG }
      );
      setPhoto(manipImg.assets[0].uri);
    }

    const profileWithPhoto = {
      ...profile,
      personalInfo: {
        ...profile.personalInfo,
        photo: manipImg.assets[0].uri,
      },
    };
    setProfile(profileWithPhoto);
    updateProfile(profileWithPhoto);
  };

  const removePhoto = () => {
    const newProfile = { ...profile, photo: null };
    updateProfile(newProfile);
    setPhoto(null);
  };
  return (
    <View style={styles.profilePictureWrapper}>
      {photo ? (
        <Image source={{ uri: photo }} style={styles.profilePhoto} />
      ) : (
        <Pressable
          style={{
            width: 80,
            height: 80,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#475e59",
            position: "relative",
            borderWidth: 2,
            borderColor: "#F4CE14",
          }}
          onPress={snapPhoto}>
          <Text style={styles.picPlaceholder}>
            {profile?.personalInfo?.firstName.slice(0, 1)}
            {profile?.personalInfo?.lastName?.slice(0, 1) ??
              profile?.personalInfo?.firstName.slice(0, 1)}
          </Text>
          <Feather
            name="camera"
            size={24}
            color="#F4CE14"
            style={{ position: "absolute", top: 1, left: 1 }}
          />
        </Pressable>
      )}

      <Pressable style={styles.button} onPress={snapPhoto}>
        <Text style={styles.buttonText}>Change</Text>
      </Pressable>
      <Pressable
        style={{
          ...styles.button,
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "#000",
        }}
        onPress={removePhoto}>
        <Text
          style={{
            ...styles.buttonText,
            color: "#475e59",
          }}>
          Remove
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profilePictureWrapper: {
    gap: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  picPlaceholder: {
    fontSize: 34,
    fontWeight: "bold",
    borderRadius: 100,
    color: "white",
    textAlign: "center",
  },
  profilePhoto: {
    resizeMode: "cover",
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#F4CE14",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  button: {
    textAlign: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#495e57",
    marginVertical: 20,
  },
});
