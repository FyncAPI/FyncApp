import React, { useContext, useEffect } from "react";
import { Button, Icon, ScrollView, Text, View } from "native-base";
import SelectContacts from "../../components/select-contacts";
import { SafeBottom, SafeTop } from "../../../../../components/SafeTop";
import { UserContext } from "../../../../contexts/user/context";
import ProfileForm from "../../components/profile-form";
import { Contact, getContactByIdAsync, getContactsAsync } from "expo-contacts";
import GetGps from "../../components/get-gps";
import LoadFriends from "../../components/load-friends";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { UserData } from "../../../../contexts/user/types";

export default function FormScreen() {
  const [page, setPage] = React.useState(0);
  const [selectedContactsId, setSelectedContactsId] = React.useState<string[]>(
    []
  );
  const [userData, setUserData] = React.useState<UserData>({} as UserData);
  const { saveUserData } = useContext(UserContext);
  const navigation = useNavigation();

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
      saveUserData(userData);
    } else {
      setPage(page + 1);
    }
  };

  const onBack = () => {
    if (page == 0) {
      navigation.goBack();
    } else {
      setPage(page - 1);
    }
  };

  return (
    <View flex={1} variant="background" p="3">
      <SafeTop />
      <TouchableOpacity onPress={onBack}>
        <Icon as={Ionicons} name="arrow-back" size={8} />
      </TouchableOpacity>
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
