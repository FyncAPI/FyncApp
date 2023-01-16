import AsyncStorage from "@react-native-async-storage/async-storage";
import { Contact, PhoneNumber, presentFormAsync } from "expo-contacts";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AppState, Linking } from "react-native";
import { useUserContext } from "../../hooks";
import { useContact } from "../../hooks/useContact";
import { useFriends } from "../../hooks/useFriends";
import { CallHistory, Friend, FriendsData } from "../user/user.types";
import { UserContext } from "../user/userContext";
import { useCalls } from "../../hooks/useCalls";

interface FriendContextInterface {
  friends: Friend[];
  updateFriends: (friends: Friend[]) => void;
  editContact: (contactId: string) => Promise<void>;
  //   saveFriendsData: (friendsData: FriendsData) => void;

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
  const { saveFriendsData, contacts } = useContext(UserContext);
  const { friends, setFriends } = useFriends();

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

  const { recentCalls, setIsCalling } = useCalls(
    increaseFriendship,
    saveFriendsData
  );
  const { getContacts } = useContact();

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
      });
    });
  };

  const addFriends = (newFriends: Friend[]) => {
    // add the array of new friends to the old friends
    const newFriendsList: Friend[] = [...friends, ...newFriends];

    console.log("new friends", newFriendsList.length);
    updateFriends(newFriendsList);
  };

  const removeFriend = (friendId: Friend["contactId"]) => {
    // setFriends((prev) =>
    //   prev.filter((friend) => friend?.contact.id !== friendId)
    // );

    const newFriends = friends.filter((f) => f.contact.id !== friendId);
    setFriends(newFriends);
    saveFriendsData({ friends: newFriends });
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
        //   saveFriendsData,

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
