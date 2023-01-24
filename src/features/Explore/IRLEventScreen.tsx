import { Button, Heading, Image, ScrollView, Text, View } from "native-base";
import React, { useContext } from "react";
import BackButton from "../../components/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import { SafeBottom, SafeTop } from "../../components/SafeTop";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  FriendStackParamList,
  RootStackParamList,
  RootTabParamList,
} from "../../../types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserContext } from "../../contexts/user/userContext";
import { IRLEvent } from "./explore.type";
import FriendList from "../../components/FriendList";
import { Linking } from "react-native";

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, "Explore">,
  NativeStackNavigationProp<RootStackParamList>
>;

export const IRLEventScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<FriendStackParamList, "Friend">>();

  const { exploreItems } = useContext(UserContext);
  //   const { userData, favoriteFriend } = useContext(UserContext);
  //   const { friends, removeFriend, editContact } = useContext(FriendContext);
  const { id } = route.params;

  const event: IRLEvent = exploreItems.find((f) => f._id === id);

  if (!event) {
    return null;
  }

  return (
    <>
      <BackButton _light={{ color: "white" }} zIndex={5} />
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

      <View position={"absolute"} left={"10"} zIndex={5} mx={2}>
        <SafeTop />
        <Heading fontSize="4xl" color={"light.100"} shadow={"9"}>
          {/* {friend?.contact.nickname || friend?.contact.name} */}
          {event.name}
        </Heading>
        <Text fontSize="lg" color={"light.100"}>
          {/* {friend?.contact.nickname && friend?.contact.name} */}
        </Text>
      </View>

      <ScrollView
        variant="background"
        flex={1}
        flexGrow={1}
        _contentContainerStyle={{
          flexGrow: 1,
          // justifyContent: "space-between",
        }}
      >
        <SafeTop />
        <Image
          source={{ uri: "https://picsum.photos/200" }}
          alt={event.name + " image"}
          mt={"20"}
          w="220"
          h="220"
          rounded={"26px"}
          alignSelf={"center"}
          mb={"5"}
        />

        <Text
          fontWeight={"thin"}
          my={5}
          alignSelf={"center"}
          fontSize={"xl"}
          mt={"2"}
        >
          {event.description}
        </Text>
        {/* <View m="2" rounded={25} bg="gray.800" p="1.5" pl={"2.5"}>
          <Heading m={"1"}>Friends</Heading>
        </View> */}
        <Button
          mt={"auto"}
          mx={5}
          variant={"rounded"}
          onPress={() => {
            // Linking.openURL(app.url);
          }}
        >
          <Text fontSize={"lg"} fontWeight={"medium"} color="black">
            Let's Go
          </Text>
        </Button>
        <SafeBottom />
      </ScrollView>
    </>
  );
};
