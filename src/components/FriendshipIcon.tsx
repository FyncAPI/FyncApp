import { Ionicons } from "@expo/vector-icons";
import { FavouriteIcon, Heading, HStack, Icon, Text, View } from "native-base";
import React from "react";
import { Factory } from "native-base";
import { Friend } from "../contexts/user/types";

function FriendshipIconBase({
  friendship,
}: {
  friendship: Friend["friendship"];
}) {
  return (
    <HStack p="2" bg={"gray.700"} rounded="full" alignItems={"center"}>
      <View
        alignSelf={"start"}
        alignItems={"center"}
        justifyContent={"center"}
        marginRight="2"
      >
        <FavouriteIcon size="4xl" color="black" />
        <Text position={"absolute"}>{friendship.level}</Text>
      </View>
      <Heading>{friendship.points}</Heading>
    </HStack>
  );
}

export const FriendshipIcon = Factory(FriendshipIconBase);
