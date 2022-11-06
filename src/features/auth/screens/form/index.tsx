import React, { useContext, useEffect } from "react";
import { Button, Text, View } from "native-base";
import SelectContacts from "../../components/select-contacts";
import { SafeBottom, SafeTop } from "../../../../../components/SafeTop";
import {
  Friend,
  UserContext,
  UserData,
} from "../../../../contexts/user-context";
import ProfileForm from "../../components/profile-form";
import { Contact } from "expo-contacts";
import GetGps from "../../components/get-gps";

export default function FormScreen() {
  const [page, setPage] = React.useState(0);
  const [selectedContacts, setSelectedContacts] = React.useState<string[]>([]);
  const [userData, setUserData] = React.useState<UserData>({} as UserData);
  const { saveUserData } = useContext(UserContext);

  useEffect(() => {
    console.log(selectedContacts, "asd");
  }, [selectedContacts]);

  const updateData =
    (key: keyof UserData) => (data: UserData[keyof UserData]) => {
      setUserData({
        ...userData!,
        [key]: data,
      });
    };

  const onNext = () => {
    if (page == 2) {
      // saveUserData({
      //   friends: selectedContacts.map((contact) => ({
      //     ...contact,
      //     _id: contact.id,
      //     ...({} as Friend),
      //   })),
      //   memories: [],
      //   recents: [],
      //   favorites: [],
      //   suggestions: [],
      // });
    } else {
      setPage(page + 1);
    }
  };

  return (
    <View flex={1} variant="background" p="3">
      <SafeTop />
      {page == 0 ? (
        <ProfileForm
          profile={userData?.profile}
          setProfile={updateData("profile")}
        />
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
