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
  Button,
} from "native-base";
import Carousel from "react-native-reanimated-carousel";
import { SafeBottom, SafeTop } from "../../../components/SafeTop";
import { Ionicons } from "@expo/vector-icons";
import FriendCard from "../../../components/FriendCard";
import FriendList from "../../../components/FriendList";
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
import { useLoading } from "../../../hooks/useLoading";
import { BlurView } from "expo-blur";
import LoadingIndicator from "../../../components/LoadingIndicator";
import RecentCallList from "../../../components/RecentCallList";

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootStackParamList, "Home">,
  NativeStackNavigationProp<RootStackParamList>
>;

const HomeScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp<"Home">>();
  const { width } = Dimensions.get("window");
  const { bottom } = useSafeAreaInsets();
  const { userData } = React.useContext(UserContext);
  const { friends, recentCalls } = useContext(FriendContext);

  const appState = React.useRef(AppState.currentState);

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
        <Heading fontSize={"4xl"}>Fync</Heading>
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
          {
            title: "Recents",
            horizontal: true,
            data: recentCalls,
          },
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
    </View>
  );
};

export default HomeScreen;
