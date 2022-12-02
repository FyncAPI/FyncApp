import React from "react";
import { FlatList, Text, View } from "native-base";
import FriendCard from "../FriendCard";
import { Friend } from "../../src/contexts/user/types";

export default function FriendList({ friends }: { friends: Friend[] }) {
  console.log(friends, "friends");
  if (!friends || friends?.length == 0) {
    return (
      <View p="2" m={2}>
        <Text ml={2} fontWeight={"bold"}>
          No favorites friends
        </Text>
      </View>
    );
  } else
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={friends}
        renderItem={({ item, index }) => <FriendCard friend={item} />}
      />
    );
}
