import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Friend, FriendsData, Memory, UserData } from "./types";
import { useContact } from "../../hooks/useContact";
import { Contact } from "expo-contacts";
import {
  clearAllStorage,
  getUserDataAS,
  saveUserDataAS,
} from "../AsyncStorageService";

interface UserContextInterface {
  userData: UserData;
  isRegistered: boolean;

  contacts: Contact[];

  addMemory: (friend: Friend, memory: Memory) => void;

  favoriteFriend: (friend: Friend) => void;
  unfavoriteFriend: (friendId: Friend["contactId"]) => void;

  saveUserData: (user: UserData, stopLoading?: () => void) => void;

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
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const { contacts } = useContact();

  useEffect(() => {
    console.log(isRegistered, userData, "is registered");
  }, [isRegistered]);

  useEffect(() => {
    getUserData();
    console.log("user context mounted");
  }, []);

  const saveUserData = (user: UserData, stopLoading?: () => void) => {
    console.log(user, "user");
    stopLoading && stopLoading();

    if (!user) return null;
    // save user to async storage
    saveUserDataAS(user);
    setIsRegistered(true);

    setUserData(user);
  };

  const deleteUserData = () => {
    // delete user from async storage
    clearAllStorage();
    setIsRegistered(false);
    setUserData({} as UserData);
  };

  const getUserData = async () => {
    const user = await getUserDataAS();
    console.log(user, "user");

    const ud: UserData = JSON.parse(user || "{}");
    if (user && user.length > 3) {
      console.log(user.length, "UXD");
      setUserData(ud);
      setIsRegistered(true);
    } else {
      setIsRegistered(false);
    }
  };

  const favoriteFriend = (friend: Friend) => {
    //console.log("favorite friend", friend);
    // if the friend is already favorited, remove them from the list
    if (userData?.favorites?.find((f) => f.contactId == friend.contactId)) {
      unfavoriteFriend(friend.contactId);
      return;
    }

    const newFriends =
      userData?.favorites?.length > 0
        ? [...userData?.favorites, friend]
        : [friend];

    saveUserData({
      ...userData,
      favorites: newFriends,
    });
  };

  const unfavoriteFriend = (friendId: Friend["contactId"]) => {
    //console.log("unfavorite friend", friendId);
    const newFriends = userData.favorites.filter(
      (f) => f.contactId != friendId
    );

    saveUserData({
      ...userData,
      favorites: newFriends,
    });
  };
  const addMemory = (friend: Friend, memory: Memory) => {};

  return (
    <UserContext.Provider
      value={{
        userData,
        isRegistered,
        contacts,

        addMemory,
        saveUserData,

        favoriteFriend,
        unfavoriteFriend,
        deleteUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
