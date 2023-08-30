import { useState } from "react";
import { createContext, useContext } from "react";

const ProfileContext = createContext({});

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      photo: "",
      email: "",
      phoneNumber: "",
    },
    emailNotification: {
      orderStatuses: false,
      passwordChanges: false,
      specialOffer: false,
      newsletter: false,
    },
  });

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile: (newProfile) => {
          setProfile(newProfile);
        },
      }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);
