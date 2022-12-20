import AsyncStorage from "@react-native-async-storage/async-storage";
import { Contact } from "expo-contacts";
import { useEffect, useState } from "react";
import { Friend } from "../contexts/user/types";
import { useContact } from "./useContact";

export const useFriends = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const { contacts } = useContact();

  useEffect(() => {
    console.log("contacts changed at friends");
  }, [contacts]);

  useEffect(() => {
    console.log("useFriends mounted or contacts changed");
    getFriendsData();
  }, [contacts]);

  const getFriendsData = async () => {
    try {
      const friendsData = await AsyncStorage.getItem("@friendsData");
      // console.log(friendsData, "friendsData");
      if (friendsData && contacts.length > 0) {
        const parsedFriendsData = JSON.parse(friendsData);
        // update friends with new contacts
        const newFriends = parsedFriendsData.friends.map((friend: Friend) => {
          const contact = contacts.find(
            (c) => c.id === friend?.contactId
          ) as Contact;
          return {
            ...friend,
            contact: contact,
          };
        });

        setFriends(newFriends);
      }
    } catch (error) {
      console.log("cant get friends Data", error);
    }
  };

  const updateFriendsAfterContactChange = (contact: Contact) => {
    const newFriends = friends.map((friend) => {
      if (friend.contactId === contact.id) {
        return {
          ...friend,
          contact: contact,
        };
      }
      return friend;
    });
    setFriends(newFriends);
  };

  return { friends, setFriends, updateFriendsAfterContactChange };
};
