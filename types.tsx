/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends NavigationParamList {}
  }
}

export type NavigationParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  RootStack: NavigatorScreenParams<RootStackParamList>;
};

export type RootStackScreenProps<Screen extends keyof NavigationParamList> =
  NativeStackScreenProps<NavigationParamList, Screen>;

export type AuthStackParamList = {
  Landing: undefined;
  Form: undefined;
};

export type RootStackParamList = {
  Home: undefined;
  User: undefined;
  Friend: { id: string };
};

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, Screen>;
