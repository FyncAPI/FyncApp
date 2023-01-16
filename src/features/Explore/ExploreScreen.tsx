import {
  FlatList,
  HStack,
  Heading,
  Icon,
  SectionList,
  Text,
  View,
} from "native-base";
import React from "react";
import { SafeBottom, SafeTop } from "../../components/SafeTop";
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

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, "Explore">,
  NativeStackNavigationProp<RootStackParamList>
>;

// make a function that returns a navigation prop type

export const ExploreScreen = () => {
  const navigation = useNavigation<NavigationProp<"Explore">>();
  const { bottom } = useSafeAreaInsets();

  return (
    <View flex={1} variant="background">
      <SafeTop />
      <HStack space={4} alignItems="center" pl="5" _android={{ mt: 3 }}>
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
        data={[
          {
            title: "adsff",
            type: "event",
          },
        ]}
        renderItem={({ item, index }) => <Text>card</Text>}
        keyExtractor={(item) => {
          return item._id;
        }}
      />
    </View>
  );
};
