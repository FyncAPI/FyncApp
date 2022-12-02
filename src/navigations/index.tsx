import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import {
  AuthStackParamList,
  NavigationParamList,
  RootStackParamList,
} from "../../types";
import { UserContext } from "../contexts/user/context";
import { AddFriendScreen } from "../features/Add/screens/AddFriendScreen";
import { AddFromContacts } from "../features/Add/screens/AddFromContacts";
import { AddNewFriendScreen } from "../features/Add/screens/AddNewFriendScreen";
import FormScreen from "../features/auth/screens/form/AuthFormScreen";
import { LandingScreen } from "../features/auth/screens/landing/LandingScreen";
import { FriendScreen } from "../features/friend/screens/FriendScreen";
import HomeScreen from "../features/home/screens/HomeScreen";
import UserScreen from "../features/user/screens/UserScreen";
import { useUserContext } from "../hooks";

const Stack = createNativeStackNavigator<NavigationParamList>();

export function Navigation() {
  const { isRegistered, userData } = useContext(UserContext);
  console.log(isRegistered, userData, ";lkj");
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isRegistered && userData ? (
        <Stack.Screen name="RootStack" component={RootStackNavigator} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
      )}

      {/* <Stack.Screen name="User" component={UserScreen} /> */}
    </Stack.Navigator>
  );
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  console.log("audstl");
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Form" component={FormScreen} />
      <AuthStack.Screen name="Landing" component={LandingScreen} />
    </AuthStack.Navigator>
  );
}
const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="User" component={UserScreen} />
      <RootStack.Screen name="Friend" component={FriendScreen} />
      <RootStack.Screen name="AddFriend" component={AddFriendScreen} />
      <RootStack.Screen name="AddFromContacts" component={AddFromContacts} />
      <RootStack.Screen name="AddNewFriend" component={AddNewFriendScreen} />
    </RootStack.Navigator>
  );
}
// const Tab = createBottomTabNavigator();

// function RootTab() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="User" component={UserScreen} />
//     </Tab.Navigator>
//   );
// }
