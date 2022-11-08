import { View, Text } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import { Contact } from "expo-contacts";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Memory {
  id: string;
  images: string[];
  videos: string[];
  inviter: string;
  invitee: string;
  date: Date;
  location: string;
  description: string;
}

interface CallHistory {
  id: string;
  duration: number;
  date: Date;
  callerId: string;
  calleeId: string;
}

// export interface User {
//   id: string;
//   name: string;
//   nickname: string;
//   phoneNumber: string;
//   email: string;
//   birthdate: Date;
//   profileImage: string;
// }
export interface User extends Contact {
  // _id: string;
}

export interface Friend extends User {
  lastCalled?: Date;
  memories?: Memory[];
  recents?: CallHistory[];
  friendship: {
    level: number;
    points: number;
  };
}

export interface UserData {
  friends: Friend[];
  memories: Memory[];
  recents: CallHistory[];
  favorites: Friend[];
  suggestions: Friend[];
  profile: User;
}

interface UserContextInterface {
  userData: UserData;
  isRegistered: boolean;
  saveUserData: (user: UserData) => void;
  deleteUserData: () => void;
}

export const UserContext = createContext<UserContextInterface>(
  {} as UserContextInterface
);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<UserData>({} as UserData);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  useEffect(() => {
    // get user from async storage
    deleteUserData();
    // getUserData();
  }, []);

  const saveUserData = (user: UserData) => {
    // save user to async storage
    saveUser(user);
    setIsRegistered(true);

    setUserData(user);
  };

  const deleteUserData = () => {
    // delete user from async storage
    saveUser({} as UserData);
    setIsRegistered(false);
    setUserData({} as UserData);
  };

  const getUserData = async () => {
    const user = await AsyncStorage.getItem("@user");
    if (user) {
      const ud = JSON.parse(user);
      setUserData(ud);
      setIsRegistered(true);
    } else {
      console.log("no user found");
      setIsRegistered(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ userData, isRegistered, saveUserData, deleteUserData }}
    >
      {children}
    </UserContext.Provider>
  );
}

const saveUser = async (user: UserData) => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem("@user", jsonValue);
  } catch (e) {
    // saving error
    console.log("error saving user", e);
  }
};

const getValue = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading Value
    console.log("error getting value", e);
  }
};
