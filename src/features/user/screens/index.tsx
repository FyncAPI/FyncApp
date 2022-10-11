import React from "react";
import { ToggleDarkMode } from "../../../../App";
import { SafeTop } from "../../../../components/SafeTop";
import { Box, View } from "native-base";

export default function UserScreen() {
  return (
    <View flex={1}>
      <SafeTop />
      <ToggleDarkMode />
    </View>
  );
}
