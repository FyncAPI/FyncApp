import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import { useUser } from "contexts/user.context";
import { Button, Image, Pressable } from "react-native";
import { useSession } from "contexts/auth.context";
import { Text } from "components/Text";
import { SafeTop } from "components/SafeTop";
import { IconButton } from "components/IconButton";
import { Skeleton } from "moti/skeleton";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { View } from "components/View";

import { useSharedValue, useDerivedValue } from "react-native-reanimated";
import { MotiView, ScrollView } from "moti";
import { JsonViewer } from "components/JsonViewer";
const App = () => {
  const { user } = useUser();
  const { signOut } = useSession();
  const [show, setShow] = React.useState(true);
  const width = 256;
  const height = 256;
  const r = width * 0.33;

  const isValid = useSharedValue(false);

  return (
    <View flex>
      <SafeTop />
      <MotiView
        animate={useDerivedValue(() => ({
          opacity: isValid.value ? 1 : 0,
        }))}
        transition={useDerivedValue(() => ({
          delay: isValid.value ? 0 : 100,
        }))}
      />
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
          {user?.name}
        </Text>

        <View row gap={30}>
          <IconButton href="/settings" name="settings-sharp" />
          <IconButton name="pencil" href="/edit-profile" />
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 10, marginLeft: 10, marginRight: 10 }}>
          <Skeleton show={show} height={100} width={100} radius={35}>
            <Image
              onLoad={() => {
                setShow(false);
              }}
              source={{ uri: user?.profilePicture }}
              style={{ width: 100, height: 100, borderRadius: 35 }}
            />
          </Skeleton>
          <Text>{user?.name}</Text>
          {user.bio && <Text fontSize="md"> {user.bio}</Text>}
          <Text fontSize="xl"> Friends: {user?.friends.length}</Text>
          <Text fontSize="xl"> Friendships: {"notyet"}</Text>
          <Text fontSize="xl"> interests: {"notyet"}</Text>
          <JsonViewer json={JSON.stringify(user)} />
          {/* <Canvas style={{ width, height }}>
          <Group blendMode="exclusion">
            <Circle cx={r} cy={r} r={r} color="cyan" />
            <Circle cx={width - r} cy={r} r={r} color="magenta" />
          </Group>
        </Canvas> */}
        </View>
      </ScrollView>
    </View>
  );
};
export default App;
