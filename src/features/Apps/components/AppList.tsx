import { Heading, View } from "native-base";
import React from "react";
import { App } from "../type";
import { FlatList } from "react-native-gesture-handler";
import { AppCard } from "./AppCard";

export const AppList = ({ apps, title }: { apps: App[]; title: string }) => {
  return (
    <View>
      <Heading>{title}</Heading>
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
