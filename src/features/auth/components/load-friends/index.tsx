import { Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { Friend } from "../../../../contexts/user-context";
import * as Contacts from "expo-contacts";

export default function LoadFriends({
  friendsIds,
  friends,
  setFriends,
}: {
  friendsIds: string[];
  friends: Friend[];
  setFriends: (friends: Friend[]) => void;
}) {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [error, setError] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        console.log(status, "tus");
        if (status === "granted") {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Image, Contacts.Fields.PhoneNumbers],
          });
          if (data.length > 0) {
            setContacts(data);
          }
        } else {
          console.log("Permission denied");
          setError({ ...error, contacts: "Permission denied" });
        }
      } catch (err) {
        setError({ ...error, contacts: err });
      }
    })();
  }, []);

  useEffect(() => {
    const friends: Friend[] = contacts
      .filter((contact) => {
        return friendsIds.includes(contact.id);
      })
      .map((contact) => {
        return {
          ...contact,
          friendship: {
            level: 1,
            points: 0,
          },
          memories: [],
          recents: [],
        };
      });
    setFriends(friends);
  }, [friendsIds]);

  return (
    <View>
      <Text>LoadFriends..</Text>
      <Text>{JSON.stringify(friends)}</Text>
    </View>
  );
}
