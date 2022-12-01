import { Button, Text, View } from "native-base";
import React, { useContext } from "react";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import FriendCard from "../../../../components/FriendCard";
import { SafeBottom, SafeTop } from "../../../../components/SafeTop";
import BackButton from "../../../components/BackButton";
import { UserContext } from "../../../contexts/user/context";
import { UserData } from "../../../contexts/user/types";
import LoadFriends from "../../auth/components/load-friends";
import SelectContacts from "../../auth/components/select-contacts";

export const AddFromContacts = gestureHandlerRootHOC(() => {
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

  const onNext = () => {
    if (page == 2) {
      saveUserData(userData);
    } else {
      setPage(page + 1);
    }
  };

  const baseOptions = {
    vertical: false,
    width: 400,
    height: 400 / 2,
  } as const;
  const ref = React.useRef<ICarouselInstance>(null);
  return (
    <View flex={1} variant="background" p="3">
      <SafeTop />
      <View mb={8} />
      <BackButton />
      {/* {page == 0 ? (
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
      ) : null} */}
      <Carousel
        {...baseOptions}
        loop
        ref={ref}
        style={{ width: "100%" }}
        data={[1, 2, 3, 4]}
        pagingEnabled={true}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) => (
          <FriendCard
            friend={{
              name: "John Doe",
              memories: [],
              recents: [],
              friendship: {
                level: 0,
                points: 0,
              },
              phoneNumbers: [
                {
                  number: "123456789",
                  id: "123",
                  label: "home",
                },
              ],
            }}
            listLength={2}
          />
        )}
      />
      <Button onPress={onNext}>Continue</Button>
      <SafeBottom />
    </View>
  );
});
