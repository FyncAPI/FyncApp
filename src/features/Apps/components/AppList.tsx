import { Heading, Text, View } from "native-base";
import React from "react";
import { App } from "../type";
import { FlatList } from "react-native-gesture-handler";
import { AppCard } from "./AppCard";
import { AppType } from "../../../../types";

export const AppList = ({
  apps,
  title,
  type,
}: {
  apps: App[];
  title: string;
  type: AppType;
}) => {
  console.log(apps);
  return (
    <View m="2" rounded={25} bg="gray.800" p="1.5" pl={"2.5"}>
      <Heading m={"1"}>{title}</Heading>
      {apps.length === 0 ? (
        <Text m={"2"} fontWeight={"light"} fontSize={"lg"}>
          No apps found
        </Text>
      ) : (
        <FlatList
          data={apps}
          renderItem={({ item }) => <AppCard app={item} type={type} />}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};
