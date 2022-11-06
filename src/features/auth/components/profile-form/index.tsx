import {
  Box,
  FormControl,
  Heading,
  Input,
  Text,
  View,
  WarningOutlineIcon,
} from "native-base";
import React, { useEffect, useState } from "react";
import { User } from "../../../../contexts/user-context";
import * as Contacts from "expo-contacts";
import { SearchBar } from "../../../../components/SearchBar";
import ContactsSelector, {
  ContactSelector,
} from "../../../../../components/ContactSelector.tsx";
import { FlatList } from "react-native-gesture-handler";

export default function ProfileForm({
  profile,
  setProfile,
}: {
  profile: User | undefined;
  setProfile: (profile: User | undefined) => void;
}) {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [query, setQuery] = useState("");
  const [searchedContacts, setSearchedContacts] = useState<Contacts.Contact[]>(
    []
  );

  const [error, setError] = React.useState({});

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
          setError({ ...error, contacts: "Permission denied" });
        }
      } catch (err) {
        setError({ ...error, contacts: err });
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

  return (
    <View flex={1} variant="background" p="2">
      <Heading>Choose your profile</Heading>

      <Text> {JSON.stringify(profile)}</Text>
      <SearchBar query={query} setQuery={setQuery} />

      {query && searchedContacts?.length == 0 && <Text>No contacts found</Text>}
      <FlatList
        data={
          query
            ? searchedContacts.slice(50 * (page - 1), 50 * page)
            : contacts.slice(50 * (page - 1), 50 * page)
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <ContactSelector
              contact={item}
              selectedContact={profile}
              setSelectedContact={() => setProfile(item)}
            />
          );
        }}
      />
    </View>
  );
}

const FormInput = ({
  label,
  value,
  setValue,
  errorMessage,
  isInvalid,
  ...props
}: {
  label: string;
  value: string | undefined;
  setValue: (value: string) => void;
  errorMessage?: string;
  isInvalid?: boolean;
} & React.ComponentProps<typeof Input>) => {
  return (
    <Box alignItems="center">
      <FormControl isInvalid={isInvalid} w="75%" maxW="300px">
        <FormControl.Label>{label}</FormControl.Label>
        <Input value={value} setValue={setValue} {...props} />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errorMessage}
        </FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
};
