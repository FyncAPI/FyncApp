import React, { useContext } from "react";
import { FlatList, Text, View } from "native-base";
import FriendCard from "./FriendCard";
import { CallHistory, Friend } from "../contexts/user/user.types";
import { FriendContext } from "../contexts/friend/FriendContext";
import FriendButton from "./FriendButton";

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
      keyExtractor={(item, index) => item + index.toString()}
      renderItem={({ item, index }) => <FriendButton friend={item} />}
    />
  );
}
