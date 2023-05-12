import { AppState, Dimensions, Platform, TextInput } from "react-native";
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
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import FriendCard from "../../../components/FriendCard";
import FriendList from "../../../components/FriendList";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserContext } from "../../../contexts/user/userContext";
import { FriendCarousel } from "../components/FriendCarousel";
import {
  RootStackNavigationProp,
  RootStackParamList,
  RootStackScreenProps,
  RootTabParamList,
} from "../../../../types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FriendContext } from "../../../contexts/friend/FriendContext";
import { useLoading } from "../../../hooks/useLoading";
import { BlurView } from "expo-blur";
import LoadingIndicator from "../../../components/LoadingIndicator";
import RecentCallList from "../../../components/RecentCallList";
import Svg, {
  Circle,
  Path,
  G,
  SvgXml,
  TextPath,
  Text as TextS,
} from "react-native-svg";
import { processFontFamily } from "expo-font";
import { FriendBlob } from "../../friend/components/FriendBlob";
import { RemixIcons } from "../../../../assets/Icons/RemixIcons";
import TestXml from "../components/TextXml";
type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, "Home">,
  NativeStackNavigationProp<RootStackParamList>
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { width } = Dimensions.get("window");
  const { bottom } = useSafeAreaInsets();
  const { userData } = React.useContext(UserContext);
  const { friends, recentCalls } = useContext(FriendContext);

  const appState = React.useRef(AppState.currentState);
  const size = 120;

  return (
    <View flex={1} variant="background">
      <SafeTop />
      <HStack space={4} alignItems="center" pl="5" _android={{ mt: 3 }}>
        <Icon
          onPress={() => {
            navigation.navigate("UserStack", { screen: "User" });
          }}
          size="3xl"
          as={<Ionicons name="person-circle" />}
        />
        <Heading fontSize={"4xl"}>Fync</Heading>
        <Icon
          onPress={() => {
            navigation.navigate("AddStack", { screen: "AddFromContacts" }); //navigation.navigate("AddFriend
          }}
          ml="auto"
          mr={4}
          size="3xl"
          as={<Ionicons name="add-circle-outline" />}
        />
      </HStack>

      <SectionList
        showsVerticalScrollIndicator={false}
        pb={bottom}
        mt={2}
        flex={1}
        sections={[
          {
            title: "Recents",
            horizontal: true,
            data: recentCalls || [],
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
            data: friends || [],
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
            {section.data.length > 0 && (
              <Heading fontSize={"2xl"} pl="5" my="2">
                {section.title}
              </Heading>
            )}
            {section.title == "Favorites" && section.data.length > 0 ? (
              <FriendList friends={section.data} />
            ) : section.title == "All" ? (
              <FriendCarousel friends={section.data} />
            ) : section.title == "Recents" && section.data.length > 0 ? (
              <RecentCallList calls={section.data} />
            ) : null}
          </>
        )}
        keyExtractor={(item) => {
          return item.contactId;
        }}
        renderSectionFooter={({ section }) =>
          section.safeBottom ? <SafeBottom /> : null
        }
      />
      {/* <FriendBlob friends={friends} /> */}
    </View>
  );
};

export default HomeScreen;
