import { Ionicons } from "@expo/vector-icons";
import { Icon, Text, View } from "native-base";
import { Factory } from "native-base";
import { Friend } from "../contexts/user/types";
import { PhoneNumberCard } from "./PhoneNumberCard";

function PhoneNumberListBase({
  phoneNumbers,
}: {
  phoneNumbers: Friend["phoneNumbers"];
}) {
  if (!phoneNumbers) return <Text>No Phone Numbers</Text>;
  return (
    <>
      {phoneNumbers.map((p, index) => (
        <PhoneNumberCard phoneNumber={p} p={2} key={index} />
      ))}
    </>
  );
}

export const PhoneNumberList = Factory(PhoneNumberListBase);
