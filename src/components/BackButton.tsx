import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Icon, View } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BackButton({ style }: { style?: any }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View position="absolute" top={insets.top + 10 + "px"} left={2} zIndex={1}>
      <TouchableOpacity
        onPress={() => {
          console.log("back");
          navigation.goBack();
        }}
      >
        <Icon as={Ionicons} name="arrow-back" size={8} />
      </TouchableOpacity>
    </View>
  );
}
