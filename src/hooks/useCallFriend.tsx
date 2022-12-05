// import { PhoneNumber } from "expo-contacts";
// import React, { useEffect, useState } from "react";
// import { AppState, Linking } from "react-native";

// export const useCallFriend = (phoneNumbers: PhoneNumber[] | undefined) => {
//   const [isCalling, setIsCalling] = useState(false);
//   const [appStateArr, setAppStateArr] = useState([AppState.currentState]);
//   const [isCallEnded, setIsCallEnded] = useState(false);

//   const appState = React.useRef(AppState.currentState);

//   useEffect(() => {
//     const subscription = AppState.addEventListener("change", (nextAppState) => {
//       if (
//         appState.current.match(/inactive|background/) &&
//         nextAppState === "active"
//       ) {
//         //console.log("App has come to the foreground!");
//       }

//       appState.current = nextAppState;
//       setAppStateArr((prev) => [...prev, appState.current]);
//       //console.log("AppState", appState.current);
//     });

//     return () => {
//       subscription.remove();
//     };
//   }, []);

//   // if appstate change from active to inactive to background, the call is started
//   useEffect(() => {
//     if (isCalling) {
//       // if the appstate changes from background to active, the call is ended
//       if (appStateArr[appStateArr.length - 1] === "active") {
//         setIsCalling(false);
//         setIsCallEnded(true);
//       }
//     }
//     if (appStateArr.length > 2) {
//       if (
//         appStateArr[appStateArr.length - 3] === "active" &&
//         appStateArr[appStateArr.length - 2] === "inactive" &&
//         appStateArr[appStateArr.length - 1] === "background"
//       ) {
//         setIsCalling(true);
//       }
//     }
//   }, [appStateArr]);

//   const callFriend = async () => {
//     try {
//       const res = await Linking.openURL(
//         "tel://" +
//           (phoneNumbers?.find((x) => x.isPrimary)?.number ||
//             phoneNumbers?.[0]?.number)
//       );
//       //console.log(res, "call res", appStateArr);
//     } catch (e) {
//       //console.log("cannot call", e);
//     }
//   };

//   return { callFriend, isCalling };
// };
