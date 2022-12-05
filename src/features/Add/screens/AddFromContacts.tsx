import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "native-base";
import React, { useContext } from "react";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import FriendCard from "../../../../components/FriendCard";
import { SafeBottom, SafeTop } from "../../../../components/SafeTop";
import { RootStackNavigationProp } from "../../../../types";
import BackButton from "../../../components/BackButton";
import { FriendContext } from "../../../contexts/FriendContext";
import { UserContext } from "../../../contexts/user/context";
import { FriendsData, UserData } from "../../../contexts/user/types";
import LoadFriends from "../../auth/components/load-friends/LoadFriend";
import SelectContacts from "../../auth/components/select-contacts/SelectContact";

export const AddFromContacts = gestureHandlerRootHOC(() => {
  const [page, setPage] = React.useState(0);
  const { friends, updateFriends } = useContext(FriendContext);
  const [selectedContactsId, setSelectedContactsId] = React.useState<string[]>(
    friends.map((friend) => friend.id)
  );

  const [newFriends, setNewFriends] =
    React.useState<FriendsData["friends"]>(friends);

  const navigation =
    useNavigation<RootStackNavigationProp<"AddFromContacts">>();

  const onNext = () => {
    if (page == 1) {
      updateFriends(newFriends);
      navigation.navigate("Home");
    } else {
      setPage(page + 1);
    }
  };

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
          friends={newFriends}
          setFriends={setNewFriends}
        />
      ) : null}

      <Button mt={"auto"} onPress={onNext}>
        {page == 0 ? "Next" : page == 1 ? "Finish" : null}
      </Button>
      <SafeBottom />
    </View>
  );
});
