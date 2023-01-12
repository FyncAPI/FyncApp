import { Image, Text, View } from "native-base";
import React from "react";
import { App } from "../type";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppStackNavigationProp, AppStackParamList } from "../../../../types";

export const AppCard = ({ app }: { app: App }) => {
  const navigation = useNavigation<AppStackNavigationProp<"AppList">>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("App", { id: app._id });
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
