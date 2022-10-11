import React from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  ColorMode,
  StatusBar,
} from "native-base";
import type { StorageManager } from "native-base";
import NativeBaseIcon from "./components/NativeBaseIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./src/navigations";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
  dependencies: {
    // For Expo projects (Bare or managed workflow)
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
    // For non expo projects
    // 'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};

// extend the theme
export const theme = extendTheme({ colors: newColorTheme });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

export default function App() {
  const colorModeManager: StorageManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem("@my-app-color-mode");
        return val === "dark" ? "dark" : "light";
      } catch (e) {
        console.log(e);
        return "light";
      }
    },
    set: async (value: ColorMode) => {
      try {
        await AsyncStorage.setItem("@my-app-color-mode", value);
      } catch (e) {
        console.log(e);
      }
    },
  };
  return (
    <NativeBaseProvider
      theme={theme}
      colorModeManager={colorModeManager}
      config={config}
    >
      <NavigationContainer>
        <Navigation />
        <StatusBar barStyle={"light-content"} />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

// Color Switch Component
export function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}
