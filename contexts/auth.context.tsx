import React from "react";
import { useStorageState } from "../hooks/useStorageState";
import { Linking } from "react-native";
import endpoints from "constants/endpoints";
import * as WebBrowser from "expo-web-browser";

const AuthContext = React.createContext<{
  signIn: () => Promise<void | string>;
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

function exchangeCodeForToken(authorizationCode) {
  console.log(process.env.EXPO_PUBLIC_FYNC_CLIENT_ID);
  const tokenRequestBody = new FormData();
  tokenRequestBody.append("grant_type", "authorization_code");
  tokenRequestBody.append("code", authorizationCode);
  tokenRequestBody.append("client_id", process.env.EXPO_PUBLIC_FYNC_CLIENT_ID);
  tokenRequestBody.append(
    "client_secret",
    process.env.EXPO_PUBLIC_FYNC_CLIENT_SECRET
  );

  return fetch(endpoints.fync.auth.token.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: tokenRequestBody,
  })
    .then((response) => response.json())
    .then((tokenData) => {
      console.log(tokenData);
      // Handle the obtained access token (tokenData.access_token)
      console.log("Access Token:", tokenData.access_token);
      return tokenData.access_token;
    })
    .catch((error) => console.error("Error during token exchange:", error));
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async () => {
          const authUrl = process.env.EXPO_PUBLIC_FYNC_AUTH_URL;
          const res = await WebBrowser.openAuthSessionAsync(authUrl);
          // Perform sign-in logic here
          console.log(res);

          if (res.type !== "success") {
            return;
          }
          const code = res.url.split("?code=")[1];

          // get access token
          try {
            const accessToken = await exchangeCodeForToken(code);
            console.log(accessToken);
            if (accessToken) {
              setSession(accessToken);
            } else {
              console.log("no access token");
            }
          } catch (e) {
            console.log(e);
          }
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
