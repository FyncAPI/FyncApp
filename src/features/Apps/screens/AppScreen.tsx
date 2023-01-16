import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Button, Heading, Image, ScrollView, Text, View } from "native-base";
import React, { useContext } from "react";
import { AppStackNavigationProp, AppStackParamList } from "../../../../types";
import BackButton from "../../../components/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import { AppsContext } from "../../../contexts/apps/AppsContext";
import { SafeBottom, SafeTop } from "../../../components/SafeTop";
import FriendList from "../../../components/FriendList";

export const AppScreen = () => {
  const navigation = useNavigation<AppStackNavigationProp<"App">>();
  const route = useRoute<RouteProp<AppStackParamList, "App">>();

  const { id, type } = route.params;
  const { getAppData } = useContext(AppsContext);

  const [app, setApp] = React.useState(getAppData(id, type));

  if (!app) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Heading>App not found</Heading>
      </View>
    );
  }

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
          height: "50%",
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
        {app.name}
      </Heading>

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
          source={{ uri: app.image }}
          alt={app.name + " image"}
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
          {app.description}
        </Text>
        <View m="2" rounded={25} bg="gray.800" p="1.5" pl={"2.5"}>
          <Heading m={"1"}>Friends</Heading>
          <FriendList friends={app.friends} />
        </View>

        {/* <View m="2" rounded={25} bg="gray.800" p="1.5" pl={"2.5"}>
          <Heading m={"1"}>Reviews</Heading>
          <Text m={"2"} fontWeight={"light"} fontSize={"lg"}>
            No reviews yet
          </Text>
        </View>

        <View m="2" rounded={25} bg="gray.800" p="1.5" pl={"2.5"}>
          <Heading m={"1"}>Comments</Heading>
          <Text m={"2"} fontWeight={"light"} fontSize={"lg"}>
            No comments yet
          </Text>
        </View>

        <View m="2" rounded={25} bg="gray.800" p="1.5" pl={"2.5"}>
          <Heading m={"1"}>Updates</Heading>
          <Text m={"2"} fontWeight={"light"} fontSize={"lg"}>
            No updates yet
          </Text>
        </View> */}

        <Button mt={"auto"} mx={5} variant={"rounded"}>
          <Text fontSize={"lg"} fontWeight={"medium"} color="black">
            Let's Go
          </Text>
        </Button>
        <SafeBottom />
      </ScrollView>
    </>
  );
};
