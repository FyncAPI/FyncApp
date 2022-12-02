import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "native-base";
import React, { useContext } from "react";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import FriendCard from "../../../../components/FriendCard";
import { SafeBottom, SafeTop } from "../../../../components/SafeTop";
import { RootStackNavigationProp } from "../../../../types";
import BackButton from "../../../components/BackButton";
import { UserContext } from "../../../contexts/user/context";
import { UserData } from "../../../contexts/user/types";
import LoadFriends from "../../auth/components/load-friends/LoadFriend";
import SelectContacts from "../../auth/components/select-contacts/SelectContact";

export const AddFromContacts = gestureHandlerRootHOC(() => {
  const [page, setPage] = React.useState(0);
  const { saveUserData, userData } = useContext(UserContext);
  const [selectedContactsId, setSelectedContactsId] = React.useState<string[]>(
    userData.friends.map((friend) => friend.id)
  );
  const [newData, setNewData] = React.useState<UserData>(userData as UserData);
  const navigation =
    useNavigation<RootStackNavigationProp<"AddFromContacts">>();

  const updateData =
    (key: keyof UserData) => (data: UserData[keyof UserData]) => {
      setNewData({
        ...newData!,
        [key]: data,
      });
    };

  const onNext = () => {
    if (page == 1) {
      saveUserData(newData);
      navigation.navigate("Home");
    } else {
      setPage(page + 1);
    }
  };

  const ref = React.useRef<ICarouselInstance>(null);
  return (
    <View flex={1} variant="background" p="3">
      <SafeTop />
      <View mb={8} />
      <BackButton />
      {page == 0 ? (
        <SelectContacts
          selectedContactsId={selectedContactsId}
          setSelectedContactsId={setSelectedContactsId}
        />
      ) : page == 1 ? (
        <LoadFriends
          friendsIds={selectedContactsId}
          friends={newData?.friends}
          setFriends={updateData("friends")}
        />
      ) : null}

      <Button mt={"auto"} onPress={onNext}>
        {page == 0 ? "Next" : page == 1 ? "Finish" : null}
      </Button>
      <SafeBottom />
    </View>
  );
});
