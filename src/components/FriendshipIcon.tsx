import { Ionicons } from "@expo/vector-icons";
import { Icon, Text, View } from "native-base";
import React from "react";
import { Factory } from "native-base";
import { Friend } from "../contexts/user/types";

function FriendshipIconBase({
  friendship,
}: {
  friendship: Friend["friendship"];
}) {
  return (
    <View alignItems={"center"} justifyContent={"center"}>
      <Icon as={Ionicons} name="heart" size="4xl" color={"text.700"} />
      <Text position={"absolute"}>{friendship.points}</Text>
    </View>
  );
}

export const FriendshipIcon = Factory(FriendshipIconBase);
