import AsyncStorage from "@react-native-async-storage/async-storage";
import { Contact, PhoneNumber } from "expo-contacts";
import { createContext, useEffect, useRef, useState } from "react";
import { AppState, Linking } from "react-native";
import { useUserContext } from "../hooks";
import { useFriends } from "../hooks/useFriends";
import { Friend, FriendsData } from "./user/types";

interface FriendContextInterface {
  friends: Friend[];
  updateFriends: (friends: Friend[]) => void;
  //   saveFriendsData: (friendsData: FriendsData) => void;

  addFriends: (friends: Friend[]) => void;
  removeFriend: (friendId: Friend["contactId"]) => void;

  //   favoriteFriend: (friend: Friend) => void;
  //   unfavoriteFriend: (friendId: Friend["id"]) => void;

  callFriend: (
    phoneNumbers: Contact["phoneNumbers"],
    friendId: Friend["contactId"]
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
  const { saveFriendsData, contacts } = useUserContext();
  const { friends, setFriends } = useFriends(contacts);
  const [isCalling, setIsCalling] = useState<Friend["contactId"]>("");
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

  // useEffect(() => {
  //   console.log("getting friends");
  //   getFriendsData();
  // }, []);

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
        const oldFriend = friends.find(
          (f) => f.contact.id === friend?.contact.id
        );
        if (oldFriend) {
          return oldFriend;
        }
        return friend;
      }),
    };
    setFriends(newFriendsData.friends);
    saveFriendsData(newFriendsData);
  };

  const increaseFriendship = (friendId: Friend["contactId"]) => {
    console.log("increase friendship", friendId);
    const newFriends = friends.map((f) => {
      if (f.contact.id == friendId) {
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

  const addFriends = (newFriends: Friend[]) => {
    // add the array of new friends to the old friends
    const newFriendsData: FriendsData = {
      friends: [...friends, ...newFriends],
    };

    console.log("new friends", newFriendsData.friends.length);
    updateFriends(newFriendsData.friends);
  };

  const removeFriend = (friendId: Friend["contactId"]) => {
    setFriends((prev) =>
      prev.filter((friend) => friend?.contact.id !== friendId)
    );
  };

  const callFriend = async (
    phoneNumbers: Friend["contact"]["phoneNumbers"],
    friendId: Friend["contactId"]
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

        addFriends,
        removeFriend,

        callFriend,
      }}
    >
      {children}
    </FriendContext.Provider>
  );
};
