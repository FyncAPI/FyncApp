import React from "react";
import { FlatList, Text, View } from "native-base";
import FriendCard from "../FriendCard";
import { Friend } from "../../src/contexts/user-context";

export default function FriendList({ friends }: { friends: Friend[] }) {
  if (friends.length == 0) {
    return (
      <View p="2">
        <Text>No friends</Text>
      </View>
    );
  } else
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={friends}
        renderItem={({ item, index }) => (
          <FriendCard friend={item} bigger={false} />
        )}
      />
    );
}
