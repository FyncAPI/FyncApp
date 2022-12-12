import { useNavigation } from "@react-navigation/native";
import { Button, Heading, Text, View } from "native-base";
import React, { useContext } from "react";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import FriendCard from "../../../components/FriendCard";
import { SafeBottom, SafeTop } from "../../../components/SafeTop";
import { RootStackNavigationProp } from "../../../../types";
import BackButton from "../../../components/BackButton";
import { FriendContext } from "../../../contexts/FriendContext";
import { UserContext } from "../../../contexts/user/context";
import { Friend, FriendsData, UserData } from "../../../contexts/user/types";
import LoadFriends from "../../auth/components/load-friends/LoadFriend";
import ContactSelectorList from "../../auth/components/ContactSelectorList";
import { convertIdsToContacts } from "../../../contexts/FriendService";
import { LoadingModal } from "../../../components/LoadingModal";

export const AddFromContacts = gestureHandlerRootHOC(() => {
  const [page, setPage] = React.useState(0);
  const { contacts } = useContext(UserContext);
  const { friends, addFriends } = useContext(FriendContext);
  const [selectedContactsId, setSelectedContactsId] = React.useState<string[]>(
    // friends.map((friend) => friend.contactId)
    []
  );
  const [loading, setLoading] = React.useState(false);

  const [newFriends, setNewFriends] =
    React.useState<FriendsData["friends"]>(friends);

  const navigation =
    useNavigation<RootStackNavigationProp<"AddFromContacts">>();

  const onNext = async () => {
    if (page == 0) {
      console.log("newFriends", newFriends);
      setLoading(true);
      const loadedFriends: Friend[] = await convertIdsToContacts(
        selectedContactsId,
        contacts
      );

      if (loadedFriends) {
        console.log(
          loadedFriends.map((f) => f.avatar?.length),
          "loaded friends"
        );

        addFriends(loadedFriends);
      }
      setLoading(false);
      navigation.navigate("Home");
    } else {
      setPage(page + 1);
    }
  };

  return (
    <>
      <LoadingModal loading={loading} text="loading contacts" />
      <View flex={1} variant="background" p="3">
        <SafeTop />
        <BackButton />
        <Heading ml={10} fontSize="4xl">
          Add Friend
        </Heading>
        {page == 0 ? (
          <ContactSelectorList
            selectedContactsId={selectedContactsId}
            setSelectedContactsId={setSelectedContactsId}
            friendsIds={friends.map((friend) => friend.contactId)}
          />
        ) : page == 1 ? (
          <LoadFriends
            friendsIds={selectedContactsId}
            friends={newFriends}
            setFriends={setNewFriends}
          />
        ) : null}

        <Button
          mt={"auto"}
          onPress={onNext}
          _disabled={{
            bg: "gray.400",
          }}
          isDisabled={
            page == 1 &&
            newFriends.filter((f) => {
              console.log(
                f.avatar?.length,
                f.contact.name,
                f.contact.image?.uri,
                "xcv"
              );
              return f.avatar == null && !f.contact.image?.uri;
            }).length > 0
          }
        >
          {page == 0 ? "Save" : page == 1 ? "Finish" : null}
        </Button>
        <SafeBottom />
      </View>
    </>
  );
});
