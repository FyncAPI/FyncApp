import { View, Modal, ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { BlurView } from "expo-blur";
import { Text } from "native-base";
import LoadingIndicator from "./LoadingIndicator";

export function LoadingModal({
  loading,
  text,
}: {
  loading: boolean;
  text?: string;
}) {
  useEffect(() => {
    console.log(loading, "loading");
  }, [loading]);

  if (loading)
    return (
      <BlurView
        intensity={20}
        style={[
          StyleSheet.absoluteFill,
          {
            left: 0,
            top: 0,
            zIndex: 100,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <LoadingIndicator size={50} />
        <Text style={{ position: "absolute", top: "55%" }}>{text}</Text>
      </BlurView>
    );

  return null;
}
