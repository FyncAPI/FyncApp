import { COLORS } from "constants/colors";
import { ComponentProps } from "react";
import { View as DefaultView, StyleSheet, useColorScheme } from "react-native";

export const View = ({
  children,
  row,
  col,
  p,
  m,
  style,
  ...props
}: {
  children: React.ReactNode;
  row?: boolean;
  col?: boolean;
  p?: number;
  m?: number;
} & ComponentProps<typeof DefaultView>) => {
  const colorScheme = useColorScheme();
  console.log(colorScheme);

  return (
    <DefaultView
      style={[
        row
          ? {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }
          : col
          ? {
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }
          : {},
        backgrounds[colorScheme][1],
        p ? { padding: p } : {},
        m ? { margin: m } : {},
        style,
      ]}
      {...props}
    >
      {children}
    </DefaultView>
  );
};

const backgrounds = {
  dark: StyleSheet.create({
    1: {
      backgroundColor: COLORS.background[950],
    },
    2: {
      backgroundColor: COLORS.background[900],
    },
    3: {
      backgroundColor: COLORS.background[800],
    },
    4: {
      backgroundColor: COLORS.background[700],
    },
  }),
  light: StyleSheet.create({
    1: {
      backgroundColor: COLORS.background[50],
    },
    2: {
      backgroundColor: COLORS.background[100],
    },
    3: {
      backgroundColor: COLORS.background[200],
    },
    4: {
      backgroundColor: COLORS.background[300],
    },
  }),
};

export const fontSizes = {
  sm: 12,
  md: 16,
  l: 24,
  xl: 32,
  "2xl": 40,
  "3xl": 48,
  "4xl": 56,
  "5xl": 64,
  "6xl": 72,
};
