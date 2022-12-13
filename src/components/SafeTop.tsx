import { View } from "native-base";
import { ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function SafeTop(props: ViewProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          height: insets.top,
          backgroundColor: "transparent",
        },
        props.style,
      ]}
      _android={{ mt: 3 }}
      {...props}
    />
  );
}

export function SafeBottom(props: ViewProps) {
  const insets = useSafeAreaInsets();
  const { style, ...otherProps } = props;
  return (
    <View
      style={[
        {
          height: insets.bottom,
          backgroundColor: "transparent",
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
