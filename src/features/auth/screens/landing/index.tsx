import { useNavigation } from "@react-navigation/native";
import { Button, Heading, Text, View } from "native-base";
import React from "react";
import { SafeBottom, SafeTop } from "../../../../../components/SafeTop";

export default function LandingScreen() {
  const navigation = useNavigation();
  return (
    <View flex={1} variant="background" p="2">
      <SafeTop />
      <Heading size={"4xl"}>Trojang</Heading>
      <Heading>call friends</Heading>
      <View flex={1} />
      <Button onPress={() => navigation.navigate("Form")}>Get Started</Button>
      <SafeBottom />
    </View>
  );
}
