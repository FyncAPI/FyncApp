import AsyncStorage from "@react-native-async-storage/async-storage";
import { Contact, PhoneNumber, presentFormAsync } from "expo-contacts";
import { createContext, useEffect, useRef, useState } from "react";
import { AppState, Linking } from "react-native";
import { useUserContext } from "../../hooks";
import { useContact } from "../../hooks/useContact";
import { useFriends } from "../../hooks/useFriends";
import { CallHistory, Friend, FriendsData } from "../user/types";
import { saveFriendsAS, saveRecentCallsAS } from "../AsyncStorageService";

interface FriendContextInterface {
  friends: Friend[];
  updateFriends: (friends: Friend[]) => void;
  editContact: (contactId: string) => Promise<void>;
  saveFriendsData: (friendsData: Partial<FriendsData>) => void;

  addFriends: (friends: Friend[]) => void;
  removeFriend: (friendId: Friend["contactId"]) => void;

  //   favoriteFriend: (friend: Friend) => void;
  //   unfavoriteFriend: (friendId: Friend["id"]) => void;

  recentCalls: CallHistory[];

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
  const { friends, setFriends } = useFriends();
  const { getContacts } = useContact();
  const [isCalling, setIsCalling] = useState<Friend["contactId"]>("");
  const [finishedCall, setFinishedCall] = useState(false);
  const [recentCalls, setRecentCalls] = useState<CallHistory[]>([]);

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
    if (finishedCall && isCalling) {
      setRecentCalls((prev) => [
        {
          contactId: isCalling,
          date: new Date(),
        },
        ...prev,
      ]);
      increaseFriendship(isCalling);
      setIsCalling("");
      setFinishedCall(false);

      saveFriendsData({
        recentCalls: [
          {
            contactId: isCalling,
            date: new Date(),
          },
        ],
      });
    }
  }, [finishedCall]);

  const saveFriendsData = (friendsData: Partial<FriendsData>) => {
    if (!friendsData) return;
    // save user to async storage

    console.log("saving friends sata", friendsData);

    // saveValueAsync("friendsData", friendsData);
    Object.keys(friendsData).forEach((key) => {
      if (key === "friends") {
        saveFriendsAS(friendsData.friends);
      }
      if (key === "recentCalls") {
        saveRecentCallsAS(friendsData.recentCalls);
      }
    });
  };

  const updateFriends = async (newfriends: Friend[]) => {
    // merge new friends with old friends
    const newFriends = newfriends.map((friend) => {
      const oldFriend = friends.find(
        (f) => f.contact.id === friend?.contact.id
      );
      if (oldFriend) {
        return oldFriend;
      }
      return friend;
    });

    setFriends(newFriends);
    saveFriendsData({
      friends: newFriends,
    });
  };

  const editContact = async (contactId: string) => {
    presentFormAsync(contactId).then(async (r) => {
      console.log(r, "asdf");
      const cts = await getContacts();

      if (!cts) return;
      console.log("cts", cts.length);
      const editedContact = cts.find((c) => c.id === contactId);

      if (!editedContact) return;

      const newFriends = friends.map((f) => {
        if (f.contact.id === contactId) {
          return {
            ...f,
            contact: editedContact,
          };
        }
        return f;
      });

      setFriends(newFriends);

      saveFriendsData({
        friends: newFriends,
        recentCalls,
      });
    });
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
      recentCalls,
    };

    console.log("new friends", newFriendsData.friends.length);
    updateFriends(newFriendsData.friends);
  };

  const removeFriend = (friendId: Friend["contactId"]) => {
    // setFriends((prev) =>
    //   prev.filter((friend) => friend?.contact.id !== friendId)
    // );

    const newFriends = friends.filter((f) => f.contact.id !== friendId);
    setFriends(newFriends);
    saveFriendsData({ friends: newFriends, recentCalls });
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
      // add to recent calls
    } catch (e) {
      //console.log("cannot call", e);
    }
  };

  return (
    <FriendContext.Provider
      value={{
        friends,
        updateFriends,
        editContact,
        saveFriendsData,

        addFriends,
        removeFriend,

        callFriend,
        recentCalls,
      }}
    >
      {children}
    </FriendContext.Provider>
  );
};
