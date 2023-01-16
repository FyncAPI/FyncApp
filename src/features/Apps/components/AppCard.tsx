import { Image, Text, View } from "native-base";
import React from "react";
import { App } from "../type";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  AppStackNavigationProp,
  AppStackParamList,
  AppType,
} from "../../../../types";

export const AppCard = ({ app, type }: { app: App; type: AppType }) => {
  const navigation = useNavigation<AppStackNavigationProp<"AppList">>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("App", {
          screen: "AppScreen",
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
