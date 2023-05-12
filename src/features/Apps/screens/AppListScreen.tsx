import {
  SectionList,
  HStack,
  Heading,
  Icon,
  ScrollView,
  Text,
  View,
} from "native-base";
import React, { useContext } from "react";
import { SafeBottom, SafeTop } from "../../../components/SafeTop";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../../../types";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedCircles } from "../components/AnimatedCircles";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppList } from "../components/AppList";
import { App } from "../apps.type";
import { SettingsContext } from "../../../contexts/settings/SettingsContext";
import { AppType, AppsContext } from "../../../contexts/apps/AppsContext";

export const AppListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp<"Home">>();
  const { bottom } = useSafeAreaInsets();
  const { fyncOnlineEnabled } = useContext(SettingsContext);
  // const matrix = useSharedValue(identity4);
  const pan = Gesture.Pan();
  const pinch = Gesture.Pinch();
  const rotation = Gesture.Rotation();

  const { newApps, popularApps, myApps } = useContext(AppsContext);

  return (
    <View variant="background" flex={1}>
      <SafeTop />
      <HStack space={4} alignItems="center" pl="5" _android={{ mt: 3 }}>
        {/* <Icon
          onPress={() => {
            navigation.navigate("User");
          }}
          size="3xl"
          as={<Ionicons name="person-circle" />}
        /> */}
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
            title: "My Apps",
            type: "myApps",
            horizontal: true,
            data: myApps,
          },
          {
            title: "New Apps",
            type: "newApps",
            horizontal: true,
            data: newApps,
          },
          {
            title: "Popular Apps",
            type: "popularApps",
            horizontal: true,
            data: popularApps,
          },
        ]}
        renderItem={({ item, section }) => null}
        renderSectionHeader={({ section }) => (
          <>
            <AppList
              apps={section.data}
              title={section.title}
              type={section.type as AppType}
            />
          </>
        )}
        keyExtractor={(item) => {
          return item._id;
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
      {/* <AppList apps={mockApps} title={"asdfasdfs"} /> */}
    </View>
  );
};
