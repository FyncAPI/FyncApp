import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";

export const useContact = () => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        //console.log(status, "status");
        if (status === "granted") {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Image, Contacts.Fields.PhoneNumbers],
          });
          if (data.length > 0) {
            setContacts(data);
          }
        } else {
          //console.log("Permission denied");
        }
      } catch (err) {
        //console.log("cant get ctcs", err);
      }
    })();
  }, []);

  return contacts;
};
