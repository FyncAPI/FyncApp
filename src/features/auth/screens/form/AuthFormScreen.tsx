import React, { useContext, useEffect } from "react";
import { Button, Heading, Icon, ScrollView, Text, View } from "native-base";
import ContactSelectorList from "../../components/ContactSelectorList";
import { SafeBottom, SafeTop } from "../../../../components/SafeTop";
import { UserContext } from "../../../../contexts/user/userContext";
import ProfileForm from "../../components/profile-form/ProfileForm";
import { Contact, getContactByIdAsync, getContactsAsync } from "expo-contacts";
import GetGps from "../../components/get-gps";
import LoadFriends from "../../components/load-friends/LoadFriend";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Friend, FriendsData, UserData } from "../../../../contexts/user/types";
import { AuthStackNavigationProp } from "../../../../../types";
import BackButton from "../../../../components/BackButton";
import { LoadingModal } from "../../../../components/LoadingModal";
import {
  convertIdsToContacts,
  generateAvatar,
} from "../../../../contexts/friend/FriendService";
import { useLoading } from "../../../../hooks/useLoading";
import { FriendContext } from "../../../../contexts/friend/FriendContext";

export default function AuthFormScreen() {
  const [page, setPage] = React.useState(1);
  const [selectedContactsId, setSelectedContactsId] = React.useState<string[]>(
    []
  );
  const [userData, setUserData] = React.useState<UserData>({} as UserData);
  // const [friendsData, setFriendsData] = React.useState<FriendsData>(
  //   {} as FriendsData
  // );
  // const [friends, setFriends] = React.useState<Friend[]>([]);
  const [error, setError] = React.useState({});
  // const {stopLoading, startLoading, loading} = useLoading()
  const [loading, setLoading] = React.useState(false);

  const { saveUserData, contacts } = useContext(UserContext);
  const { saveFriendsData } = useContext(FriendContext);

  const navigation = useNavigation<AuthStackNavigationProp<"Form">>();

  const updateData =
    (key: keyof UserData) => (data: UserData[keyof UserData]) => {
      setUserData({
        ...userData!,
        [key]: data,
      });
    };

  const onNext = async () => {
    //console.log(Object.entries(error).length);
    if (page == 1 && Object.entries(error).length == 0) {
      console.log(selectedContactsId, "friends", userData, "userData");

      setLoading(true);
      // load all friends data to friends

      const loadedFriends: Friend[] = await convertIdsToContacts(
        selectedContactsId,
        contacts
      );

      if (loadedFriends) {
        console.log(
          loadedFriends.map((f) => f.avatar?.length),
          "loaded friends"
        );
        saveFriendsData({ friends: loadedFriends });
        saveUserData({
          ...userData,
          recents: [],
          suggestions: [],
          socialMode: false,
        });
      }
      // stopLoading()
      setLoading(false);
      // setLoading(false);
    } else {
      if (Object.entries(error).length) return;
      setPage(page + 1);
    }
  };

  const onBack = () => {
    //console.log(page, "back");
    if (page <= 1) {
      navigation.navigate("Landing");
    } else {
      //console.log(page);
      setPage(page - 1);
    }
  };

  return (
    <>
      <LoadingModal loading={loading} text="loading contacts" />
      <View flex={1} variant="background" px="3">
        <SafeTop />
        <Heading ml={8} fontSize={"4xl"}>
          {page == 0 ? "Profile" : page == 1 ? "Add Friends" : "Confirm"}
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
          // <LoadFriends
          //   friendsIds={selectedContactsId}
          //   friends={friends}
          //   setFriends={setFriends}
          // />
          <></>
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
          mb="2"
          variant={"rounded"}
        >
          {page == 1 ? "Finish" : "Next"}
        </Button>
        <SafeBottom />
      </View>
    </>
  );
}
