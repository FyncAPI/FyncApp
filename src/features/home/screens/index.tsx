import { View, Text } from "react-native";
import React from "react";
import {
  FlatList,
  Heading,
  HStack,
  Icon,
  ScrollView,
  VStack,
} from "native-base";
import { SafeTop } from "../../../../components/SafeTop";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  return (
    <ScrollView flex={1} backgroundColor="gray.900">
      <SafeTop />
      <HStack space={4} alignItems="center" pl="5">
        <Icon size="3xl" color="white" as={<Ionicons name="person-circle" />} />
        <Heading fontSize={"4xl"}>Friends</Heading>
      </HStack>
      <Heading fontSize={"2xl"} pl="5" mt="5">
        Recents
      </Heading>
      <FlatList
        horizontal
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={() => (
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: "white",
              margin: 5,
            }}
          />
        )}
      />
      <Heading fontSize={"2xl"} pl="5" mt="5">
        Favorites
      </Heading>
      <FlatList
        horizontal
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={() => (
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: "white",
              margin: 5,
            }}
          />
        )}
      />
      <Heading fontSize={"2xl"} pl="5" mt="5">
        All
      </Heading>
    </ScrollView>
  );
};

export default HomeScreen;
