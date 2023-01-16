import { useNavigation } from "@react-navigation/native";
import { MotiView } from "moti";
import { Button, Heading, Text, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { Easing } from "react-native-reanimated";
import { SafeBottom, SafeTop } from "../../../../components/SafeTop";
import { AuthStackNavigationProp } from "../../../../../types";

export const LandingScreen = () => {
  const navigation = useNavigation<AuthStackNavigationProp<"Landing">>();
  //console.log("Landing Screen");
  return (
    <View flex={1} variant="background" p="2">
      <SafeTop />
      <Heading size={"3xl"} shadow={5}>
        Fync
      </Heading>
      <Heading shadow={2}>frien app</Heading>
      {/* {["#330057", "#0042bc", "#009c49", "#b9bf00", "#fd6e00", "#f20000"].map( */}
      {["#330057", "#0042bc", "#16d2d2"].map((color, i) => (
        <MotiView
          key={i}
          from={{ opacity: 1, scale: 0 }}
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
              backgroundColor: color,
              zIndex: -20,
              borderRadius: 55,
            },
          ]}
        />
      ))}
      <View flex={1} />
      <Button variant={"rounded"} onPress={() => navigation.navigate("Form")}>
        Get Started
      </Button>
      <SafeBottom />
    </View>
  );
};
