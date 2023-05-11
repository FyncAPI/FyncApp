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
        size={30}
        name={focused ? name : `${name}-outline`}
      />
    );
