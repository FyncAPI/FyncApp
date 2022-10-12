import { Dimensions, TextInput } from "react-native";
import React from "react";
import {
  Button,
  FlatList,
  View,
  Heading,
  HStack,
  Icon,
  ScrollView,
  Switch,
  VStack,
  SectionList,
  Text,
  Box,
} from "native-base";
import Carousel from "react-native-reanimated-carousel";
import { SafeBottom, SafeTop } from "../../../../components/SafeTop";
import { Ionicons } from "@expo/vector-icons";
import FriendCard from "../../../../components/FriendCard";
import FriendList from "../../../../components/FriendList";
import { useNavigation } from "@react-navigation/native";
import RecommendList from "../../../../components/RecommendList";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  const [query, setQuery] = React.useState("");
  return (
    <SectionList
      sections={[
        {
          title: "a",
          horizontal: true,

          data: Array.from({ length: 10 }).map((_, index) => ({
            id: index,
            nickname: "Mark",
          })),
        },
        {
          title: "b",
          numColumns: 3,
          carousel: true,
          data: Array.from({ length: 10 }).map((_, index) => ({
            id: index,
            nickname: "Karl",
          })),
        },
        {
          title: "b",
          numColumns: 3,
          data: Array.from({ length: 10 }).map((_, index) => ({
            id: index,
            nickname: "Karl",
          })),
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
            <FlatList
              // horizontal
              data={section.data}
              renderItem={({ item }) => <FriendList />}
              showsHorizontalScrollIndicator={false}
            />
          ) : section.numColumns ? (
            <Carousel
              width={width}
              height={550}
              data={section.data}
              scrollAnimationDuration={900}
              onSnapToItem={(index) => console.log("current index:", index)}
              panGestureHandlerProps={{
                activeOffsetX: [-10, 10],
              }}
              renderItem={({ item, index }) => (
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
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                    renderItem={() => <FriendCard bigger />}
                  />
                </View>
              )}
            />
          ) : null}
        </>
      )}
      keyExtractor={(item) => item.id + item.nickname}
      stickySectionHeadersEnabled
    />
  );
  return (
    <ScrollView flex={1} backgroundColor="gray.900">
      <SafeTop />
      <HStack space={4} alignItems="center" pl="5">
        <Icon
          onPress={() => {
            navigation.navigate("User");
          }}
          size="3xl"
          color="white"
          as={<Ionicons name="person-circle" />}
        />
        <Heading fontSize={"4xl"}>Friends</Heading>
      </HStack>
      <Heading fontSize={"2xl"} pl="5" my="5">
        Recents
      </Heading>
      <FriendList />
      <Heading fontSize={"2xl"} pl="5" my="5">
        Favorites
      </Heading>
      <FriendList />
      <Heading fontSize={"2xl"} pl="5" my="5">
        All
      </Heading>
      <Carousel
        width={width}
        height={550}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={900}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <FlatList
              scrollEnabled={false}
              alignSelf="center"
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
              numColumns={3}
              data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
              renderItem={() => <FriendCard bigger />}
            />
          </View>
        )}
      />

      <RecommendList />
      {/* <FriendList /> */}
      <SafeBottom />
    </ScrollView>
  );
};

export default HomeScreen;
