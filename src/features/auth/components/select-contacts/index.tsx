import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FlatList,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import * as Contacts from "expo-contacts";
import ContactsSelector from "../../../../../components/ContactSelector.tsx";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { SearchBar } from "../../../../components/SearchBar";

export default function SelectContacts({
  selectedContacts,
  setSelectedContacts,
}: {
  selectedContacts: string[];
  setSelectedContacts: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  // const [selected, setSelected] = useState<string[]>([]);
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [query, setQuery] = useState("");
  const [searchedContacts, setSearchedContacts] = useState<Contacts.Contact[]>(
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        console.log(status, "tus");
        if (status === "granted") {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Image, Contacts.Fields.PhoneNumbers],
          });
          if (data.length > 0) {
            setContacts(data);
          }
        } else {
          console.log("Permission denied");
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (query == "") {
      setMaxPage(Math.ceil(contacts.length / 50));
    } else {
      setMaxPage(Math.ceil(searchedContacts.length / 50));
    }
  }, [contacts, searchedContacts]);

  useEffect(() => {
    setSearchedContacts(
      contacts.filter(
        (contact) =>
          contact?.name?.toLowerCase().includes(query.toLowerCase()) ||
          (Number(query) &&
            contact?.phoneNumbers
              ?.map((n) => n?.number?.includes(query))
              .includes(true)) ||
          contact?.nickname?.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query]);

  useEffect(() => {
    console.log(selectedContacts, "x");
  }, [selectedContacts]);

  return (
    <View flex={1} variant="background" p="2">
      <Heading>Select Contact</Heading>

      <SearchBar query={query} setQuery={setQuery} />

      {query && searchedContacts?.length == 0 && <Text>No contacts found</Text>}
      <FlatList
        data={
          query
            ? searchedContacts.slice(50 * (page - 1), 50 * page)
            : contacts.slice(50 * (page - 1), 50 * page)
        }
        // estimatedItemSize={50}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <ContactsSelector
              contact={item}
              selectedContacts={selectedContacts}
              setSelectedContacts={setSelectedContacts}
            />
          );
        }}
      />
      <HStack alignItems="center" justifyContent="space-evenly">
        <Button
          onPress={() => {
            setPage((prev) => prev - 1);
          }}
          isDisabled={page <= 1}
        >
          Prev Page
        </Button>
        <Text>
          {page}/{maxPage}
        </Text>
        <Button
          onPress={() => {
            setPage((prev) => prev + 1);
          }}
          isDisabled={page >= maxPage}
        >
          Next Page
        </Button>
      </HStack>
    </View>
  );
}
