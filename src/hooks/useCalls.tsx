import { Contact } from "expo-contacts";
import { useEffect, useRef, useState } from "react";
import { CallHistory, Friend } from "../contexts/user/user.types";
import { AppState } from "react-native";
import { storage } from "../../App";

export const useCalls = (increaseFriendship: any, saveFriendsData: any) => {
  const [recentCalls, setRecentCalls] = useState<CallHistory[]>([]);
  const [finishedCall, setFinishedCall] = useState(false);

  const [isCalling, setIsCalling] = useState<Friend["contactId"]>("");

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    let arr: string[] = [];
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/background/) &&
        arr.length > 3 &&
        arr[arr.length - 3] === "active" &&
        arr[arr.length - 2] === "inactive" &&
        // appStateArr[appStateArr.length - 3] === "active" &&
        // appStateArr[appStateArr.length - 2] === "inactive" &&
        // appStateArr[appStateArr.length - 1] === "background" &&
        nextAppState === "active"
      ) {
        console.log("finished calling mannn", arr);
        setFinishedCall(true);
        // increaseFriendship(isCalling);
        // setIsCalling("");
        arr = [];
      }

      appState.current = nextAppState;
      arr.push(nextAppState);
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (finishedCall && isCalling) {
      setRecentCalls((prev) => [
        {
          contactId: isCalling,
          date: new Date(),
        },
        ...prev,
      ]);
      increaseFriendship(isCalling);
      setIsCalling("");
      setFinishedCall(false);

      saveFriendsData({
        recentCalls: [
          {
            contactId: isCalling,
            date: new Date(),
          },
        ],
      });
    }
  }, [finishedCall]);

  useEffect(() => {
    console.log("useFriends mounted or contacts changed");
    getCallsData();
  }, []);

  const getCallsData = async () => {
    try {
      const friendsData = storage.getString("@friendsData");
      // console.log(friendsData, "friendsData");
      if (friendsData) {
        const parsedFriendsData = JSON.parse(friendsData);

        if (parsedFriendsData.recentCalls) {
          setRecentCalls(parsedFriendsData.recentCalls);
        }
      }
    } catch (error) {
      console.log("cant get friends Data", error);
    }
  };

  //   const updateFriendsAfterContactChange = (contact: Contact) => {
  //     const newFriends = friends.map((friend) => {
  //       if (friend.contactId === contact.id) {
  //         return {
  //           ...friend,
  //           contact: contact,
  //         };
  //       }
  //       return friend;
  //     });
  //     setRecentCalls(newFriends);
  //   };

  return { recentCalls, setIsCalling };
};
