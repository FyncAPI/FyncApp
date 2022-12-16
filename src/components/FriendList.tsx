import React from "react";
import { FlatList, Text, View } from "native-base";
import FriendCard from "./FriendCard";
import { Friend } from "../contexts/user/types";

export default function FriendList({ friends }: { friends: Friend[] }) {
  // //console.log(friends, "friends");
  if (!friends || friends?.length == 0) {
    return (
      <View p="2" m={2}>
        <Text ml={2} fontWeight={"bold"}>
          no one here
        </Text>
      </View>
    );
  } else
    return (
      <View
        // bg={"#22333359"}
        _dark={{ bg: "trueGray.800" }}
        _light={{ bg: "light.100" }}
        p="1"
        mx="2"
        py={2}
        rounded={"xl"}
      >
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={friends}
          renderItem={({ item, index }) => <FriendCard friend={item} />}
        />
      </View>
    );
}
