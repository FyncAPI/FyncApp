import axios from "axios";
import { Contact } from "expo-contacts";
import { Friend } from "../user/user.types";

export const generateAvatar = async (name: string, random?: boolean) => {
  console.log(
    `https://api.multiavatar.com/${name}?apikey=${process.env.MULTI_AVATAR_API_KEY}`
  );
  try {
    const res = await axios.get(
      `https://api.multiavatar.com/${name}?apikey=${process.env.MULTI_AVATAR_API_KEY}`,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
    return res.data.split("</svg>")[0] + "</svg>";
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const convertIdsToContacts = async (
  ids: string[],
  contacts: Contact[]
) => {
  const friends: Friend[] = contacts
    .filter((contact) => {
      return ids.includes(contact.id);
    })
    .map((contact) => {
      let friend: Friend = {
        // contact: { ...contact, phoneNumbers },
        contact,
        friendship: {
          level: 1,
          points: 0,
        },
        memories: [],
        calls: [],
        // phoneNumbers,
        contactId: contact.id,
      };

      // if (!contact.image?.uri) {
      //   // generate avatar
      //   generateAvatar(contact.name).then((avatar) => {
      //     if (!avatar) throw new Error("Avatar not generated");
      //     friend.avatar = avatar;
      //   });
      // }

      return friend;
    });

  // get avatar for all friends

  const promises = friends.map(async (friend) => {
    if (!friend.contact.image?.uri) {
      // generate avatar
      const avatar = await generateAvatar(friend.contact.name);
      if (!avatar) throw new Error("Avatar not generated");
      friend.avatar = avatar;
    }

    return friend;
  });

  const resolvedFriends = await Promise.all(promises);

  console.log(
    resolvedFriends.map((f) => f.avatar?.length),
    "resolved friends"
  );

  return resolvedFriends;
};
