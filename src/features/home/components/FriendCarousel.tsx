import { FlatList, Text, View } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FriendCard from "../../../components/FriendCard";
import { SettingsContext } from "../../../contexts/settings/SettingsContext";
import { Friend } from "../../../contexts/user/types";

export const FriendCarousel = gestureHandlerRootHOC(
  ({ friends }: { friends: Friend[] }) => {
    const { width } = Dimensions.get("window");
    const { bottom } = useSafeAreaInsets();
    const { carouselNumColumns } = React.useContext(SettingsContext);
    const size = width - 30;
    return (
      <Carousel
        width={width}
        height={
          friends.length == 1 ? size : friends.length <= 6 ? size * 2 : size * 3
        }
        data={Array(Math.ceil(friends.length / 9))
          .fill(1)
          .map((_, index) => index * 9)
          .map((begin) => friends.slice(begin, begin + 9))}
        scrollAnimationDuration={900}
        onSnapToItem={(index) => console.log("current index:", index)}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        loop={false}
        renderItem={({ item, index }) => {
          //console.log(item.length);
          return (
            <View
              // bg={"#22333359"}
              _dark={{ bg: "trueGray.800" }}
              _light={{ bg: "light.100" }}
              p="1"
              // mx={item.length <= 3 ? 4 : 2}
              mx={2}
              py={2}
              rounded={"xl"}
              key={index + "LSX"}
              // alignItems="center"
              // justifyContent="center"
            >
              <FlatList
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                }}
                data={item}
                key={item.length + "FRIEND" + carouselNumColumns}
                keyExtractor={(item) => item.contactId + carouselNumColumns}
                horizontal={false}
                numColumns={carouselNumColumns}
                ItemSeparatorComponent={() => (
                  <View style={{ height: 13 + carouselNumColumns }}>
                    {/* <View height={"0.2"} bg="amber.100" /> */}
                  </View>
                )}
                renderItem={({ item: friend, index }) => (
                  <FriendCard
                    listLength={item.length}
                    friend={friend}
                    key={index + "FRIEND"}
                  />
                )}
              />
              {/* <FlatList
                scrollEnabled={false}
                alignSelf="center"
                ItemSeparatorComponent={() => (
                  <View style={{ height: 12 }}>
                    <View height={"0.2"} bg="amber.100" />
                  </View>
                )}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                numColumns={3}
                data={item}
                renderItem={({ item: friend, index }) => {
                  return (
                    <FriendCard
                      listLength={item.length}
                      friend={friend}
                      key={index + "FRIEND"}
                    />
                  );
                }}
              /> */}
            </View>
          );
        }}
      />
    );
  }
);
