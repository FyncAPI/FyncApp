import { View, Text } from "react-native";
import React, { createContext, useState } from "react";

interface Memory {
  id: string;
  images: string[];
  videos: string[];
  inviter: string;
  invitee: string;
  date: Date;
  location: string;
  description: string;
}

interface CallHistory {
  id: string;
  duration: number;
  date: Date;
  callerId: string;
  calleeId: string;
}

interface User {
  id: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  email: string;
  birthdate: Date;
  profileImage: string;
}

interface Friend extends User {
  lastCalled: Date;
  memories: Memory[];
  recents: CallHistory[];
  friendship: {
    level: number;
    points: number;
  };
}

interface Self extends User {
  friends: Friend[];
  memories: Memory[];
  recents: CallHistory[];
}

interface UserContextInterface {
  user: Self;
  registered: boolean;
}

export const UserContext = createContext<UserContextInterface>(
  {} as UserContextInterface
);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Self>({} as Self);
  const [registered, setRegistered] = useState<boolean>(false);
  return (
    <UserContext.Provider value={{ user, registered }}>
      {children}
    </UserContext.Provider>
  );
}
