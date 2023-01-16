import React from "react";
import { FlatList, Text, View } from "native-base";
import FriendCard from "./FriendCard";
import { Friend } from "../contexts/user/user.types";

export default function FriendList({ friends }: { friends: Friend[] }) {
  // //console.log(friends, "friends");
  if (!friends || friends?.length == 0) {
    return (
      <Text m={"2"} fontSize={"lg"} fontWeight={"light"}>
        No one here
      </Text>
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
