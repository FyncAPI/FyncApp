import { FlatList, View } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FriendCard from "../../../../components/FriendCard";
import { Friend } from "../../../contexts/user/types";

export const FriendCarousel = ({ friends }: { friends: Friend[] }) => {
  const { width } = Dimensions.get("window");
  const { bottom } = useSafeAreaInsets();
  return (
    <View>
      <Carousel
        width={width}
        height={140 * (friends.length <= 3 ? 1 : friends.length <= 6 ? 2 : 3)}
        data={Array.from(Array(friends.length % 9).keys())}
        scrollAnimationDuration={900}
        onSnapToItem={(index) => console.log("current index:", index)}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        renderItem={({ item, index }) => {
          // console.log(typeof item, "x");
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
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
                data={friends}
                renderItem={({ item, index }) => {
                  // console.log(item, index);
                  return <FriendCard bigger friend={item} key={index} />;
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};
