import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import {
  AuthStackParamList,
  NavigationParamList,
  RootStackParamList,
  RootTabParamList,
} from "../../types";
import { FriendContextProvider } from "../contexts/FriendContext";
import { UserContext } from "../contexts/user/context";
import { AddFriendScreen } from "../features/Add/screens/AddFriendScreen";
import { AddFromContacts } from "../features/Add/screens/AddFromContacts";
import { AddNewFriendScreen } from "../features/Add/screens/AddNewFriendScreen";
import AuthFormScreen from "../features/auth/screens/form/AuthFormScreen";
import { LandingScreen } from "../features/auth/screens/landing/LandingScreen";
import { EditFriendScreen } from "../features/friend/screens/EditFriendScreen";
import { FriendScreen } from "../features/friend/screens/FriendScreen";
import HomeScreen from "../features/home/screens/HomeScreen";
import UserScreen from "../features/user/screens/UserScreen";
import { useUserContext } from "../hooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, useColorModeValue } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Svg, { Path, SvgFromUri, SvgUri } from "react-native-svg";
import { RemixIcons } from "../../assets/Icons/RemixIcons";
const Stack = createNativeStackNavigator<NavigationParamList>();

export function Navigation() {
  const { isRegistered, userData } = useContext(UserContext);
  console.log(isRegistered, ";lkj");
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isRegistered ? (
        <Stack.Screen name="RootStack" component={RootTabNavigator} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
      )}

      {/* <Stack.Screen name="User" component={UserScreen} /> */}
    </Stack.Navigator>
  );
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  // //console.log("audstl");
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Landing" component={LandingScreen} />
      <AuthStack.Screen name="Form" component={AuthFormScreen} />
    </AuthStack.Navigator>
  );
}

const RootTab = createBottomTabNavigator<RootTabParamList>();

function RootTabNavigator() {
  const insets = useSafeAreaInsets();
  const bg = useColorModeValue("red.50", "coolGray.900");
  return (
    <RootTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarBadgeStyle: {},
        // tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          position: "absolute",
          marginBottom: 10 + insets.bottom,
          marginHorizontal: 20,
          borderRadius: 30,
          borderWidth: 0,
          backgroundColor: bg,
          //     ? Colors.dark.business.bottomBar
          //     : Colors.light.business.bottomBar,
          paddingBottom: 0,

          // ...shadow.shadowIn,
          borderTopWidth: 0,
          borderTopColor: "transparent",
        },

        headerShown: false,
        tabBarActiveTintColor: "#7b93ec",
      }}
    >
      <RootTab.Screen
        name="Home"
        component={RootStackNavigator}
        options={{
          tabBarIcon: ({
            focused,
            color,
            size,
          }: {
            focused: boolean;
            color: string;
            size: number;
          }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={35}
            />
          ),
        }}
      />
      <RootTab.Screen
        name="App"
        component={UserScreen}
        options={{
          tabBarIcon: ({
            focused,
            color,
            size,
          }: {
            focused: boolean;
            color: string;
            size: number;
          }) =>
            focused ? (
              <RemixIcons color={color} size={35} name={"apps"} />
            ) : (
              <RemixIcons color={color} size={35} name={"apps-outline"} />
            ),
        }}
      />
      <RootTab.Screen name="Explore" component={FriendScreen} />
    </RootTab.Navigator>
  );
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  return (
    <FriendContextProvider>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="User" component={UserScreen} />
        <RootStack.Screen name="Friend" component={FriendScreen} />

        <RootStack.Screen name="AddFriend" component={AddFromContacts} />
        <RootStack.Screen name="AddFromContacts" component={AddFromContacts} />
        <RootStack.Screen name="AddNewFriend" component={AddNewFriendScreen} />
        <RootStack.Screen name="EditFriend" component={EditFriendScreen} />
      </RootStack.Navigator>
    </FriendContextProvider>
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
