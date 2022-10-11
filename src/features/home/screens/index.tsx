import { View, Text } from "react-native";
import React from "react";
import {
  Button,
  FlatList,
  Heading,
  HStack,
  Icon,
  ScrollView,
  Switch,
  VStack,
} from "native-base";
import { SafeTop } from "../../../../components/SafeTop";
import { Ionicons } from "@expo/vector-icons";
import FriendCard from "../../../../components/FriendCard";
import FriendList from "../../../../components/FriendList";
import { ToggleDarkMode } from "../../../../App";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView flex={1} backgroundColor="gray.900">
      <SafeTop />
      <HStack space={4} alignItems="center" pl="5">
        <Icon
          onPress={() => {
            navigation.navigate("User");
          }}
          size="3xl"
          color="white"
          as={<Ionicons name="person-circle" />}
        />
        <Heading fontSize={"4xl"}>Friends</Heading>
      </HStack>
      <Heading fontSize={"2xl"} pl="5" my="5">
        Recents
      </Heading>
      <FriendList />
      <Heading fontSize={"2xl"} pl="5" my="5">
        Favorites
      </Heading>
      <FriendList />
      <Heading fontSize={"2xl"} pl="5" my="5">
        Keep in touch
      </Heading>
      <FriendList />
      <Heading fontSize={"2xl"} pl="5" my="5">
        All
      </Heading>
      <FlatList
        alignSelf="center"
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        numColumns={3}
        data={[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
        ]}
        renderItem={() => <FriendCard bigger />}
      />
    </ScrollView>
  );
};

export default HomeScreen;
