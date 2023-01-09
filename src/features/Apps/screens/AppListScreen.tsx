import {
  SectionList,
  HStack,
  Heading,
  Icon,
  ScrollView,
  Text,
  View,
} from "native-base";
import React from "react";
import { SafeTop } from "../../../components/SafeTop";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../../../types";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedCircles } from "../components/AnimatedCircles";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const AppListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp<"Home">>();
  const { bottom } = useSafeAreaInsets();
  // const matrix = useSharedValue(identity4);
  const pan = Gesture.Pan();
  const pinch = Gesture.Pinch();
  const rotation = Gesture.Rotation();

  const mockApps = [
    {
      name: "App 1",
      icon: "https://picsum.photos/200",
    },
  ];

  return (
    <View variant="background" flex={1}>
      <SafeTop />
      <HStack space={4} alignItems="center" pl="5" _android={{ mt: 3 }}>
        <Icon
          onPress={() => {
            navigation.navigate("User");
          }}
          size="3xl"
          as={<Ionicons name="person-circle" />}
        />
        <Heading fontSize={"4xl"}>Apps</Heading>
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
      <SectionList
        pb={bottom}
        sections={[
          {
            title: "Your Apps",
            horizontal: true,
            data: mockApps,
          },
          {
            title: "New Apps",
            horizontal: true,
            data: mockApps,
          },
          {
            title: "Popular Apps",
            numColumns: 3,
            carousel: true,
            data: mockApps,
          },
          // {
          //   title: "Keep in touch",
          //   horizontal: true,
          //   safeBottom: true,
          //   data: userData.suggestions,
          // },
        ]}
        renderItem={({ item, section }) =>
          section.horizontal || section.numColumns ? null : (
            // <FriendCard bigger={false} />
            <Text>sd</Text>
          )
        }
        renderSectionHeader={({ section }) => (
          <>
            {section.title == "Favorites" && section.data.length > 0 ? (
              <>
                <Heading fontSize={"2xl"} pl="5" my="5">
                  {section.title}
                </Heading>
                <FriendList friends={section.data} />
              </>
            ) : section.title == "All" ? (
              <>
                <Heading fontSize={"2xl"} pl="5" my="5">
                  {section.title}
                </Heading>
                <FriendCarousel friends={section.data} />
              </>
            ) : section.title == "Recents" && section.data.length > 0 ? (
              <>
                <Heading fontSize={"2xl"} pl="5" my="5">
                  {section.title}
                </Heading>
                <RecentCallList calls={section.data} />
              </>
            ) : null}
          </>
        )}
        keyExtractor={(item) => {
          return item.contactId;
        }}
        stickySectionHeadersEnabled
        renderSectionFooter={({ section }) =>
          section.safeBottom ? <SafeBottom /> : null
        }
      />
      {/* <AnimatedCircles /> */}
      {/* <GestureDetector gesture={Gesture.Race(pan, pinch, rotation)}>
        <Animated.View></Animated.View>
      </GestureDetector> */}
    </View>
  );
};
