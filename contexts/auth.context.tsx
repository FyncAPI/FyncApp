import React from "react";
import { useStorageState } from "../hooks/useStorageState";
import { Linking } from "react-native";
import endpoints from "constants/endpoints";
import * as WebBrowser from "expo-web-browser";

const AuthContext = React.createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async () => {
          Linking.addEventListener("url", (event) => {
            console.log(event.url);
          });

          const res = await WebBrowser.openBrowserAsync(
            endpoints.fync.auth.register.url
          );
          // Perform sign-in logic here
          console.log(res);
          setSession("xxx");
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
