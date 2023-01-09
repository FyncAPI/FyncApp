import { Ionicons } from "@expo/vector-icons";
import { HStack, Icon, IconButton, Text, View } from "native-base";
import React from "react";
import { Friend } from "../contexts/user/types";
import { Factory } from "native-base";
import { PhoneNumber } from "expo-contacts";
import CountryFlag from "react-native-country-flag";
import { Linking } from "react-native";

function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function PhoneNumberCardBase({ phoneNumber }: { phoneNumber: PhoneNumber }) {
  return (
    <HStack p={1} justifyContent={"center"} alignItems={"center"}>
      {/* {phoneNumber.countryCode && (
        // <CountryFlag isoCode={phoneNumber.countryCode} size={25} />
        
      )} */}
      <Text fontSize={"xl"} pl="2">
        {phoneNumber?.countryCode && getFlagEmoji(phoneNumber?.countryCode)}{" "}
        {phoneNumber.number}
      </Text>
      <View flex={1} />
      {/* <IconButton
        icon={<Icon as={Ionicons} name="pencil" />}
        _icon={{
          color: "light.100",
          _light: {
            color: "dark.100",
          },
        }}
        borderRadius="full"
      /> */}
      <IconButton
        icon={<Icon as={Ionicons} name="call" />}
        borderRadius="full"
        onPress={() => {
          Linking.openURL(`tel:${phoneNumber.number}`);
        }}
        variant="ghost"
        _icon={{
          color: "green.500",
        }}
      />
    </HStack>
  );
}

export const PhoneNumberCard = Factory(PhoneNumberCardBase);
