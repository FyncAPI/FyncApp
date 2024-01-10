import React, { useEffect, useState } from "react";
import { useStorageState } from "../hooks/useStorageState";
import { User } from "constants/type";
import { Linking } from "react-native";
import endpoints from "constants/endpoints";
import * as WebBrowser from "expo-web-browser";
import { storage } from "utils/storage";
import { useSession } from "./auth.context";
import { getUserFromFync } from "utils/fync";

const UserContext = React.createContext<{
  user: User;
}>({
  user: {},
});

// This hook can be used to access the user info.
export function useUser() {
  const value = React.useContext(UserContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function UserProvider(props: React.PropsWithChildren) {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>();
  const [loaded, setLoaded] = useState(false);
  const { session } = useSession();

  useEffect(() => {
    (async () => {
      const jsonUser = storage.getString("user");
      if (!jsonUser || jsonUser === "undefined" || jsonUser === "{}") {
        const user = await getUserFromFync(session);
        if (!user) {
          setError("User not found");
          return;
        }
        setUser(user);
        storage.set("user", JSON.stringify(user));
        return;
      }
      const userObject = JSON.parse(jsonUser);
      console.log(userObject);
      setUser(userObject);
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
