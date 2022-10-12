import { Box, Heading, HStack, Image, Text, View } from "native-base";
import React from "react";

export default function RecommendList() {
  return (
    <Box borderRadius="2xl" bgColor="gray.800" p="5" mx="5">
      <Heading mb="3" fontSize="2xl" color="white">
        Keep in touch
      </Heading>

      <HStack space={4} alignItems="center">
        {[1, 2, 3, 4].map((item, index) => (
          <FriendIcon />
        ))}
      </HStack>
    </Box>
  );
}

function FriendIcon() {
  return (
    <Box flex={1} alignItems="center">
      <Image
        source={{ uri: "https://placebeard.it/100x100" }}
        style={{
          width: "100%",
          aspectRatio: 1,
          borderRadius: 100,
          backgroundColor: "gray",
        }}
      />
      <Text color="gray.200" fontSize="lg" fontWeight="normal" mt="1">
        Cha
      </Text>
    </Box>
  );
}
