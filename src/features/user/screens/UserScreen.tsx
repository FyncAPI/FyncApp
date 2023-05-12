import React, { useContext } from "react";
import { SafeTop } from "../../../components/SafeTop";
import {
  Box,
  Button,
  Heading,
  HStack,
  ScrollView,
  Select,
  Slider,
  Switch,
  Text,
  View,
} from "native-base";
import { ToggleDarkMode } from "../../../components/ThemeSwitch";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../../contexts/user/userContext";
import { Alert } from "react-native";
import BackButton from "../../../components/BackButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SettingsContext } from "../../../contexts/settings/SettingsContext";

export default function UserScreen() {
  const navigation = useNavigation();
  const { userData, deleteUserData } = useContext(UserContext);
  const {
    carouselNumColumns,
    updateSettings,
    enableFyncOnline,
    disableFyncOnline,
    fyncOnlineEnabled,
  } = useContext(SettingsContext);
  const insets = useSafeAreaInsets();
  return (
    <>
      <BackButton />
      <HStack
        position={"absolute"}
        top={insets.top + "px"}
        left={"10"}
        zIndex={5}
        mx={2}
        justifyContent="center"
      >
        <Heading fontSize="4xl">User</Heading>
      </HStack>
      <ScrollView flex={1} p={2} variant="background">
        <SafeTop />
        <SafeTop />
        <HStack p={5}>
          {/* <Image source={{ uri: userData?.photoURL }} alt="user" size={100} /> */}
          <View>
            <Heading>{userData?.profile?.name}</Heading>
            {/* <Text>
              {userData?.profile?.phoneNumbers?.map((p) => p.number).join(", ")}
            </Text> */}
          </View>
        </HStack>

        <View m="5">
          <Heading mb={"2"}>Theme</Heading>
          <ToggleDarkMode />
        </View>
        <View m="5">
          <Heading mb={"2"}>Fync Online</Heading>
          {fyncOnlineEnabled ? (
            <Button onPress={() => disableFyncOnline()}>
              <Text>Disable</Text>
            </Button>
          ) : (
            <Button onPress={() => enableFyncOnline()}>
              <Text>Enable</Text>
            </Button>
          )}
        </View>

        <View m="5">
          <Heading mb={"2"}>Friends columns: {carouselNumColumns}</Heading>
          {/* <Select
            placeholder="Select option"
            selectedValue={String(carouselNumColumns)}
            onValueChange={(itemValue) => {
              updateSettings({ carouselNumColumns: Number(itemValue) });
            }}
          >
            <Select.Item label="3" value="3" />
            <Select.Item label="4" value="4" />
          </Select> */}
          <Slider
            value={carouselNumColumns}
            width={"full"}
            minValue={2}
            maxValue={6}
            step={1}
            onChange={(value) => {
              updateSettings({ carouselNumColumns: value });
            }}
            size="lg"
            // defaultValue={3}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb></Slider.Thumb>
          </Slider>
        </View>

        <Button
          colorScheme="secondary"
          m="5"
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
      </ScrollView>
    </>
  );
}
