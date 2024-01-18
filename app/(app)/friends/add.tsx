import React from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";

import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import { useUser } from "contexts/user.context";
import { View } from "components/View";
import { Text } from "components/Text";
import { SafeTop } from "components/SafeTop";
import { IconButton } from "components/IconButton";

const Add = () => {
  const { user } = useUser();
  const width = 256;
  const height = 256;
  const r = width * 0.33;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeTop back />
      <View p={10} style={{ flex: 1 }}>
        <Text variant="h1">Add friend</Text>
      </View>
    </GestureHandlerRootView>
  );
};
export default Add;
