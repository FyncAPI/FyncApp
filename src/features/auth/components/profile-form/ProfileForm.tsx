import {
  Box,
  FormControl,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  View,
  WarningOutlineIcon,
} from "native-base";
import React, { useEffect, useState } from "react";
import { DismissKeyboardView } from "../../../../components/DismissKeyboardView";
import { User } from "../../../../contexts/user/types";
export default function ProfileForm({
  profile,
  setProfile,
  error,
  setError,
}: {
  profile: User | undefined;
  setProfile: (profile: User) => void;
  error: Object;
  setError: (error: Object) => void;
}) {
  const updateProfile = (key: string) => (value: User[keyof User]) => {
    setProfile({ ...profile!, [key]: value });
  };

  return (
    <>
      <DismissKeyboardView>
        <View flex={1} variant="background" p="2">
          <>
            <FormInput
              label="Name"
              value={profile?.name}
              setValue={updateProfile("name")}
              isInvalid={profile?.name?.length == 0}
            />
            <FormInput
              label="email"
              value={profile?.email}
              setValue={updateProfile("email")}
              isInvalid={profile?.email?.length == 0}
            />

            {/* <FormInput
        flexGrow={1}
        label="First Name"
        value={profile?.firstName}
        setValue={updateProfile("firstName")}
      />
      <FormInput
        label="Last Name"
        value={profile?.lastName}
        setValue={updateProfile("lastName")}
      /> */}

            {/* <FormInput
              label="Phone Number"
              value={profile?.phoneNumbers?.[0]?.number}
              isInvalid={profile?.phoneNumbers?.[0]?.number?.length == 0}
              setValue={(v) => updateProfile("phoneNumbers")([{ number: v }])}
              mb={2}
              keyboardType="phone-pad"
            /> */}
          </>
        </View>
      </DismissKeyboardView>
    </>
  );
}

const FormInput = ({
  label,
  value,
  setValue,
  errorMessage,
  isInvalid,
  ...props
}: {
  label: string;
  value: string | undefined;
  setValue: (value: string) => void;
  errorMessage?: string;
  isInvalid?: boolean;
} & React.ComponentProps<typeof Input>) => {
  return (
    <Box alignItems="center">
      <FormControl isInvalid={isInvalid} w="95%" maxW="400px">
        <FormControl.Label>{label}</FormControl.Label>
        <Input
          value={value}
          onChangeText={(text) => setValue(text)}
          {...props}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errorMessage}
        </FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
};
