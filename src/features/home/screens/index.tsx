import { Dimensions, TextInput } from "react-native";
import React from "react";
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
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserContext } from "../../../contexts/user";
import { Friend } from "../../../contexts/user/index";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  const { bottom } = useSafeAreaInsets();
  const { userData } = React.useContext(UserContext);

  return (
    <View flex={1} variant="background">
      <SafeTop />
      <HStack space={4} alignItems="center" pl="5">
        <Icon
          onPress={() => {
            navigation.navigate("User");
          }}
          size="3xl"
          as={<Ionicons name="person-circle" />}
        />
        <Heading fontSize={"4xl"}>Friends</Heading>
        {false ? <Text>yes</Text> : <Text>No</Text>}
      </HStack>
      <SectionList
        pb={bottom}
        sections={[
          {
            title: "Recents",
            horizontal: true,
            data: userData.recents,
          },
          {
            title: "Favorites",
            horizontal: true,
            data: userData.favorites,
          },
          {
            title: "All",
            numColumns: 3,
            carousel: true,
            data: userData.friends,
          },
          {
            title: "Keep in touch",
            horizontal: true,

            safeBottom: true,
            data: userData.suggestions,
          },
        ]}
        renderItem={({ item, section }) =>
          section.horizontal || section.numColumns ? null : (
            <FriendCard bigger={false} />
          )
        }
        renderSectionHeader={({ section }) => (
          <>
            <Heading fontSize={"2xl"} pl="5" my="5">
              {section.title}
            </Heading>
            {section.horizontal ? (
              <FriendList friends={section.data as Friend[]} />
            ) : section.numColumns ? (
              <Carousel
                width={width}
                height={120}
                data={section.data}
                scrollAnimationDuration={900}
                onSnapToItem={(index) => console.log("current index:", index)}
                panGestureHandlerProps={{
                  activeOffsetX: [-10, 10],
                }}
                renderItem={({ item, index }) => {
                  console.log(typeof item, "x");
                  return (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                      }}
                    >
                      <FlatList
                        scrollEnabled={false}
                        alignSelf="center"
                        ItemSeparatorComponent={() => (
                          <View style={{ height: 12 }} />
                        )}
                        numColumns={3}
                        data={section.data}
                        renderItem={({ item, index }) => {
                          console.log(item, index);
                          return <FriendCard bigger friend={item} />;
                        }}
                      />
                    </View>
                  );
                }}
              />
            ) : null}
          </>
        )}
        keyExtractor={(item) => item.id + "asd"}
        stickySectionHeadersEnabled
        renderSectionFooter={({ section }) =>
          section.safeBottom ? <SafeBottom /> : null
        }
      />
    </View>
  );
};

export default HomeScreen;
