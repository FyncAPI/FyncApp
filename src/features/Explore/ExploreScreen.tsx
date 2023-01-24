import {
  FlatList,
  HStack,
  Heading,
  Icon,
  SectionList,
  Text,
  View,
} from "native-base";
import React, { useContext } from "react";
import {
  CompositeNavigationProp,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList, RootTabParamList } from "../../../types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserContext } from "../../contexts/user/userContext";
import { EventCard } from "./components/EventCard";
import { add } from "react-native-reanimated";
import { SafeTop } from "../../components/SafeTop";

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, "Explore">,
  NativeStackNavigationProp<RootStackParamList>
>;

// make a function that returns a navigation prop type

const func = (x: number) => {
  return x;
};

export const ExploreScreen = () => {
  const navigation = useNavigation<NavigationProp<"Explore">>();
  const { bottom } = useSafeAreaInsets();
  const { exploreItems } = useContext(UserContext);

  return (
    <View flex={1} variant="background">
      <SafeTop />
      <HStack
        space={4}
        alignItems="center"
        pl="5"
        // m={"5"}
        _android={{ mt: 3 }}
      >
        <Heading fontSize={"4xl"}>Explore</Heading>

        <Icon
          onPress={() => {
            // navigation.navigate("AddFriend");
          }}
          ml="auto"
          mr={4}
          size="3xl"
          as={<Ionicons name="search" />}
        />
      </HStack>
      <FlatList
        pb={bottom}
        data={exploreItems}
        renderItem={({ item, index }) => {
          if (item.type === "IRL") return <EventCard event={item} />;
          if (item.type === "APP") return <Text>user</Text>;
        }}
      />
    </View>
  );
};
