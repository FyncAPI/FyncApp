import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import {
  AppStackParamList,
  AuthStackParamList,
  ExploreStackParamList,
  NavigationParamList,
  HomeStackParamList,
  RootTabParamList,
  RootStackParamList,
  UserStackParamList,
} from "../../types";
import { FriendContextProvider } from "../contexts/friend/FriendContext";
import { UserContext } from "../contexts/user/userContext";
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
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { AppListScreen } from "../features/Apps/screens/AppListScreen";
import { AppScreen } from "../features/Apps/screens/AppScreen";
import { ExploreScreen } from "../features/Explore/ExploreScreen";
import { EnableOnlineScreen } from "../features/Apps/screens/EnableOnlineScreen";
import { SettingsContext } from "../contexts/settings/SettingsContext";
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

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="Root" component={RootTabNavigator} />
      <RootStack.Screen name="Friend" component={FriendScreen} />
      <RootStack.Screen name="User" component={UserStackNavigator} />
      <RootStack.Screen name="App" component={AppStackNavigator} />
    </RootStack.Navigator>
  );
}

const RootTab = createBottomTabNavigator<RootTabParamList>();

function RootTabNavigator() {
  const insets = useSafeAreaInsets();
  const bg = useColorModeValue("red.50", "coolGray.900");
  const mode = useColorModeValue("light", "dark");
  const { fyncOnlineEnabled } = useContext(SettingsContext);
  return (
    <RootTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarBadgeStyle: {},
        tabBarStyle: {
          position: "absolute",
          paddingBottom: 10 + insets.bottom,
          paddingTop: 20,
          marginTop: 0,

          overflow: "hidden",
          borderWidth: 0,
          backgroundColor: "transparent",

          height: 60 + insets.bottom,
          borderTopWidth: 0,
          borderTopColor: "transparent",
        },
        tabBarBackground: () => (
          <BlurView
            tint={mode}
            intensity={100}
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: "transparent",
              },
            ]}
          />
        ),
        headerShown: false,
        tabBarActiveTintColor: "#7b93ec",
      }}
    >
      <RootTab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: TabBarIcon("home"),
        }}
      />
      <RootTab.Screen
        name="AppTab"
        component={fyncOnlineEnabled ? AppListScreen : EnableOnlineScreen}
        options={{
          tabBarIcon: TabBarIcon("apps"),
        }}
      />
      <RootTab.Screen
        name="ExploreTab"
        component={ExploreStackNavigator}
        options={{
          tabBarIcon: TabBarIcon("compass"),
        }}
      />
    </RootTab.Navigator>
  );
}

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <FriendContextProvider>
      <HomeStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="User" component={UserScreen} />
        <HomeStack.Screen name="Friend" component={FriendScreen} />

        <HomeStack.Screen name="AddFriend" component={AddFromContacts} />
        <HomeStack.Screen name="AddFromContacts" component={AddFromContacts} />
        <HomeStack.Screen name="AddNewFriend" component={AddNewFriendScreen} />
        <HomeStack.Screen name="EditFriend" component={EditFriendScreen} />
      </HomeStack.Navigator>
    </FriendContextProvider>
  );
}

const UserStack = createNativeStackNavigator<UserStackParamList>();

function UserStackNavigator() {
  return (
    <UserStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <UserStack.Screen name="UserScreen" component={UserScreen} />
      {/* <UserStack.Screen name="EditUser" component={EditUserScreen} /> */}
    </UserStack.Navigator>
  );
}

const AppStack = createNativeStackNavigator<AppStackParamList>();

function AppStackNavigator() {
  const { fyncOnlineEnabled } = useContext(SettingsContext);
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!fyncOnlineEnabled ? (
        <AppStack.Screen name="EnableOnline" component={EnableOnlineScreen} />
      ) : (
        <>
          <AppStack.Screen name="AppList" component={AppListScreen} />
          <AppStack.Screen name="AppScreen" component={AppScreen} />
        </>
      )}
    </AppStack.Navigator>
  );
}

const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();

function ExploreStackNavigator() {
  return (
    <ExploreStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ExploreStack.Screen name="Home" component={ExploreScreen} />
    </ExploreStack.Navigator>
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

const TabBarIcon =
  (name: "apps" | "compass" | "home") =>
  ({
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }) =>
    (
      <RemixIcons
        color={color}
        size={35}
        name={focused ? name : `${name}-outline`}
      />
    );
