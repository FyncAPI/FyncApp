import { ScrollView, View } from "native-base";
import React from "react";
import { Friend } from "../../../contexts/user/types";

export const EditFriendScreen = ({ friend }: { friend: Friend }) => {
  return (
    <ScrollView flex={1}>
      <View flex={1} bg={"red.500"} />
    </ScrollView>
  );
};
