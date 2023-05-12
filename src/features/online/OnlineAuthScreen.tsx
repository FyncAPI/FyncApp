import { Button, Heading, VStack, View } from "native-base";
import React from "react";
import { SafeTop } from "../../components/SafeTop";
import { useNavigation } from "@react-navigation/native";
import { AppStackNavigationProp } from "../../../types";
import { PrimaryButton } from "../../components/PrimaryButton";

export const OnlineAuthScreen = () => {
  const navigation = useNavigation<AppStackNavigationProp<"Auth">>();

  return (
    <View variant="background" flex={1}>
      <SafeTop />
      <Heading size={"2xl"}>Let's Fync </Heading>
      <VStack m={20} bg={"gray.500"} flex={1} alignItems={"center"}>
        <PrimaryButton onPress={() => {}}>Sign In</PrimaryButton>

        <PrimaryButton
          mt={5}
          onPress={() => {
            navigation.navigate("Form");
          }}
        >
          Sign Up
        </PrimaryButton>
      </VStack>
    </View>
  );
};
