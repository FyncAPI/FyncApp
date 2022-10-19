import React, { useContext } from "react";
import { SafeTop } from "../../../../components/SafeTop";
import { Box, Button, Heading, View } from "native-base";
import { ToggleDarkMode } from "../../../../components/ToggleTheme";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../../contexts/user";
import { Alert } from "react-native";

export default function UserScreen() {
  const navigation = useNavigation();
  const { deleteUserData } = useContext(UserContext);
  return (
    <View flex={1} variant="background">
      <SafeTop />
      <Heading>Theme</Heading>
      <ToggleDarkMode />
      <Button
        onPress={() => {
          navigation.goBack();
        }}
      >
        Back
      </Button>
      <Button
        onPress={() => {
          Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              { text: "Yes", onPress: deleteUserData, style: "destructive" },
            ],
            { cancelable: false }
          );
        }}
      >
        Delete User
      </Button>
    </View>
  );
}
