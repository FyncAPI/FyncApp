import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Friend, FriendsData, Memory, UserData } from "./types";

interface UserContextInterface {
  userData: UserData;
  isRegistered: boolean;

  addMemory: (friend: Friend, memory: Memory) => void;

  favoriteFriend: (friend: Friend) => void;
  unfavoriteFriend: (friendId: Friend["id"]) => void;

  saveUserData: (user: UserData) => void;
  saveFriendsData: (friendsData: FriendsData) => void;
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
  useEffect(() => {
    getUserData();
  }, []);

  const saveUserData = (user: UserData) => {
    if (!user) return;
    // save user to async storage
    saveValueAsync("user", user);
    setIsRegistered(true);

    setUserData(user);
  };

  const saveFriendsData = (friendsData: FriendsData) => {
    if (!friendsData) return;
    // save user to async storage
    saveValueAsync("friendsData", friendsData);

    // setFriends(friendsData.friends);
  };

  const deleteUserData = () => {
    // delete user from async storage
    saveValueAsync("user", "");
    setIsRegistered(false);
    setUserData({} as UserData);
  };

  const getUserData = async () => {
    const user = await AsyncStorage.getItem("@user");
    //console.log(user, "user");

    if (user && user != "{}") {
      const ud = JSON.parse(user);
      //console.log(ud, "UXD");
      setUserData(ud);
      setIsRegistered(true);
    } else {
      //console.log("no user found");
      setIsRegistered(false);
    }
  };

  const favoriteFriend = (friend: Friend) => {
    //console.log("favorite friend", friend);
    // if the friend is already favorited, remove them from the list
    if (userData?.favorites?.find((f) => f.id == friend.id)) {
      unfavoriteFriend(friend.id);
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

  const unfavoriteFriend = (friendId: Friend["id"]) => {
    //console.log("unfavorite friend", friendId);
    const newFriends = userData.favorites.filter((f) => f.id != friendId);

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

        addMemory,
        saveUserData,
        saveFriendsData,

        favoriteFriend,
        unfavoriteFriend,
        deleteUserData,
      }}
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
    //console.log("error saving value", e);
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
    //console.log("error getting value", e);
  }
};
