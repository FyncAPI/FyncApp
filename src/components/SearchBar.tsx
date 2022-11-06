import { View, Text } from "react-native";
import React from "react";
import { Icon, Input, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export function SearchBar({
  query,
  setQuery,
}: {
  query: string;
  setQuery: any;
}) {
  return (
    <VStack w="100%" space={5} alignSelf="center">
      <Input
        placeholder="Search"
        variant="filled"
        width="100%"
        borderRadius="10"
        py="1.5"
        my="1"
        px="2"
        value={query}
        onChangeText={(text) => setQuery(text)}
        InputLeftElement={
          <Icon
            ml="2"
            size="4"
            color="gray.400"
            as={<Ionicons name="ios-search" />}
          />
        }
      />
    </VStack>
  );
}
