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
} from "native-base";
import type { StorageManager } from "native-base";
import NativeBaseIcon from "./components/NativeBaseIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <VStack space={5} alignItems="center">
          <NativeBaseIcon />
          <Heading size="lg">Welcome to NativeBase</Heading>
          <HStack space={2} alignItems="center">
            <Text>Edit</Text>
            <Box
              _web={{
                _text: {
                  fontFamily: "monospace",
                  fontSize: "sm",
                },
              }}
              px={2}
              py={1}
              _dark={{ bg: "brand.700" }}
              _light={{ bg: "blueGray.200" }}
            >
              App.js
            </Box>
            <Text>and save to reload.</Text>
          </HStack>
          <Link href="https://docs.nativebase.io" isExternal>
            <Text color="brand.800" underline fontSize={"xl"}>
              Learn NativeBase
            </Text>
          </Link>
          <ToggleDarkMode />
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
}

// Color Switch Component
function ToggleDarkMode() {
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
