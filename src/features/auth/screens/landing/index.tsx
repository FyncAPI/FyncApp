import { useNavigation } from "@react-navigation/native";
import { Button, Heading, Text, View } from "native-base";
import React from "react";
import { SafeTop } from "../../../../../components/SafeTop";

export default function LandingScreen() {
  const navigation = useNavigation();
  return (
    <View flex={1} variant="background" p="2">
      <SafeTop />
      <Heading>Trojang</Heading>
      <Text>call friends</Text>
      <Button onPress={() => navigation.navigate("Form")}>Get Started</Button>
    </View>
  );
}
