import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import {
  AddStackParamList,
  AppStackParamList,
  AuthStackParamList,
  EventStackParamList,
  FriendStackParamList,
  NavigationParamList,
  RootStackNavigationProp,
  RootStackParamList,
  RootTabParamList,
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
import { Icon, Text, useColorModeValue } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Svg, { Path, SvgFromUri, SvgUri, SvgXml } from "react-native-svg";
import { RemixIcons } from "../../assets/Icons/RemixIcons";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { AppListScreen } from "../features/Apps/screens/AppListScreen";
import { AppScreen } from "../features/Apps/screens/AppScreen";
import { ExploreScreen } from "../features/Explore/ExploreScreen";
import { EnableOnlineScreen } from "../features/Apps/screens/EnableOnlineScreen";
import { SettingsContext } from "../contexts/settings/SettingsContext";
import { IRLEventScreen } from "../features/Explore/IRLEventScreen";
import { OnlineAuthScreen } from "../features/online/OnlineAuthScreen";
import { OnlineSignUpForm } from "../features/online/SignUpForm";

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
    <FriendContextProvider>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name="RootTab" component={RootTabNavigator} />
        <RootStack.Screen name="FriendStack" component={FriendStackNavigator} />
        <RootStack.Screen name="AddStack" component={AddStackNavigator} />
        <RootStack.Screen name="AppStack" component={AppStackNavigator} />
        <RootStack.Screen name="EventStack" component={EventStackNavigator} />
        <RootStack.Screen name="UserStack" component={UserStackNavigator} />
      </RootStack.Navigator>
    </FriendContextProvider>
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

          height: 50 + insets.bottom,
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
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: TabBarIcon("home"),
        }}
      />
      <RootTab.Screen
        name="Apps"
        component={fyncOnlineEnabled ? AppListScreen : EnableOnlineScreen}
        options={{
          tabBarIcon: TabBarIcon("apps"),
        }}
      />
      <RootTab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: TabBarIcon("compass"),
        }}
      />
    </RootTab.Navigator>
  );
}

const FriendStack = createNativeStackNavigator<FriendStackParamList>();

function FriendStackNavigator() {
  return (
    <FriendStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <FriendStack.Screen name="Friend" component={FriendScreen} />
      <FriendStack.Screen name="EditFriend" component={EditFriendScreen} />
    </FriendStack.Navigator>
  );
}

const AddStack = createNativeStackNavigator<AddStackParamList>();

function AddStackNavigator() {
  return (
    <AddStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AddStack.Screen name="AddFriend" component={AddFriendScreen} />
      <AddStack.Screen name="AddNewFriend" component={AddNewFriendScreen} />
      <AddStack.Screen name="AddFromContacts" component={AddFromContacts} />
    </AddStack.Navigator>
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
      <UserStack.Screen name="User" component={UserScreen} />
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
      {/* {!fyncOnlineEnabled ? (
        <AppStack.Screen name="EnableOnline" component={EnableOnlineScreen} />
      ) : (
        <> */}
      {/* <AppStack.Screen name="AppList" component={AppListScreen} /> */}
      <AppStack.Screen name="App" component={AppScreen} />
      <AppStack.Screen name="Auth" component={OnlineAuthScreen} />
      <AppStack.Screen name="Form" component={OnlineSignUpForm} />
      {/* </>
      )} */}
    </AppStack.Navigator>
  );
}
const EventStack = createNativeStackNavigator<EventStackParamList>();

function EventStackNavigator() {
  return (
    <EventStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <EventStack.Screen name="IRLEvent" component={IRLEventScreen} />
    </EventStack.Navigator>
  );
}
const icons = {
  apps: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M6.75 2.5A4.25 4.25 0 0 1 11 6.75V11H6.75a4.25 4.25 0 1 1 0-8.5zm0 10.5H11v4.25A4.25 4.25 0 1 1 6.75 13zm10.5-10.5a4.25 4.25 0 1 1 0 8.5H13V6.75a4.25 4.25 0 0 1 4.25-4.25zM13 13h4.25A4.25 4.25 0 1 1 13 17.25V13z"/></svg>`,

  "apps-outline": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M6.75 2.5A4.25 4.25 0 0 1 11 6.75V11H6.75a4.25 4.25 0 1 1 0-8.5zM9 9V6.75A2.25 2.25 0 1 0 6.75 9H9zm-2.25 4H11v4.25A4.25 4.25 0 1 1 6.75 13zm0 2A2.25 2.25 0 1 0 9 17.25V15H6.75zm10.5-12.5a4.25 4.25 0 1 1 0 8.5H13V6.75a4.25 4.25 0 0 1 4.25-4.25zm0 6.5A2.25 2.25 0 1 0 15 6.75V9h2.25zM13 13h4.25A4.25 4.25 0 1 1 13 17.25V13zm2 2v2.25A2.25 2.25 0 1 0 17.25 15H15z"/></svg>`,

  home: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"/> <path d="M20 20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9z"/> </g> </svg>
`,
  "home-outline": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g> <path fill="none" d="M0 0h24v24H0z"/><path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z"/> </g> </svg> `,
  "compass-outline": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"/> <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.5-11.5l-2 5-5 2 2-5 5-2z"/> </g> </svg> `,
  compass: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"/> <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm3.5-13.5l-5 2-2 5 5-2 2-5z"/> </g> </svg> `,
};

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
      // <RemixIcons
      //   color={color}
      //   size={30}
      //   name={focused ? name : `${name}-outline`}
      // />
      // <Icon
      //   as={Ionicons}
      //   color={color}
      //   size={30}
      //   name={focused ? name : `${name}-outline`}
      // />
      <SvgXml
        xml={icons[focused ? name : (`${name}-outline` as keyof typeof icons)]}
        width={30}
        height={30}
        fill={color}
      />
    );
