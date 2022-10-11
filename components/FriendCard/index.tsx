import React from "react";
import { Box, Image, Text } from "native-base";
import { Friend } from "../../src/contexts/user";
import { LinearGradient } from "expo-linear-gradient";

// export default function FriendCard({ friend }: { friend: Friend }) {
export default function FriendCard({ bigger }: { bigger: boolean }) {
  const size = bigger ? 120 : 100;
  return (
    <Box overflow="hidden" mx="2.5" borderRadius="md">
      <Image
        source={{
          uri: "https://placebeard.it/100x100",
        }}
        w={size}
        h={size}
        alt="friend image"
      />
      <Text
        zIndex={2}
        position="absolute"
        bottom="0.5"
        left="1.5"
        fontWeight="medium"
      >
        {/* {friend.nickname} */}
        random name
      </Text>
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
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
  );
}
