import { Image, Text, View } from "native-base";
import React from "react";
import { App } from "../apps.type";
import { TouchableOpacity } from "react-native";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import {
  AppStackNavigationProp,
  AppStackParamList,
  RootStackParamList,
  RootTabParamList,
} from "../../../../types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppType } from "../../../contexts/apps/AppsContext";

type AppListScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, "Apps">,
  NativeStackNavigationProp<RootStackParamList>
>;

export const AppCard = ({ app, type }: { app: App; type: AppType }) => {
  const navigation = useNavigation<AppListScreenNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("AppStack", {
          screen: "App",
          params: { id: app._id, type },
        });
      }}
    >
      <View m={1}>
        <Image
          source={{ uri: app.image }}
          defaultSource={require("../../../../assets/icon.png")}
          alt={app.name}
          key={app._id + "img"}
          w="20"
          h="20"
          rounded={"26px"}
        />
      </View>
      <Text alignSelf={"center"}>{app.name}</Text>
    </TouchableOpacity>
  );
};
