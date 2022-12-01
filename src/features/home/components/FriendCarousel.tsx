import { FlatList, View } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FriendCard from "../../../../components/FriendCard";
import { Friend } from "../../../contexts/user/types";

export const FriendCarousel = gestureHandlerRootHOC(
  ({ friends }: { friends: Friend[] }) => {
    const { width } = Dimensions.get("window");
    const { bottom } = useSafeAreaInsets();
    return (
      <Carousel
        width={width}
        height={140 * (friends.length <= 6 ? 3 : 3)}
        data={Array(Math.ceil(friends.length / 9))
          .fill(1)
          .map((_, index) => index * 9)
          .map((begin) => friends.slice(begin, begin + 9))}
        scrollAnimationDuration={900}
        onSnapToItem={(index) => console.log("current index:", index)}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        renderItem={({ item, index }) => {
          console.log(item.length);

          return (
            <View
              bg={"#22333359"}
              style={{
                flex: 1,
                justifyContent: "center",
                marginHorizontal: 10,
                borderRadius: 10,
              }}
              key={index + "LSX"}
            >
              <FlatList
                scrollEnabled={false}
                alignSelf="center"
                ItemSeparatorComponent={() => (
                  <View style={{ height: 12 }}>
                    {/* <View height={"0.2"} bg="amber.100" /> */}
                  </View>
                )}
                numColumns={3}
                data={item}
                renderItem={({ item: friend, index }) => {
                  //   console.log(item, index);
                  return (
                    <FriendCard
                      listLength={item.length}
                      friend={friend}
                      key={index}
                    />
                  );
                }}
              />
            </View>
          );
        }}
      />
    );
  }
);
