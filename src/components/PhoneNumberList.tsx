import { Ionicons } from "@expo/vector-icons";
import { Icon, Text, View } from "native-base";
import { Factory } from "native-base";
import { Friend } from "../contexts/user/types";
import { PhoneNumberCard } from "./PhoneNumberCard";

function PhoneNumberListBase({
  phoneNumbers,
}: {
  phoneNumbers: Friend["contact"]["phoneNumbers"];
}) {
  if (!phoneNumbers) return <Text>No Phone Numbers</Text>;
  return (
    <View
      _dark={{
        bg: "trueGray.800",
      }}
      _light={{
        bg: "lightBlue.100",
      }}
      rounded={"sm"}
      p={"1"}
    >
      {phoneNumbers.map((p, index) => (
        <PhoneNumberCard phoneNumber={p} p={2} key={index + "PHONE"} />
      ))}
    </View>
  );
}

export const PhoneNumberList = Factory(PhoneNumberListBase);
