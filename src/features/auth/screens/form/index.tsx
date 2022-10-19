import React, { useContext } from "react";
import { Button, Text, View } from "native-base";
import SelectContacts from "../../components/select-contacts";
import { SafeBottom, SafeTop } from "../../../../../components/SafeTop";
import { Friend, UserContext } from "../../../../contexts/user";
import ProfileForm from "../../components/profile-form";
import { Contact } from "expo-contacts";
import GetGps from "../../components/get-gps";

export default function FormScreen() {
  const [page, setPage] = React.useState(0);
  const [selectedContacts, setSelectedContacts] = React.useState<Contact[]>([]);
  const { saveUserData } = useContext(UserContext);
  const onNext = () => {
    if (page == 2) {
      saveUserData({
        friends: selectedContacts.map((contact) => ({
          ...contact,
          _id: contact.id,
          ...({} as Friend),
        })),
        memories: [],
        recents: [],
        favorites: [],
        suggestions: [],
      });
    } else {
      setPage(page + 1);
    }
  };

  return (
    <View flex={1} variant="background" p="3">
      <SafeTop />
      {page == 0 ? (
        <ProfileForm />
      ) : page == 1 ? (
        <SelectContacts
          selectedContacts={selectedContacts}
          setSelectedContacts={setSelectedContacts}
        />
      ) : page == 2 ? (
        <GetGps />
      ) : page == 3 ? (
        <Text>bt</Text>
      ) : (
        <Text>asda</Text>
      )}
      <Button onPress={onNext}>Continue</Button>
      <SafeBottom />
    </View>
  );
}
