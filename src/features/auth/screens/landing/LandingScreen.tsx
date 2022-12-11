import { useNavigation } from "@react-navigation/native";
import { MotiView } from "moti";
import { Button, Heading, Text, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { Easing } from "react-native-reanimated";
import { SafeBottom, SafeTop } from "../../../../../components/SafeTop";
import { AuthStackNavigationProp } from "../../../../../types";

export const LandingScreen = () => {
  const navigation = useNavigation<AuthStackNavigationProp<"Landing">>();
  //console.log("Landing Screen");
  return (
    <View flex={1} variant="background" p="2">
      <SafeTop />
      <Heading size={"4xl"} shadow={5}>
        Trojang
      </Heading>
      <Heading shadow={2}>call friends</Heading>
      {[1, 2, 3].map((_, i) => (
        <MotiView
          key={i}
          from={{ opacity: 0.8, scale: 0 }}
          animate={{ opacity: 0, scale: 15 }}
          transition={{
            type: "timing",
            duration: 3000,
            easing: Easing.out(Easing.ease),
            delay: 400 * i,
            loop: true,
            repeatReverse: false,
          }}
          style={[
            StyleSheet.absoluteFillObject,
            {
              position: "absolute",
              top: 120,
              left: 48,
              width: 80,
              height: 80,
              backgroundColor:
                i == 0 ? "#79d8ca" : i == 1 ? "#93f1f8" : "#c1ffda",
              zIndex: -20,
              borderRadius: 55,
            },
          ]}
        />
      ))}
      <View flex={1} />
      <Button onPress={() => navigation.navigate("Form")}>Get Started</Button>
      <SafeBottom />
    </View>
  );
};
