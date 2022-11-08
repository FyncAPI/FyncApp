import React, { useContext, useEffect } from "react";
import { Button, ScrollView, Text, View } from "native-base";
import SelectContacts from "../../components/select-contacts";
import { SafeBottom, SafeTop } from "../../../../../components/SafeTop";
import {
  Friend,
  UserContext,
  UserData,
} from "../../../../contexts/user-context";
import ProfileForm from "../../components/profile-form";
import { Contact, getContactByIdAsync, getContactsAsync } from "expo-contacts";
import GetGps from "../../components/get-gps";
import LoadFriends from "../../components/load-friends";

export default function FormScreen() {
  const [page, setPage] = React.useState(0);
  const [selectedContactsId, setSelectedContactsId] = React.useState<string[]>(
    []
  );
  const [userData, setUserData] = React.useState<UserData>({} as UserData);
  const { saveUserData } = useContext(UserContext);

  const updateData =
    (key: keyof UserData) => (data: UserData[keyof UserData]) => {
      setUserData({
        ...userData!,
        [key]: data,
      });
    };

  // const friends = selectedContactsId.map((id) => {
  //   getContactByIdAsync(id).then((contact) => {
  //     return {
  //       ...contact,
  //       memories: [],
  //       recents: [],
  //       friendship: {
  //         level: 0,
  //         points: 0,
  //       },
  //     };
  //   });
  // });

  // updateData("friends")(friends);

  // console.log(friends, "fbd");

  const onNext = () => {
    if (page == 2) {
      // send to server
      // save id back here
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
          selectedContactsId={selectedContactsId}
          setSelectedContactsId={setSelectedContactsId}
        />
      ) : page == 2 ? (
        <LoadFriends
          friendsIds={selectedContactsId}
          friends={userData?.friends}
          setFriends={updateData("friends")}
        />
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
