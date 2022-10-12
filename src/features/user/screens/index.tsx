import React from "react";
import { SafeTop } from "../../../../components/SafeTop";
import { Box, Button, View } from "native-base";
import { ToggleDarkMode } from "../../../../components/ToggleTheme";
import { useNavigation } from "@react-navigation/native";

export default function UserScreen() {
  const navigation = useNavigation();
  return (
    <View flex={1}>
      <SafeTop />
      <ToggleDarkMode />
      <Button
        onPress={() => {
          navigation.goBack();
        }}
      >
        Back
      </Button>
    </View>
  );
}
