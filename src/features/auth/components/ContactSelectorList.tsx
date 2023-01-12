import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FlatList,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Text,
  View,
  VStack,
} from "native-base";
import * as Contacts from "expo-contacts";
import ContactsSelector from "../../../components/ContactSelector";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { SearchBar } from "../../../components/SearchBar";
import { useContact } from "../../../hooks/useContact";
import { UserContext } from "../../../contexts/user/userContext";

export default function ContactSelectorList({
  selectedContactsId,
  setSelectedContactsId,
  friendsIds,
}: {
  selectedContactsId: string[];
  setSelectedContactsId: React.Dispatch<React.SetStateAction<string[]>>;
  friendsIds?: string[];
}) {
  // const [selected, setSelected] = useState<string[]>([]);
  // const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [query, setQuery] = useState("");
  const [searchedContacts, setSearchedContacts] = useState<Contacts.Contact[]>(
    []
  );

  const { contacts } = useContext(UserContext);

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
    setPage(1);
  }, [query]);

  return (
    <>
      <View flex={1} variant="background" p="2">
        <SearchBar query={query} setQuery={setQuery} />

        {query && searchedContacts?.length == 0 && (
          <Text>No contacts found</Text>
        )}
        <FlatList
          mt={2}
          data={
            query
              ? searchedContacts
                  .filter((c) => !friendsIds?.includes(c.id))
                  .slice(50 * (page - 1), 50 * page)
              : contacts
                  .filter((c) => !friendsIds?.includes(c.id))
                  .slice(50 * (page - 1), 50 * page)
          }
          // estimatedItemSize={50}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <ContactsSelector
                contact={item}
                selectedContacts={selectedContactsId}
                setSelectedContacts={setSelectedContactsId}
              />
            );
          }}
        />
        <HStack my={2}>
          <Text>Selected: </Text>
          <Text>
            {selectedContactsId.length}/{contacts.length}
          </Text>
        </HStack>
      </View>
    </>
  );
}
