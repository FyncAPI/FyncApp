import { View, Modal } from "react-native";
import React from "react";
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
  return (
    <Modal visible={loading} transparent={true} animationType="fade">
      <BlurView
        intensity={20}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <LoadingIndicator size={50} />
        <Text style={{ position: "absolute", top: "55%" }}>{text}</Text>
      </BlurView>
    </Modal>
  );
}
