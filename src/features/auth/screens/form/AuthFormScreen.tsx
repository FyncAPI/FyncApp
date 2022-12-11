import React, { useContext, useEffect } from "react";
import { Button, Heading, Icon, ScrollView, Text, View } from "native-base";
import ContactSelectorList from "../../components/select-contacts/SelectContact";
import { SafeBottom, SafeTop } from "../../../../../components/SafeTop";
import { UserContext } from "../../../../contexts/user/context";
import ProfileForm from "../../components/profile-form/ProfileForm";
import { Contact, getContactByIdAsync, getContactsAsync } from "expo-contacts";
import GetGps from "../../components/get-gps";
import LoadFriends from "../../components/load-friends/LoadFriend";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Friend, FriendsData, UserData } from "../../../../contexts/user/types";
import { AuthStackNavigationProp } from "../../../../../types";
import BackButton from "../../../../components/BackButton";

export default function AuthFormScreen() {
  const [page, setPage] = React.useState(0);
  const [selectedContactsId, setSelectedContactsId] = React.useState<string[]>(
    []
  );
  const [userData, setUserData] = React.useState<UserData>({} as UserData);
  // const [friendsData, setFriendsData] = React.useState<FriendsData>(
  //   {} as FriendsData
  // );
  const [friends, setFriends] = React.useState<Friend[]>([]);
  const [error, setError] = React.useState({});

  const { saveUserData, saveFriendsData } = useContext(UserContext);

  const navigation = useNavigation<AuthStackNavigationProp<"Form">>();

  const updateData =
    (key: keyof UserData) => (data: UserData[keyof UserData]) => {
      setUserData({
        ...userData!,
        [key]: data,
      });
    };

  // const updateFriendsData =
  //   (key: keyof FriendsData) => (data: FriendsData[keyof FriendsData]) => {
  //     setFriendsData({
  //       ...friendsData!,
  //       [key]: data,
  //     });
  //   };

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

  // //console.log(friends, "fbd");

  const onNext = () => {
    //console.log(Object.entries(error).length);
    if (page == 2 && Object.entries(error).length == 0) {
      console.log(
        friends.map((f) => f.contact),
        "friends",
        userData,
        "userData"
      );
      saveUserData(userData);
      // saveFriendsData(friendsData);
      saveFriendsData({
        friends,
      });
    } else {
      if (Object.entries(error).length) return;
      setPage(page + 1);
    }
  };

  const onBack = () => {
    //console.log(page, "back");
    if (page <= 0) {
      navigation.navigate("Landing");
    } else {
      //console.log(page);
      setPage(page - 1);
    }
  };

  return (
    <View flex={1} variant="background" px="3">
      <SafeTop />
      <Heading ml={8} fontSize={"4xl"}>
        {page == 0 ? "Profile" : page == 1 ? "Select Friends" : "Confirm"}
      </Heading>
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
        <ContactSelectorList
          selectedContactsId={selectedContactsId}
          setSelectedContactsId={setSelectedContactsId}
        />
      ) : page == 2 ? (
        <LoadFriends
          friendsIds={selectedContactsId}
          friends={friends}
          setFriends={setFriends}
        />
      ) : page == 3 ? (
        <Text>bt</Text>
      ) : (
        <Text>asda</Text>
      )}
      <Button
        onPress={onNext}
        _disabled={{
          bg: "gray.400",
        }}
        isDisabled={
          page == 2 &&
          friends.filter((f) => {
            console.log(
              f.avatar?.length,
              f.contact.name,
              !f.contact.image?.uri
            );
            return f.avatar == null && !f.contact.image?.uri;
          }).length > 0
        }
      >
        {page == 2 ? "Finish" : "Next"}
      </Button>
      <SafeBottom />
    </View>
  );
}
