import React, { useContext } from "react";
import { FlatList, Text, View } from "native-base";
import FriendCard from "./FriendCard";
import { CallHistory, Friend } from "../contexts/user/types";
import { FriendContext } from "../contexts/FriendContext";

export default function RecentCallList({ calls }: { calls: CallHistory[] }) {
  // //console.log(friends, "friends");
  const { friends } = useContext(FriendContext);
  const recentFriends = calls.map((call) =>
    friends.find((friend) => friend.contactId === call.contactId)
  );

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={recentFriends}
      renderItem={({ item, index }) => <FriendCard friend={item} />}
    />
  );
}
