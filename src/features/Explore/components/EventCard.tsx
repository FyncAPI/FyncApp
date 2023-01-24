import { Heading, Text, View } from "native-base";
import React from "react";
import { IRLEvent } from "../explore.type";

export const EventCard = ({ event }: { event: IRLEvent }) => {
  console.log(event, "adsfsdfasdfasdfa");
  return (
    <View key={event._id} bg={"gray.800"} p="3" m={2} rounded={"lg"}>
      <Heading>{event.name}</Heading>
      <Text>{event.description}</Text>
      <Text>{event.type}</Text>
      <Text>{event.type}</Text>
    </View>
  );
};
