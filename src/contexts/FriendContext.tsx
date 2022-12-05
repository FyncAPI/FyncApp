import AsyncStorage from "@react-native-async-storage/async-storage";
import { PhoneNumber } from "expo-contacts";
import { createContext, useEffect, useRef, useState } from "react";
import { AppState, Linking } from "react-native";
import { useUserContext } from "../hooks";
import { Friend, FriendsData } from "./user/types";

interface FriendContextInterface {
  friends: Friend[];
  updateFriends: (friends: Friend[]) => void;
  //   saveFriendsData: (friendsData: FriendsData) => void;

  addFriend: (friend: Friend) => void;
  removeFriend: (friendId: Friend["id"]) => void;

  //   favoriteFriend: (friend: Friend) => void;
  //   unfavoriteFriend: (friendId: Friend["id"]) => void;

  callFriend: (
    phoneNumbers: Friend["phoneNumbers"],
    friendId: Friend["id"]
  ) => void;
  //   setFriends: (friends: Friend[]) => void;
  //   increaseFriendship: (friendId: Friend["id"]) => void;
}
export const FriendContext = createContext({} as FriendContextInterface);

export const FriendContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { saveFriendsData } = useUserContext();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isCalling, setIsCalling] = useState<Friend["id"]>("");
  const [appStateArr, setAppStateArr] = useState([AppState.currentState]);
  const [finishedCall, setFinishedCall] = useState(false);

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    let arr: string[] = [];
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/background/) &&
        arr.length > 3 &&
        arr[arr.length - 3] === "active" &&
        arr[arr.length - 2] === "inactive" &&
        // appStateArr[appStateArr.length - 3] === "active" &&
        // appStateArr[appStateArr.length - 2] === "inactive" &&
        // appStateArr[appStateArr.length - 1] === "background" &&
        nextAppState === "active"
      ) {
        console.log("finished calling mannn", arr);
        setFinishedCall(true);
        // increaseFriendship(isCalling);
        // setIsCalling("");
        arr = [];
      }

      appState.current = nextAppState;
      arr.push(nextAppState);
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    console.log("getting friends");
    getFriendsData();
  }, []);

  useEffect(() => {
    if (finishedCall && isCalling) {
      increaseFriendship(isCalling);
      setIsCalling("");
      setFinishedCall(false);
    }
  }, [finishedCall]);

  const updateFriends = async (newfriends: Friend[]) => {
    // merge new friends with old friends
    const newFriendsData: FriendsData = {
      friends: newfriends.map((friend) => {
        const oldFriend = friends.find((f) => f.id === friend.id);
        if (oldFriend) {
          return oldFriend;
        }
        return friend;
      }),
    };
    setFriends(newFriendsData.friends);
    saveFriendsData(newFriendsData);
  };

  const getFriendsData = async () => {
    try {
      const friendsData = await AsyncStorage.getItem("@friendsData");
      console.log(friendsData, "friendsData");
      if (friendsData) {
        const parsedFriendsData = JSON.parse(friendsData);

        setFriends(parsedFriendsData.friends);
      }
    } catch (error) {
      console.log("cant get friends Data", error);
    }
  };

  const increaseFriendship = (friendId: Friend["id"]) => {
    console.log("increase friendship", friendId);
    const newFriends = friends.map((f) => {
      if (f.id == friendId) {
        return {
          ...f,
          friendship: {
            ...f.friendship,
            points: f.friendship.points + 1,
          },
        };
      }
      return f;
    });

    setFriends(newFriends);
  };

  const addFriend = (friend: Friend) => {
    setFriends((prev) => [...prev, friend]);
  };

  const removeFriend = (friendId: Friend["id"]) => {
    setFriends((prev) => prev.filter((friend) => friend.id !== friendId));
  };

  const callFriend = async (
    phoneNumbers: Friend["phoneNumbers"],
    friendId: Friend["id"]
  ) => {
    try {
      const res = await Linking.openURL(
        "tel://" +
          (phoneNumbers?.find((x) => x.isPrimary)?.number ||
            phoneNumbers?.[0]?.number)
      );
      //console.log(res, "call res", appStateArr);
      setIsCalling(friendId);
    } catch (e) {
      //console.log("cannot call", e);
    }
  };

  return (
    <FriendContext.Provider
      value={{
        friends,
        updateFriends,
        //   saveFriendsData,

        addFriend,
        removeFriend,

        callFriend,
      }}
    >
      {children}
    </FriendContext.Provider>
  );
};
