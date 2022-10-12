import { View, Text } from "react-native";
import React from "react";
import { FlatList } from "native-base";
import FriendCard from "../FriendCard";

export default function FriendList() {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={[
        {
          id: "1",
          nickname: "John",
        },
        {
          id: "2",
          nickname: "Jane",
        },
        {
          id: "3",
          nickname: "Karl",
        },
        {
          id: "4",
          nickname: "Felix",
        },
        {
          id: "5",
          nickname: "Linda",
        },

        {
          id: "6",
          nickname: "Sara",
        },
        {
          id: "7",
          nickname: "Eva",
        },
      ]}
      renderItem={({ item, index }) => <FriendCard bigger={false} />}
    />
  );
}
