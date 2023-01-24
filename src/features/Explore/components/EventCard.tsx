import { Heading, Text, View } from "native-base";
import React from "react";
import { IRLEvent } from "../explore.type";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootStackParamList, RootTabParamList } from "../../../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, "Explore">,
  NativeStackNavigationProp<RootStackParamList>
>;
export const EventCard = ({ event }: { event: IRLEvent }) => {
  console.log(event, "adsfsdfasdfasdfa");
  const navigation = useNavigation<NavigationProp>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("EventStack", {
          screen: "IRLEvent",
          params: { id: event._id },
        });
      }}
    >
      <View key={event._id} bg={"gray.800"} p="3" m={2} rounded={"lg"}>
        <Heading>{event.name}</Heading>
        <Text>{event.description}</Text>
        <Text>{event.type}</Text>
        <Text>{event.type}</Text>
      </View>
    </TouchableOpacity>
  );
};
