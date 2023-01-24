import React from "react";
import { Friend } from "../../../contexts/user/user.types";
import { View } from "native-base";
import { MotiView } from "moti";
import FriendCard from "../../../components/FriendCard";
import { Dimensions } from "react-native";

export const FriendBlob = ({ friends }: { friends: Friend[] }) => {
  const { width, height } = Dimensions.get("window");

  // randomly generate positinos for each friend without being closer than 100px

  const locations = friends.map((friend) => {
    const x = Math.random() * (width - 100);
    const y = Math.random() * (height - 100);
    return { x, y };
  });

  return (
    <View flex={1}>
      {friends.map((friend, index) => (
        <FriendCard
          friend={friend}
          position={"absolute"}
          key={index + "fbo"}
          location={locations[index]}
        />
      ))}
    </View>
  );
};
