import { ComponentProps } from "react";
import { Text as DefaultText, StyleSheet } from "react-native";

export const Text = ({
  children,
  fontSize = "xl",
  variant,
  style,
  color,
  ...props
}: {
  children: React.ReactNode;
  fontSize?: "sm" | "md" | "l" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  variant?: "h1" | "h2" | "h3";
  color?: "primary" | "secondary" | "error" | "success" | "warning";
} & ComponentProps<typeof DefaultText>) => {
  return (
    <DefaultText style={[styles[variant], colorTheme[color], style]} {...props}>
      {children}
    </DefaultText>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 24,
    fontWeight: "bold",
  },
  h3: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const colorTheme = {
  primary: {
    color: "#6C63FF",
  },
  secondary: {
    color: "#FF5C58",
  },
  error: {
    color: "#FF5C58",
  },
  success: {
    color: "#6C63FF",
  },
  warning: {
    color: "#FF5C58",
  },
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
