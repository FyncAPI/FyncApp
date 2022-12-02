import "react-native-gesture-handler";
import "expo-dev-client";
import React from "react";
import {
  NativeBaseProvider,
  extendTheme,
  ColorMode,
  StatusBar,
  Text,
  View,
} from "native-base";
import type { StorageManager } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./src/navigations";
import { UserContextProvider } from "./src/contexts/user/context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useFonts,
  SpaceGrotesk_300Light,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";

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
export const theme = extendTheme({
  colors: newColorTheme,
  fontConfig: {
    SpaceGrotesk: {
      300: {
        normal: "SpaceGrotesk_300Light",
      },
      400: {
        normal: "SpaceGrotesk_400Regular",
      },
      500: {
        normal: "SpaceGrotesk_500Medium",
      },
      600: {
        normal: "SpaceGrotesk_600SemiBold",
      },
      700: {
        normal: "SpaceGrotesk_700Bold",
      },
    },
  },
  components: {
    Text: {
      baseStyle: {
        fontFamily: "body",
      },
    },
    Heading: {
      // Can pass also function, giving you access theming tools
      baseStyle: ({ colorMode }: { colorMode: ColorMode }) => {
        return {
          color: colorMode === "dark" ? "red.300" : "blue.300",
        };
      },
    },
    View: {
      variants: {
        primary: ({ colorMode }: { colorMode: ColorMode }) => {
          return {
            backgroundColor: colorMode === "dark" ? "red.300" : "blue.300",
            fontWeight: "normal",
          };
        },
        background: ({ colorMode }: { colorMode: ColorMode }) => {
          return {
            backgroundColor: colorMode === "dark" ? "gray.900" : "white",
          };
        },
      },
    },
    ScrollView: {
      variants: {
        primary: ({ colorMode }: { colorMode: ColorMode }) => {
          return {
            backgroundColor: colorMode === "dark" ? "red.300" : "blue.300",
            fontWeight: "normal",
          };
        },
        background: ({ colorMode }: { colorMode: ColorMode }) => {
          return {
            backgroundColor: colorMode === "dark" ? "gray.900" : "white",
          };
        },
      },
    },
    Icon: {
      baseStyle: ({ colorMode }: { colorMode: ColorMode }) => {
        return {
          color: colorMode === "dark" ? "white" : "black",
        };
      },
    },
  },
  fonts: {
    default: "SpaceGrotesk",
    body: "SpaceGrotesk",
  },
});

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
        return "dark";
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
  let [fontsLoaded] = useFonts({
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NativeBaseProvider
      theme={theme}
      colorModeManager={colorModeManager}
      config={config}
    >
      <NavigationContainer>
        <UserContextProvider>
          <Navigation />
        </UserContextProvider>
        <StatusBar barStyle={"light-content"} />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
