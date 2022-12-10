import { AppState, Dimensions, TextInput } from "react-native";
import React, { useContext, useEffect } from "react";
import {
  FlatList,
  View,
  Heading,
  HStack,
  Icon,
  SectionList,
  Text,
} from "native-base";
import Carousel from "react-native-reanimated-carousel";
import { SafeBottom, SafeTop } from "../../../../components/SafeTop";
import { Ionicons } from "@expo/vector-icons";
import FriendCard from "../../../../components/FriendCard";
import FriendList from "../../../../components/FriendList";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserContext } from "../../../contexts/user/context";
import { FriendCarousel } from "../components/FriendCarousel";
import {
  RootStackNavigationProp,
  RootStackParamList,
  RootStackScreenProps,
} from "../../../../types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FriendContext } from "../../../contexts/FriendContext";

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootStackParamList, "Home">,
  NativeStackNavigationProp<RootStackParamList>
>;

const HomeScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp<"Home">>();
  const { width } = Dimensions.get("window");
  const { bottom } = useSafeAreaInsets();
  const { userData } = React.useContext(UserContext);
  const { friends } = useContext(FriendContext);

  const appState = React.useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        //console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      // setAppStateVisible(appState.current);
      //console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View flex={1} variant="background">
      <SafeTop />
      <HStack space={4} alignItems="center" pl="5" _android={{ mt: 3 }}>
        <Icon
          onPress={() => {
            navigation.navigate("User");
          }}
          size="3xl"
          as={<Ionicons name="person-circle" />}
        />
        <Heading fontSize={"4xl"}>Friends</Heading>
        <Icon
          onPress={() => {
            navigation.navigate("AddFriend");
          }}
          ml="auto"
          mr={4}
          size="3xl"
          as={<Ionicons name="add-circle-outline" />}
        />
      </HStack>
      {/* <Text>{JSON.stringify(userData.friends[0])}</Text> */}
      <SectionList
        pb={bottom}
        sections={[
          // {
          //   title: "Recents",
          //   horizontal: true,
          //   data: userData.friends,
          // },
          {
            title: "Favorites",
            horizontal: true,
            data: userData.favorites || [],
          },
          {
            title: "All",
            numColumns: 3,
            carousel: true,
            data: friends,
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
            <Heading fontSize={"2xl"} pl="5" my="5">
              {section.title}
            </Heading>
            {section.horizontal ? (
              <FriendList friends={section.data} />
            ) : section.numColumns ? (
              <FriendCarousel friends={section.data} />
            ) : // <Text>asd</Text>
            null}
          </>
        )}
        keyExtractor={(item) => item.contactId + "asd"}
        stickySectionHeadersEnabled
        renderSectionFooter={({ section }) =>
          section.safeBottom ? <SafeBottom /> : null
        }
      />
    </View>
  );
};

export default HomeScreen;
