import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Heading, ScrollView, View } from "native-base";
import React from "react";
import { AppStackNavigationProp, AppStackParamList } from "../../../../types";
import BackButton from "../../../components/BackButton";
import { LinearGradient } from "expo-linear-gradient";

export const AppScreen = () => {
  const navigation = useNavigation<AppStackNavigationProp<"App">>();
  const route = useRoute<RouteProp<AppStackParamList, "App">>();

  const { id } = route.params;
  return (
    <>
      <BackButton />
      <LinearGradient
        pointerEvents="none"
        style={{
          zIndex: 2,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        colors={["black", "transparent", "transparent", "transparent"]}
      />

      <Heading
        position="absolute"
        top="20"
        zIndex={10}
        alignSelf={"center"}
        fontSize="3xl"
      >
        {id}
      </Heading>

      <ScrollView
        variant="background"
        flex={1}
        flexGrow={1}
        _contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      ></ScrollView>
    </>
  );
};
