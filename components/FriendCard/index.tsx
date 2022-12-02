import React from "react";
import { Box, Image, Text, View } from "native-base";
import { Friend } from "../../src/contexts/user/types";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { RootStackNavigationProp } from "../../types";

// export default function FriendCard({ friend }: { friend: Friend }) {
export default function FriendCard({
  listLength,
  friend,
}: {
  listLength?: number;
  friend: Friend;
}) {
  const navigation = useNavigation<RootStackNavigationProp<"Home">>();
  const size = listLength == 2 ? 160 : listLength == 1 ? 360 : 110;
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(friend.phoneNumbers);
        Linking.openURL("tel://" + friend.phoneNumbers[0].number);
      }}
      onLongPress={() => {
        navigation.navigate("Friend", { id: friend.id });
      }}
      delayLongPress={500}
    >
      <Box overflow="hidden" mx="2.5" borderRadius="lg">
        <Image
          source={
            friend.image || {
              uri: "https://placebeard.it/100x100",
            }
          }
          w={size || 100}
          h={size || 100}
          alt="friend image"
        />

        <Text
          zIndex={2}
          position="absolute"
          bottom="0.5"
          left="1.5"
          fontWeight="bold"
          fontSize="lg"
          color="white"
        >
          {friend?.nickname || friend?.name}
        </Text>
        <LinearGradient
          colors={["transparent", "transparent", "rgba(0,0,0,0.8)"]}
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
