import { MotiImage, MotiView } from "moti";
import React, { ComponentProps, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Friend } from "../contexts/user/user.types";

export const FriendCircle = ({
  listLength,
  friend,
  location,
}: {
  listLength?: number;
  friend: Friend;
  location: { x: number; y: number };
}) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <MotiView
        animate={{
          scale: expanded ? 1.2 : 1,
        }}
        style={{
          width: expanded ? 100 : 100,
          height: expanded ? 100 : 100,
          backgroundColor: "blue",
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MotiImage
          source={friend?.contact.image}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 100,
          }}
        />
      </MotiView>
    </TouchableOpacity>
  );
};
