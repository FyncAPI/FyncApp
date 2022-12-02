import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Icon, View } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BackButton({
  style,
  ...props
}: React.ComponentProps<typeof Icon>) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View
      position="absolute"
      top={insets.top + 10 + "px"}
      left={2}
      zIndex={1}
      _android={{ mt: 3 }}
    >
      <TouchableOpacity>
        <Icon
          _dark={{ color: "light.100" }}
          _light={{ color: "dark.100" }}
          as={Ionicons}
          name="arrow-back"
          size={8}
          onPress={() => {
            console.log("back");
            navigation.goBack();
          }}
          {...props}
        />
      </TouchableOpacity>
    </View>
  );
}
