import {
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  View,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { Friend } from "../../../../contexts/user/types";
import * as Contacts from "expo-contacts";
import { ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useContact } from "../../../../hooks/useContact";
import axios from "axios";
import { SvgXml } from "react-native-svg";
import { generateAvatar } from "../../../../contexts/FriendService";
import { UserContext } from "../../../../contexts/user/context";

export default function LoadFriends({
  friendsIds,
  friends,
  setFriends,
}: {
  friendsIds: string[];
  friends: Friend[];
  setFriends: React.Dispatch<React.SetStateAction<Friend[]>>;
}) {
  const [error, setError] = useState({});
  const { contacts } = useContext(UserContext);

  const setFriend = (friend: Friend) => {
    console.log("setting friend", friend?.avatar?.length);
    setFriends(
      (prev) =>
        [
          ...prev.filter(
            (prevFriend) => prevFriend?.contact?.id !== friend?.contact?.id
          ),
          friend,
        ] as Friend[]
    );
  };

  useEffect(() => {
    const friends: Friend[] = contacts
      .filter((contact) => {
        return friendsIds.includes(contact.id);
      })
      .map((contact) => {
        // let phoneNumbers = contact.phoneNumbers;
        // // if the contact doesn't have a primary contact, set the first one as primary
        // if (!phoneNumbers?.find((phoneNumber) => phoneNumber.isPrimary)) {
        //   if (phoneNumbers?.[0]) phoneNumbers[0].isPrimary = true;
        // }

        return {
          // contact: { ...contact, phoneNumbers },
          contact,
          friendship: {
            level: 1,
            points: 0,
          },
          memories: [],
          recents: [],
          // phoneNumbers,
          contactId: contact.id,
        };
      });
    setFriends(friends);
  }, [friendsIds, contacts]);

  return (
    <View flex={1}>
      {friends?.length == 0 ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={friends}
          renderItem={({ item }) => (
            <LoadFriendCard friend={item} setFriend={setFriend} />
          )}
        />
      )}
      {/* <Text>{friends.map((f) => f.avatar?.length + " ")}</Text> */}
    </View>
  );
}

const LoadFriendCard = ({
  friend,
  setFriend,
}: {
  friend: Friend;
  setFriend: (friend: Friend) => void;
}) => {
  useEffect(() => {
    if (!friend?.contact?.name) return;
    if (friend.avatar || friend?.contact?.image) {
      console.log(
        friend?.contact?.name,
        "has avatar or image",
        friend?.avatar?.length,
        Object.keys(friend.contact)
        // friend?.contact?.image?.uri?.length
      );
      return;
    }
    generateAvatar(friend?.contact?.name).then((svg) => {
      if (!svg) return;
      console.log(svg.length);
      setFriend({
        ...friend,
        avatar: svg,
      });
    });
  }, [friend?.contact?.name]);

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
      {friend?.contact?.image?.uri ? (
        <Image
          source={{ uri: friend.contact.image.uri }}
          alt="image base"
          size="sm"
        />
      ) : friend.avatar ? (
        <SvgXml xml={friend.avatar} width="50" height="50" />
      ) : (
        // <Text>{friend.avatar}</Text>
        <ActivityIndicator />
      )}
      <Text m="2" fontSize="md" fontWeight="medium">
        {friend?.contact?.name}
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
            {friend?.contact?.phoneNumbers?.find((n) => n)?.number}
          </Text>
        </HStack>
        {/* ))} */}
        {/* <Text>{JSON.stringify(friend.phoneNumbers[1].isPrimary)}</Text> */}
      </View>
    </HStack>
  );
};
