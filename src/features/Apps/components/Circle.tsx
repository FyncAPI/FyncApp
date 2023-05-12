import React from "react";
import Animated from "react-native-reanimated";

export const circleDiameter = 128;
const circleRadius = circleDiameter / 2;

export const Circle = ({
  translateX,
  translateY,
}: {
  translateX: Animated.Value<number>;
  translateY: Animated.Value<number>;
}) => {
  return (
    <Animated.View
      style={{
        transform: [{ translateX }, { translateY }],
        position: "absolute",
        width: circleDiameter,
        height: circleDiameter,
        borderRadius: circleRadius,
        backgroundColor: "#ff0000",
      }}
    ></Animated.View>
  );
};
