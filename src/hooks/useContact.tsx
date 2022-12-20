import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";

export const useContact = () => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);

  // print something when contacts change

  useEffect(() => {
    console.log("contacts changed");
  }, [contacts]);

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    console.log("getContacts");
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      //console.log(status, "status");
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Image, Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          setContacts(data);
          return data;
        }
      } else {
        console.log("Permission denied");
        return null;
      }
    } catch (err) {
      console.log("cant get ctcs", err);

      return null;
    }
  };

  return { contacts, getContacts };
};
