import React from "react";
import { ContactType } from "expo-contacts";
import { View, Text, HStack, Checkbox, Image, Icon, VStack } from "native-base";
import { Contact } from "expo-contacts";
import { Ionicons } from "@expo/vector-icons";

export default function ContactSelector({
  contact,
  selected,
  setSelected,
}: {
  contact: Contact;
  selected: string[];
  setSelected: (selected: boolean) => void;
}) {
  console.log(contact, "asd");
  return (
    <HStack p="2" alignItems="center">
      <Checkbox.Group
        onChange={setSelected}
        value={selected}
        accessibilityLabel="choose numbers"
      >
        <Checkbox value={contact.id} colorScheme="green" mr="2">
          <>
            {contact.imageAvailable ? (
              <Image
                source={{ uri: contact.image?.uri }}
                alt="image"
                size="10"
              />
            ) : (
              <Icon as={Ionicons} name="person-circle-outline" size="10" />
            )}
            <VStack ml={2}>
              <Text fontWeight="bold">{contact.firstName}</Text>
              <Text>
                {contact?.phoneNumbers && contact.phoneNumbers[0].number}
              </Text>
            </VStack>
          </>
        </Checkbox>
      </Checkbox.Group>
    </HStack>
  );
}
