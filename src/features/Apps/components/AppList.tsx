import { Heading, View } from "native-base";
import React from "react";
import { App } from "../apps.type";
import { FlatList } from "react-native-gesture-handler";
import { AppCard } from "./AppCard";

export const AppList = ({ apps, title }: { apps: App[]; title: string }) => {
  console.log(apps);
  return (
    <View m="2" rounded={25} bg="gray.800" p="1.5" pl={"2.5"}>
      <Heading m={"1"}>{title}</Heading>
      <FlatList
        data={apps}
        renderItem={({ item }) => <AppCard app={item} />}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
