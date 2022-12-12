import React from "react";
import { MotiView } from "moti";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Easing } from "react-native-reanimated";

export default function LoadingIndicator({
  size = 30,
  style,
}: {
  size?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const color = "#79d8ca";
  return (
    <MotiView
      from={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 0,
        shadowOpacity: 0.5,
      }}
      animate={{
        width: size + 20,
        height: size + 20,
        borderRadius: (size + 20) / 2,
        borderWidth: size / 10,
        shadowOpacity: 1,
      }}
      transition={{
        type: "timing",
        duration: 1000,
        loop: true,
      }}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: size / 5,
          borderColor: color,
          shadowColor: color,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: 10,
        },
        style,
      ]}
    />
  );
}
