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
  Home: undefined;
  User: undefined;
  AddFriend: undefined;
  AddFromContacts: undefined;
  AddNewFriend: undefined;
  Friend: { id: string };
};

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, Screen>;

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
