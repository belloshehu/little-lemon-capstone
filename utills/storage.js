import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateProfile = async (profile) => {
  try {
    const jsonValue = JSON.stringify(profile);
    await AsyncStorage.setItem("profile", jsonValue);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProfile = async () => {
  try {
    await AsyncStorage.removeItem("profile");
  } catch (error) {
    console.log(error);
  }
};
