import { useNavigation } from "@react-navigation/native";
import { Button, Heading, Text, VStack, View } from "native-base";
import React, { useContext } from "react";
import { AppStackNavigationProp } from "../../../../types";
import { SettingsContext } from "../../../contexts/settings/SettingsContext";

export const EnableOnlineScreen = () => {
  const navigation = useNavigation<AppStackNavigationProp<"EnableOnline">>();

  const { enableFyncOnline, fyncOnlineEnabled } = useContext(SettingsContext);
  return (
    <View variant="background" flex={1}>
      <VStack flex={1} justifyContent="center" alignItems="center" top={-20}>
        <Text fontWeight={"medium"} fontSize={"lg"} left={-40}>
          Start Using
        </Text>
        <Heading size={"2xl"}>Fync Online</Heading>
        <Text fontSize={"md"} left={-20}>
          Free Forever
        </Text>
        <VStack mt={20}>
          {[
            "backup friends contacts",
            "sync friendship in games & apps",
            "get more friendships",
          ].map((item) => (
            <Text key={item} fontSize={"md"} left={-10}>
              {"● " + item}
            </Text>
          ))}
          <Text mt={10}>And a lot more...</Text>
          <Button mt={5} variant={"rounded"} onPress={() => enableFyncOnline()}>
            <Text fontSize={"lg"} fontWeight={"medium"} color="black">
              Let's Go
            </Text>
          </Button>
        </VStack>
      </VStack>
    </View>
  );
};
