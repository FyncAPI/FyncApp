import { RouteProp, useRoute } from "@react-navigation/native";
import {
  Avatar,
  Box,
  FormControl,
  Heading,
  Image,
  Input,
  ScrollView,
  Text,
  View,
  WarningOutlineIcon,
} from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import { HomeStackParamList } from "../../../../types";
import BackButton from "../../../components/BackButton";
import { DismissKeyboardView } from "../../../components/DismissKeyboardView";
import { SafeTop } from "../../../components/SafeTop";
import { FriendContext } from "../../../contexts/friend/FriendContext";
import { Friend } from "../../../contexts/user/types";

export const EditFriendScreen = () => {
  const {
    params: { contactId },
  } = useRoute<RouteProp<HomeStackParamList, "EditFriend">>();

  const [friend, setFriend] = React.useState<Friend>({} as Friend);

  const screenSizes = Dimensions.get("window");
  const size = screenSizes.width / 3 - 20;

  const { friends } = React.useContext(FriendContext);

  React.useEffect(() => {
    const f = friends?.find((f) => f.contactId == contactId);

    if (f) {
      setFriend(f);
    }
  }, [contactId, friends]);

  const updateContact =
    (key: string) => (value: Friend["contact"][keyof Friend["contact"]]) => {
      setFriend((friend) => ({
        ...friend,
        contact: {
          ...friend?.contact,
          [key]: value,
        },
      }));
    };

  if (!friend.contact) {
    return null;
  }

  return (
    <DismissKeyboardView>
      <ScrollView flex={1} variant="background">
        <BackButton
          _light={{
            color: "white",
          }}
        />

        <SafeTop />
        <Heading ml={12} fontSize="4xl">
          Update Friend
        </Heading>
        <View flex={1} variant="background" p="5">
          <TouchableOpacity onPress={() => {}}>
            <Box
              overflow={"hidden"}
              alignSelf="center"
              rounded="lg"
              shadow={1}
              p="5"
            >
              {friend?.contact?.image ? (
                <Image
                  source={friend?.contact?.image}
                  alt="Profile Image"
                  w={size}
                  h={size}
                  rounded="full"
                />
              ) : (
                <View>
                  <SvgXml xml={friend.avatar} width={size} height={size} />
                </View>
              )}
            </Box>
          </TouchableOpacity>

          <FormInput
            label="First Name"
            value={friend?.contact.firstName}
            setValue={updateContact("firstName")}
            keyboardType="name-phone-pad"
            autoCapitalize="none"
          />
          <FormInput
            label="nickname"
            value={friend?.contact.nickname}
            setValue={updateContact("nickname")}
            keyboardType="name-phone-pad"
            autoCapitalize="none"
          />
          <FormInput
            label="email"
            value={friend?.contact.email}
            setValue={updateContact("email")}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {friend.contact.phoneNumbers?.map((p, i) => (
            <FormInput
              key={i}
              label="phone"
              value={p.number}
              setValue={updateContact("phoneNumbers")}
              keyboardType="phone-pad"
            />
          ))}
        </View>
      </ScrollView>
    </DismissKeyboardView>
  );
};

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
