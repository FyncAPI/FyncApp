/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { AppType } from "./src/contexts/apps/AppsContext";
import { ExploreEventType } from "./src/features/Explore/explore.type";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends NavigationParamList {}
  }
}

export type NavigationParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  RootStack: NavigatorScreenParams<RootStackParamList>;
};

export type AuthStackParamList = {
  Landing: undefined;
  Form: undefined;
};

export type RootStackParamList = {
  RootTab: NavigatorScreenParams<RootTabParamList>;
  AppStack: NavigatorScreenParams<AppStackParamList>;
  EventStack: NavigatorScreenParams<EventStackParamList>;
  AddStack: NavigatorScreenParams<AddStackParamList>;
  FriendStack: NavigatorScreenParams<FriendStackParamList>;
  UserStack: NavigatorScreenParams<UserStackParamList>;
};

export type RootTabParamList = {
  Home: undefined;
  Apps: undefined;
  Explore: undefined;
};

export type FriendStackParamList = {
  Friend: { id: string };

  EditFriend: { contactId: string };
};

export type AddStackParamList = {
  AddFriend: undefined;
  AddFromContacts: undefined;
  AddNewFriend: undefined;
};

export type UserStackParamList = {
  User: undefined;
};

export type AppStackParamList = {
  EnableOnline: undefined;
  App: { id: string; type: AppType };
  Auth: undefined;
  Form: undefined;
};

export type EventStackParamList = {
  // EnableOnline: undefined;
  IRLEvent: { id: string; type: ExploreEventType };
};

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, Screen>;

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  BottomTabScreenProps<RootTabParamList, Screen>;

export type FriendStackScreenProps<Screen extends keyof FriendStackParamList> =
  NativeStackScreenProps<FriendStackParamList, Screen>;

export type AddStackScreenProps<Screen extends keyof AddStackParamList> =
  NativeStackScreenProps<AddStackParamList, Screen>;

export type UserStackScreenProps<Screen extends keyof UserStackParamList> =
  NativeStackScreenProps<UserStackParamList, Screen>;

export type AppStackScreenProps<Screen extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, Screen>;

export type RootTabNavigationProp<Screen extends keyof RootTabParamList> =
  CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, Screen>,
    NativeStackNavigationProp<RootStackParamList>
  >;

export type RootStackNavigationProp<Screen extends keyof RootStackParamList> =
  CompositeNavigationProp<
    BottomTabNavigationProp<RootStackParamList, Screen>,
    NativeStackNavigationProp<RootStackParamList>
  >;

export type AuthStackNavigationProp<Screen extends keyof AuthStackParamList> =
  CompositeNavigationProp<
    BottomTabNavigationProp<AuthStackParamList, Screen>,
    NativeStackNavigationProp<AuthStackParamList>
  >;

export type AppStackNavigationProp<Screen extends keyof AppStackParamList> =
  CompositeNavigationProp<
    BottomTabNavigationProp<AppStackParamList, Screen>,
    NativeStackNavigationProp<AppStackParamList>
  >;

export type FriendStackNavigationProp<
  Screen extends keyof FriendStackParamList
> = CompositeNavigationProp<
  BottomTabNavigationProp<FriendStackParamList, Screen>,
  NativeStackNavigationProp<FriendStackParamList>
>;

export type AddStackNavigationProp<Screen extends keyof AddStackParamList> =
  CompositeNavigationProp<
    BottomTabNavigationProp<AddStackParamList, Screen>,
    NativeStackNavigationProp<AddStackParamList>
  >;

export type UserStackNavigationProp<Screen extends keyof UserStackParamList> =
  CompositeNavigationProp<
    BottomTabNavigationProp<UserStackParamList, Screen>,
    NativeStackNavigationProp<UserStackParamList>
  >;

export type NavigationProp<T extends keyof RootTabParamList> = (
  screen: T
) => CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, T>,
  NativeStackNavigationProp<RootStackParamList>
>;
