import React from "react";
import {
  FlatList,
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { useUser } from "contexts/user.context";
import { View } from "components/View";
import { Text } from "components/Text";
import { SafeTop } from "components/SafeTop";
import { IconButton } from "components/IconButton";
import { Input } from "components/Input";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { ScrollView } from "components/ScrollView";
import { Button } from "components/Button";

const Add = () => {
  const { user } = useUser();
  const width = 256;
  const height = 256;
  const r = width * 0.33;
  const [search, setSearch] = React.useState("");
  const [searchActive, setSearchActice] = React.useState(false);
  const colorMode = useColorScheme();

  return (
    <View style={{ flex: 1 }}>
      <SafeTop back title={"Add Friend"} />
      <ScrollView p={10} style={{ flex: 1 }}>
        <View col flex>
          <View row style={{ width: "100%", maxWidth: "100%" }}>
            <Input
              leftItem={
                <Ionicons
                  name="person"
                  size={24}
                  color={colorMode == "dark" ? "#fff" : "black"}
                />
              }
              placeholder="Find your friend"
              bg={2}
              m={10}
              r={20}
              p={5}
              // variant="subtitle"
              value={search}
              onChangeText={(t) => {
                setSearch(t);
              }}
              onFocus={() => {
                setSearchActice(true);
              }}
              onPressIn={() => {
                setSearchActice(true);
              }}
              rightItem={
                searchActive ? (
                  <Button mx={5} onPress={() => setSearchActice(false)}>
                    <Text variant="subtitle" color="primary">
                      Cancel
                    </Text>
                  </Button>
                ) : null
              }
            />
          </View>
          {searchActive ? (
            <View flex bg={4}></View>
          ) : (
            <>
              <IconButton name="qr-code" />
              <IconButton name="search" />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default Add;
