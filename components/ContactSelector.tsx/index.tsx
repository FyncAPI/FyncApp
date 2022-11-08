import React from "react";
import { ContactType } from "expo-contacts";
import { View, Text, HStack, Checkbox, Image, Icon, VStack } from "native-base";
import { Contact } from "expo-contacts";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function ContactsSelector({
  contact,
  selectedContacts,
  setSelectedContacts,
}: {
  contact: Contact;
  selectedContacts: string[];
  setSelectedContacts: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [selected, setSelected] = React.useState(false);

  React.useEffect(() => {
    setSelected(selectedContacts.includes(contact.id));
  }, [selectedContacts]);

  return (
    <TouchableOpacity
      onPress={() => {
        console.log(contact.id);
        // selectContact(contact.id);
        setSelectedContacts((prev) => {
          if (prev.includes(contact.id)) {
            return prev.filter((id) => id !== contact.id);
          } else {
            return [...prev, contact.id];
          }
        });
      }}
    >
      <HStack alignItems="center">
        {selected ? (
          <Icon as={Ionicons} name="checkmark-outline" size="5" />
        ) : (
          <Icon as={Ionicons} name="ellipse-outline" size="5" />
        )}
        {contact.imageAvailable ? (
          <Image source={{ uri: contact.image?.uri }} alt="image" size="10" />
        ) : (
          <Icon as={Ionicons} name="person-circle-outline" size="10" />
        )}
        <View ml="2">
          <Text>{contact.name}</Text>
          <Text>{contact?.phoneNumbers?.[0]?.number}</Text>
        </View>
      </HStack>
    </TouchableOpacity>
  );
}

export function ContactSelector({
  contact,
  selectedContact,
  setSelectedContact,
}: {
  contact: Contact;
  selectedContact: Contact | undefined;
  setSelectedContact: React.Dispatch<React.SetStateAction<Contact | undefined>>;
}) {
  const [selected, setSelected] = React.useState(false);

  React.useEffect(() => {
    setSelected(selectedContact?.id == contact.id);
  }, [selectedContact]);

  return (
    <TouchableOpacity
      onPress={() => {
        console.log(contact.id);
        // selectContact(contact.id);
        setSelectedContact((prev) => {
          if (prev && prev?.id == contact.id) {
            return undefined;
          } else {
            console.log("set");

            return contact;
          }
        });
      }}
    >
      <HStack alignItems="center">
        {selected ? (
          <Icon as={Ionicons} name="checkmark-outline" size="5" />
        ) : (
          <Icon as={Ionicons} name="ellipse-outline" size="5" />
        )}
        {contact.imageAvailable ? (
          <Image source={{ uri: contact.image?.uri }} alt="image" size="10" />
        ) : (
          <Icon as={Ionicons} name="person-circle-outline" size="10" />
        )}
        <View ml="2">
          <Text>{contact.name}</Text>
          <Text>{contact?.phoneNumbers?.[0]?.number}</Text>
        </View>
      </HStack>
    </TouchableOpacity>
  );
}
