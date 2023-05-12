import { useNavigation } from "@react-navigation/native";
import { Heading, Pressable, Text, View, VStack } from "native-base";
import React from "react";
import { SafeTop } from "../../../components/SafeTop";
import { RootStackNavigationProp } from "../../../../types";
import BackButton from "../../../components/BackButton";
import { FriendContext } from "../../../contexts/friend/FriendContext";
import { UserContext } from "../../../contexts/user/userContext";
import ContactSelectorList from "../../auth/components/ContactSelectorList";
import { AddFromContacts } from "./AddFromContacts";

export const AddFriendScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp<"AddFriend">>();

  return (
    <View variant="background" flex={1}>
      <SafeTop />
      <BackButton />
      <Heading ml={10} fontSize="4xl">
        Add Friend
      </Heading>
      <AddFromContacts />
    </View>
  );
};
