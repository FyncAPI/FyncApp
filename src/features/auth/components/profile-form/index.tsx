import {
  Button,
  FormControl,
  Heading,
  Input,
  Text,
  View,
  VStack,
} from "native-base";
import React from "react";

export default function ProfileForm({
  setProfile,
}: {
  setProfile: (profile: { name: string; nickname: string }) => void;
}) {
  return (
    <View>
      <Heading>Profile</Heading>
      <Text>name</Text>

      <Text>nickname</Text>
      <Text>num</Text>
      <Text>profile image</Text>
      <Text>bd</Text>
      <Text>bio</Text>
    </View>
  );
}
