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
  Root: NavigatorScreenParams<RootTabParamList>;
  Friend: NavigatorScreenParams<FriendStackParamList>;
  User: NavigatorScreenParams<UserStackParamList>;
  App: NavigatorScreenParams<AppStackParamList>;
};

export type RootTabParamList = {
  HomeTab: undefined;
  AppTab: undefined;
  ExploreTab: undefined;
};

// export type HomeStackParamList = {
//   HomeScreen: undefined;
//   UserScreen: undefined;
//   AddFriend: undefined;
//   AddFromContacts: undefined;
//   AddNewFriend: undefined;
//   EditFriend: { contactId: string };
//   FriendScreen: { id: string };
// };

export type AppType =
  | "myApps"
  | "newApps"
  | "featuredApps"
  | "popularApps"
  | "searchApps"
  | "exploreApps";

export type AppStackParamList = {
  EnableOnline: undefined;
  AppList: undefined;
  AppScreen: {
    id: string;
    type: AppType;
  };
};

export type FriendStackParamList = {
  FriendScreen: { id: string };
  AddFriend: undefined;
  AddFromContacts: undefined;
  AddNewFriend: undefined;
  EditFriend: { contactId: string };
};

export type UserStackParamList = {
  UserScreen: undefined;
};

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, Screen>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  BottomTabScreenProps<RootTabParamList, Screen>;

export type RootTabNavigationProp<Screen extends keyof RootTabParamList> =
  BottomTabNavigationProp<RootTabParamList, Screen>;

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

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
