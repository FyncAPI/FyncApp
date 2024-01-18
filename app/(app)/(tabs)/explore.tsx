import React from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import { View } from "components/View";
import { SafeTop } from "components/SafeTop";
import { Text } from "components/Text";
import { IconButton } from "components/IconButton";
const Explore = () => {
  const width = 256;
  const height = 256;
  const r = width * 0.33;
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <SafeTop />
        <View
          row
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            backgroundColor: "transparent",
          }}
        >
          {/* <IconButton name="menu" /> */}
          <Text variant="header" style={{ textAlign: "center" }}>
            Explore
          </Text>

          <View row gap={30}>
            <IconButton name="add" href="/create-event" />
          </View>
        </View>
        <Canvas style={{ width, height }}>
          <Group blendMode="multiply">
            <Circle cx={r} cy={r} r={r} color="cyan" />
            <Circle cx={width - r} cy={r} r={r} color="magenta" />
            <Circle cx={width / 2} cy={width - r} r={r} color="yellow" />
          </Group>
        </Canvas>
      </ScrollView>
    </View>
  );
};
export default Explore;
