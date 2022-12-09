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
import { useContact } from "../../../../hooks/useContact";
import axios from "axios";
import { SvgXml } from "react-native-svg";
import { MULTI_AVATAR_API_KEY } from "@env";
export default function LoadFriends({
  friendsIds,
  friends,
  setFriends,
}: {
  friendsIds: string[];
  friends: Friend[];
  setFriends: (friends: Friend[]) => void;
}) {
  const [error, setError] = useState({});
  const contacts = useContact();
  const setFriend = (friend: Friend) => {
    setFriends(friends.map((f) => (f.id == friend.id ? friend : f)));
  };

  useEffect(() => {
    const friends: Friend[] = contacts
      .filter((contact) => {
        return friendsIds.includes(contact.id);
      })
      .map((contact) => {
        let phoneNumbers = contact.phoneNumbers;
        // if the contact doesn't have a primary contact, set the first one as primary
        if (!phoneNumbers?.find((phoneNumber) => phoneNumber.isPrimary)) {
          if (phoneNumbers?.[0]) phoneNumbers[0].isPrimary = true;
        }

        return {
          ...contact,
          friendship: {
            level: 1,
            points: 0,
          },
          memories: [],
          recents: [],
          phoneNumbers,
        };
      });
    setFriends(friends);
  }, [friendsIds, contacts]);

  return (
    <View flex={1}>
      <Heading size={"2xl"} ml={8}>
        Friends
      </Heading>
      <Text m={2}>
        Select the primary contact you want to use for each of your friends.
      </Text>
      {friends?.length == 0 ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={friends}
          renderItem={({ item }) => (
            <FriendCard friend={item} setFriend={setFriend} />
          )}
        />
      )}
    </View>
  );
}

const FriendCard = ({
  friend,
  setFriend,
}: {
  friend: Friend;
  setFriend: (friend: Friend) => void;
}) => {
  let primaryNumber = friend.phoneNumbers?.find((number) => number.isPrimary);
  // const [avatar, setAvatar] = React.useState("");

  useEffect(() => {
    console.log(friend.name, MULTI_AVATAR_API_KEY);
    if (friend.avatar || friend.image) {
      console.log(friend.name, "has avatar or image");
      return;
    }
    axios
      .get(
        `https://api.multiavatar.com/${friend.name}?apikey=${MULTI_AVATAR_API_KEY}`,
        {
          headers: {
            "Content-Type": "text/html",
          },
        }
      )
      .then((res) => {
        // setAvatar(res.data);
        setFriend({
          ...friend,
          avatar: res.data,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <HStack
      alignItems={"center"}
      p={2}
      _dark={{
        bg: "blueGray.800",
      }}
      _light={{
        bg: "blueGray.100",
      }}
      m={1}
      rounded={"md"}
    >
      {friend.image ? (
        <Image source={{ uri: friend.image.uri }} alt="image base" size="sm" />
      ) : friend.avatar ? (
        <SvgXml xml={friend.avatar} width="50" height="50" />
      ) : (
        // <Icon as={<Ionicons name="person" />} size="sm" color="blueGray.400" />
        <ActivityIndicator size={"small"} />
      )}
      <Text m="2" fontSize="md" fontWeight="medium">
        {friend.name}
      </Text>
      <View
        _dark={{
          bg: "darkBlue.900",
        }}
        _light={{
          bg: "blue.200",
        }}
        rounded={"sm"}
        p={"1"}
        ml="auto"
      >
        {/* {friend.phoneNumbers?.map((n) => ( */}
        <HStack justifyContent={"center"} alignItems="center">
          {/* <View w={2} h={2} bg={"blue.500"} rounded={"full"} m={1} /> */}
          <Text
            fontSize={"sm"}
            m="1"
            // onPress={() => {
            //   setFriend({
            //     ...friend,
            //     phoneNumbers: friend.phoneNumbers?.map((number) => ({
            //       ...number,
            //       isPrimary: number.id == n.id,
            //     })),
            //   });
            // }}
          >
            {primaryNumber?.number}
          </Text>
        </HStack>
        {/* ))} */}
        {/* <Text>{JSON.stringify(friend.phoneNumbers[1].isPrimary)}</Text> */}
      </View>
    </HStack>
  );
};
