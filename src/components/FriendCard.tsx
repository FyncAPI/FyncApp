import React, { useContext } from "react";
import { Box, Image, Text, View } from "native-base";
import { Friend } from "../contexts/user/types";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, TouchableOpacity } from "react-native";
import { RootStackNavigationProp, RootTabNavigationProp } from "../../types";
import { FriendContext } from "../contexts/friend/FriendContext";
import { SvgXml } from "react-native-svg";
import { SettingsContext } from "../contexts/settings/SettingsContext";

// export default function FriendCard({ friend }: { friend: Friend }) {
export default function FriendCard({
  listLength,
  friend,
}: {
  listLength?: number;
  friend: Friend;
}) {
  const navigation = useNavigation<RootTabNavigationProp<"Home">>();

  const { callFriend } = useContext(FriendContext);
  const { carouselNumColumns } = React.useContext(SettingsContext);

  const screenSizes = Dimensions.get("window");

  const size = screenSizes.width / carouselNumColumns - 20;

  return (
    <TouchableOpacity
      onPress={() => {
        callFriend(friend?.contact.phoneNumbers, friend?.contact.id);
      }}
      onLongPress={() => {
        navigation.navigate("FriendStack", {
          screen: "Friend",
          params: { id: friend?.contact.id },
        });
      }}
      delayLongPress={500}
      // style={{ flex: 0.5, zIndex: 20 }}
    >
      <Box overflow="hidden" mx="1.5" borderRadius="lg">
        {friend?.contact?.image ? (
          <Image
            source={friend?.contact.image}
            w={size}
            h={size}
            alt="friend image"
          />
        ) : friend.avatar ? (
          <View>
            <SvgXml xml={friend.avatar} width={size} height={size} />
          </View>
        ) : null}

        {/* <LinearGradient
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
        /> */}
      </Box>
      <Text
        zIndex={2}
        alignSelf="center"
        fontWeight="bold"
        mt={0}
        fontSize="md"
        color="white"
        _light={{ color: "black" }}
        maxW={size}
      >
        {friend?.contact?.nickname ||
          friend?.contact?.firstName ||
          friend?.contact?.name}
      </Text>
    </TouchableOpacity>
  );
}
