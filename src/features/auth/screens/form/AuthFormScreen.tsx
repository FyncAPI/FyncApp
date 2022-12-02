import React, { useContext, useEffect } from "react";
import { Button, Icon, ScrollView, Text, View } from "native-base";
import SelectContacts from "../../components/select-contacts/SelectContact";
import { SafeBottom, SafeTop } from "../../../../../components/SafeTop";
import { UserContext } from "../../../../contexts/user/context";
import ProfileForm from "../../components/profile-form/ProfileForm";
import { Contact, getContactByIdAsync, getContactsAsync } from "expo-contacts";
import GetGps from "../../components/get-gps";
import LoadFriends from "../../components/load-friends/LoadFriend";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { UserData } from "../../../../contexts/user/types";
import { AuthStackNavigationProp } from "../../../../../types";
import BackButton from "../../../../components/BackButton";

export default function FormScreen() {
  const [page, setPage] = React.useState(0);
  const [selectedContactsId, setSelectedContactsId] = React.useState<string[]>(
    []
  );
  const [userData, setUserData] = React.useState<UserData>({} as UserData);
  const [error, setError] = React.useState({});
  const { saveUserData } = useContext(UserContext);
  const navigation = useNavigation<AuthStackNavigationProp<"Form">>();

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
    console.log(Object.entries(error).length);
    if (page == 2 && Object.entries(error).length == 0) {
      saveUserData(userData);
    } else {
      if (Object.entries(error).length) return;
      setPage(page + 1);
    }
  };

  const onBack = () => {
    console.log(page, "back");
    if (page <= 0) {
      navigation.navigate("Landing");
    } else {
      console.log(page);
      setPage(page - 1);
    }
  };

  return (
    <View flex={1} variant="background" p="3">
      <SafeTop />
      <BackButton onPress={onBack} />
      {/* <TouchableOpacity onPress={onBack}>
        <Icon as={Ionicons} name="arrow-back" size={8} />
      </TouchableOpacity> */}
      {page == 0 ? (
        <ProfileForm
          profile={userData?.profile}
          setProfile={updateData("profile")}
          error={error}
          setError={setError}
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
