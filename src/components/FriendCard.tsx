import React, { useContext } from "react";
import { Box, Image, Text, View } from "native-base";
import { Friend } from "../contexts/user/types";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, TouchableOpacity } from "react-native";
import { RootStackNavigationProp } from "../../types";
import { FriendContext } from "../contexts/FriendContext";
import { SvgXml } from "react-native-svg";

// export default function FriendCard({ friend }: { friend: Friend }) {
export default function FriendCard({
  listLength,
  friend,
}: {
  listLength?: number;
  friend: Friend;
}) {
  const navigation = useNavigation<RootStackNavigationProp<"Home">>();

  const { callFriend } = useContext(FriendContext);

  const screenSizes = Dimensions.get("window");
  console.log(screenSizes.width);

  const size = screenSizes.width / 3 - 30;

  return (
    <TouchableOpacity
      onPress={() => {
        callFriend(friend?.contact.phoneNumbers, friend?.contact.id);
      }}
      onLongPress={() => {
        navigation.navigate("Friend", { id: friend?.contact.id });
      }}
      delayLongPress={500}
    >
      <Box overflow="hidden" mx="2.5" borderRadius="lg">
        {friend?.contact?.image ? (
          <Image
            source={friend?.contact.image}
            w={size || 100}
            h={size || 100}
            alt="friend image"
          />
        ) : friend.avatar ? (
          <View>
            <SvgXml
              xml={friend.avatar}
              width={size || 100}
              height={size || 100}
            />
          </View>
        ) : null}

        <Text
          zIndex={2}
          position="absolute"
          bottom="0.5"
          left="1.5"
          fontWeight="bold"
          fontSize="lg"
          color="white"
        >
          {friend?.contact?.nickname || friend?.contact?.name}
        </Text>
        <LinearGradient
          colors={
            listLength == 1
              ? [
                  "transparent",
                  "transparent",
                  "transparent",
                  "transparent",
                  "rgba(0,0,0,0.8)",
                ]
              : ["transparent", "transparent", "transparent", "rgba(0,0,0,0.8)"]
          }
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            width: size,
            height: size,
          }}
        />
      </Box>
    </TouchableOpacity>
  );
}
