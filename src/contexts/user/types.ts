import { Contact } from "expo-contacts";

export interface Memory {
  id: string;
  images: string[];
  videos: string[];
  inviter: string;
  invitee: string;
  date: Date;
  location: string;
  description: string;
}

export interface CallHistory {
  _id: string;
  duration: number;
  date: Date;
  callerId: string;
  calleeId: string;
}

// export interface User {
//   id: string;
//   name: string;
//   nickname: string;
//   phoneNumber: string;
//   email: string;
//   birthdate: Date;
//   profileImage: string;
// }

export interface User extends Contact {
  // _id: string;
}

export interface Friend extends User {
  memories?: Memory[];
  calls?: CallHistory[];
  friendship: {
    level: number;
    points: number;
  };
}

export interface UserData {
  friends: Friend[];
  memories: Memory[];
  recents: CallHistory[];
  favorites: Friend[];
  suggestions: Friend[];
  profile: User;
}
