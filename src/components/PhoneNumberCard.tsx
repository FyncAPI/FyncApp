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
    <HStack p={1}>
      {/* {phoneNumber.countryCode && (
        // <CountryFlag isoCode={phoneNumber.countryCode} size={25} />
        
      )} */}
      <Text fontSize={"xl"}>
        {getFlagEmoji(phoneNumber?.countryCode)} {phoneNumber.number}
      </Text>
      <View flex={1} />
      <IconButton
        icon={<Icon as={Ionicons} name="pencil" />}
        borderRadius="full"
      />
      <IconButton
        icon={<Icon as={Ionicons} name="call" />}
        borderRadius="full"
        onPress={() => {
          Linking.openURL(`tel:${phoneNumber.number}`);
        }}
      />
    </HStack>
  );
}

export const PhoneNumberCard = Factory(PhoneNumberCardBase);
