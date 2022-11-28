import {
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  View,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Friend } from "../../../../contexts/user/types";
import * as Contacts from "expo-contacts";
import { ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default function LoadFriends({
  friendsIds,
  friends,
  setFriends,
}: {
  friendsIds: string[];
  friends: Friend[];
  setFriends: (friends: Friend[]) => void;
}) {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [error, setError] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        console.log(status, "tus");
        if (status === "granted") {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Image, Contacts.Fields.PhoneNumbers],
          });
          if (data.length > 0) {
            setContacts(data);
          }
        } else {
          console.log("Permission denied");
          setError({ ...error, contacts: "Permission denied" });
        }
      } catch (err) {
        setError({ ...error, contacts: err });
      }
    })();
  }, []);

  useEffect(() => {
    const friends: Friend[] = contacts
      .filter((contact) => {
        return friendsIds.includes(contact.id);
      })
      .map((contact) => {
        return {
          ...contact,
          friendship: {
            level: 1,
            points: 0,
          },
          memories: [],
          recents: [],
        };
      });
    setFriends(friends);
  }, [friendsIds, contacts]);

  return (
    <View>
      {friends?.length == 0 ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          ListHeaderComponent={() => <Heading my="2">Friends</Heading>}
          data={friends}
          renderItem={({ item }) => <FriendCard friend={item} />}
        />
      )}
    </View>
  );
}

const FriendCard = ({ friend }: { friend: Friend }) => {
  return (
    <HStack alignItems={"center"}>
      {friend.imageAvailable ? (
        <Image source={{ uri: friend.image.uri }} alt="image base" size="sm" />
      ) : (
        <Icon as={Ionicons} name="person" size="sm" />
      )}
      <Text m="2">{friend.name}</Text>
      <Text m="1" variant={"baseStyle"}>
        {friend.phoneNumbers?.map((n) => n?.number + " ")}
      </Text>
    </HStack>
  );
};
