import { Image, Text, View } from "native-base";
import React from "react";
import { Memory } from "../contexts/user/user.types";

export const MemoryCard = ({ memory }: { memory: Memory }) => {
  return (
    <View p="2">
      <Image source={{ uri: memory.images[0] }} />
      {/* <Text>{memory.}</Text> */}
    </View>
  );
};
