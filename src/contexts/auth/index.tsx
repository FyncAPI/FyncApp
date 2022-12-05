import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import { AuthUser } from "../../constants/UserInterfaces";
import { Alert } from "react-native";
// import { auth } from "../../../firebase";

interface AuthUser {
  id: string;
  contacts: Contact[];
  friends: Friend[];
  name: string;
}
interface AuthContextInterface {
  authUser: AuthUser | null;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;

  role: "business" | "candidate" | "";
  setRole: React.Dispatch<React.SetStateAction<"business" | "candidate" | "">>;

  loading: boolean;

  onLogout: () => void;
  onDeleteAccount: () => void;

  error: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState<AuthUser | null>({} as AuthUser);
  const [provider, setProvider] = useState<any>(null);
  const [role, setRole] = useState<"business" | "candidate" | "">("");
  // const [accessToken, setAccessToken] = useState<String>();
  useEffect(() => {
    getUserFromStorage();
  }, []);

  //   const [googleRequest, googleResponse, googlePromptAsync] =
  //     Google.useAuthRequest({
  //       expoClientId:
  //         "1084997883013-bh58a14pa9r3hapm4blap8qgmrrmf34q.apps.googleusercontent.com",
  //       webClientId:
  //         "878339445374-f3tnr7vcmv2h320njd5c5j8vgt5sg02v.apps.googleusercontent.com",
  //       iosClientId:
  //         "1084997883013-v5o0mhnfqrs05dbpo2o5nov6si4rjr3m.apps.googleusercontent.com",
  //       androidClientId:
  //         "1084997883013-a0elom68002flf1d9u88f36lkkhkpgnt.apps.googleusercontent.com",
  //     });

  useEffect(() => {
    // //console.log("user Changed", authUser, !!authUser, role);
    if (authUser?._id) {
      storeData(authUser);
    }
  }, [authUser]);

  const getUserFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("@user");
      if (value !== null) {
        //console.log("storage data", value);
        const user = JSON.parse(value);
        setAuthUser(user);
        setRole(user.role);
      } else {
        //console.log("no user");
      }
    } catch (e) {
      //console.log("error reading value", e);
    }
  };

  const storeData = async (userInfo: AuthUser) => {
    try {
      await AsyncStorage.setItem("@user", JSON.stringify(userInfo));
    } catch (error) {
      //console.log("ere storing", error);
    }
  };

  async function appleCandidateAuth(token: string) {
    const res = await appleAuthServer(token, "candidate");
    if (res) {
      //console.log("apple data", res);
      if (res.iss) {
        setAuthUser({
          provider: "apple",
          email: res.email,
          role: "candidate",
        });
      } else {
        setAuthUser({
          ...res,
          provider: "apple",
          email: res.email,
          role: "candidate",
        });
      }
      return res;
    } else {
      //console.log("no apple data");
    }
  }

  async function appleBusinessAuth(token: string) {
    const res = await appleAuthServer(token, "business");
    if (res) {
      //console.log("apple data", res);
      if (!res.iss)
        setAuthUser({ ...res, provider: "apple", role: "business" });
      else
        setAuthUser({
          ...res,
          provider: "apple",
          email: res.email,
          role: "business",
        });

      return res;
    } else {
      //console.log("no apple data");
    }
  }
  // these should run once
  async function getGoogleUserData(accessToken: string) {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    let _userInfo = await userInfoResponse.json();
    // TODO use token and check in server
    _userInfo = {
      name: _userInfo.name,
      email: _userInfo.email,
      picture: _userInfo.picture,
      googleId: _userInfo.id,
      provider: "google",
    };

    //console.log("_userInfo from google", _userInfo.email);
    // setUserInfo(_userInfo);

    const dbUser = await findUser(_userInfo, role);

    //console.log("user in db is", dbUser.email, dbUser._id);
    //found user
    if (dbUser._id && dbUser.email) {
      // //console.log("got user from db", res);
      const updatedUser: AuthUser = {
        _id: dbUser._id,
        __v: dbUser.__v,
        email: dbUser.email,
        googleId: dbUser.googleId,
        profileImage: dbUser.profileImage,
        role,
        provider: "google",
      };
      setAuthUser(updatedUser);
      storeData(updatedUser);
      return dbUser;
    } else {
      // if not found

      //create user
      if (dbUser.message == "candidate not found" && role == "candidate") {
        // TODO Fix candidate form
        // set google things and create user
        setAuthUser(_userInfo);
      } else if (dbUser.message == "business not found" && role == "business") {
        // save google things and go to form
        setAuthUser(_userInfo);
      } else {
        setError(dbUser.error);
      }
    }
  }

  // async function getFacebookUserData(accessToken: string) {
  //   try {
  //     let userInfoResponse = await fetch(
  //       "https://graph.facebook.com/v13.0/me?fields=email,name,picture{url}&access_token=" +
  //         accessToken,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     const userData = await userInfoResponse.json();
  //     // // //console.log("fb", userData);
  //     if (userData) {
  //       const _userInfo = {
  //         ...userData,
  //         picture: userData.picture.data.url,
  //         facebookId: userData.id,
  //         provider: "facebook",
  //         createdAt: new Date().toISOString(),
  //       };

  //       const res = await findOrCreateUser(_userInfo, role);
  //       // //console.log("RESULT FROM CREATE", res);
  //       setUserInfo(res);
  //       storeData(res);
  //     }
  //   } catch (e) {
  //     // //console.log("error", e);
  //   }
  // }

  const onLogout = async () => {
    await AsyncStorage.removeItem("@user");
    // setAccessToken(undefined);
    setAuthUser(null);
  };

  const onDeleteAccount = async () => {
    const deleteUser = async () => {
      if (role == "candidate") {
        deleteCandidate(authUser?._id!)
          .then((res) => {
            //console.log("deleted candidate", res);
            onLogout();
          })
          .catch((err) => {
            //console.log("error deleting candidate", err);
            Alert.alert("Error", err.message);
          });
      } else if (role == "business") {
        deleteBusiness(authUser?._id!)
          .then((res) => {
            //console.log("deleted business", res);
            onLogout();
          })
          .catch((err) => {
            //console.log("error deleting business", err);
            Alert.alert("Error", err.message);
          });
      }
      setAuthUser(null);
    };
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Yes", onPress: deleteUser, style: "destructive" },
      ],
      { cancelable: false }
    );
    // await AsyncStorage.removeItem("@user");
    // if (role == "candidate") {
    //   const res = await deleteCandidate(authUser?._id!);
    // } else if (role == "business") {
    //   const res = await deleteBusiness(authUser?._id!);
    // }
    // // setAuthUser(null);

    // //console.log(role, "erl");
  };

  // Get the user's access token from response after login & store in async storage

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,

        role,
        setRole,

        onLogout,
        onDeleteAccount,

        loading,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
