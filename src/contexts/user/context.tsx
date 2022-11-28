import { View, Text } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Friend, UserData } from "./types";

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
    // deleteUserData();
    getUserData();
  }, []);

  const saveUserData = (user: UserData) => {
    // save user to async storage
    saveValueAsync("user", user);
    setIsRegistered(true);

    setUserData(user);
  };

  const deleteUserData = () => {
    // delete user from async storage
    saveValueAsync("user", "");
    setIsRegistered(false);
    setUserData({} as UserData);
  };

  const getUserData = async () => {
    const user = await AsyncStorage.getItem("@user");
    console.log(user, "user");

    if (user && user != "{}") {
      const ud = JSON.parse(user);
      console.log(ud, "UXD");
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

const saveValueAsync = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@" + key, jsonValue);
  } catch (e) {
    // saving error
    console.log("error saving value", e);
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
