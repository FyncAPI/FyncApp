import { MotiImage, MotiView } from "moti";
import React, { ComponentProps, useState } from "react";
import {
  Gesture,
  GestureDetector,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Friend } from "../contexts/user/user.types";
import { useSharedValue } from "react-native-reanimated";

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

  const position = useSharedValue({ x: 0, y: 0 });

  const start = useSharedValue({
    x: location.x,
    y: location.y,
  });

  const dragGesture = Gesture.Pan()
    .onBegin(() => {
      console.log("begin");
      // isPressed.value = true;
    })
    .onUpdate((e) => {
      position.value = {
        x: e.translationX,
        y: e.translationY,
      };
    })
    .onEnd(() => {
      start.value = {
        x: position.value.x,
        y: position.value.y,
      };
    });

  // const composed = Gesture.Simultaneous(
  //   dragGesture,
  //   Gesture.Simultaneous(zoomGesture, rotateGesture)
  // );

  return (
    <GestureDetector gesture={dragGesture}>
      <TouchableOpacity onPress={handlePress}>
        <MotiView
          animate={{
            scale: expanded ? 1.2 : 1,
            position: "absolute",
            top: position.value.y,
            left: position.value.x,
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
    </GestureDetector>
  );
};
