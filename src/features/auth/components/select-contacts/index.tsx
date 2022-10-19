import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FlatList,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import * as Contacts from "expo-contacts";
import ContactSelector from "../../../../../components/ContactSelector.tsx";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";

export default function SelectContacts({
  selectedContacts,
  setSelectedContacts,
}: {
  selectedContacts: Contacts.Contact[];
  setSelectedContacts: React.Dispatch<React.SetStateAction<Contacts.Contact[]>>;
}) {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  // const [selectedContacts, setSelectedContacts] = useState<Contacts.Contact[]>(
  //   []
  // );

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const contact = data[0];
          console.log(contact);

          setContacts(data);
        }
      }
    })();
  }, []);

  // useEffect(() => {
  //   console.log(selectedContacts);
  // }, [selectedContacts]);

  return (
    <ScrollView flex={1} variant="background" p="2">
      <Heading>Select Contact</Heading>
      {contacts && contacts.length > 0 ? (
        <FlatList
          data={contacts}
          renderItem={({ item: contact }) => (
            <HStack>
              {contact.imageAvailable ? (
                <Image
                  source={{ uri: contact.image?.uri }}
                  alt="image"
                  size="10"
                />
              ) : (
                <Icon as={Ionicons} name="person-circle-outline" size="10" />
              )}
              <VStack ml={1}>
                <Text fontWeight="bold">{contact.firstName}</Text>
                <Text>
                  {contact?.phoneNumbers && contact.phoneNumbers[0].number}
                </Text>
              </VStack>
            </HStack>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        // <Checkbox.Group
        //   onChange={setSelectedContacts}
        //   value={selectedContacts}
        //   accessibilityLabel="choose numbers"
        // >
        //   {contacts.map((contact) => (
        //     <Checkbox
        //       value={contact}
        //       colorScheme="green"
        //       mr="2"
        //       key={contact.id + "CONTACT"}
        //     >
        //       {contact.imageAvailable ? (
        //         <Image
        //           source={{ uri: contact.image?.uri }}
        //           alt="image"
        //           size="10"
        //         />
        //       ) : (
        //         <Icon as={Ionicons} name="person-circle-outline" size="10" />
        //       )}
        //       <VStack ml={1}>
        //         <Text fontWeight="bold">{contact.firstName}</Text>
        //         <Text>
        //           {contact?.phoneNumbers && contact.phoneNumbers[0].number}
        //         </Text>
        //       </VStack>
        //     </Checkbox>
        //   ))}
        // </Checkbox.Group>
        <ActivityIndicator />
      )}
    </ScrollView>
  );
}
