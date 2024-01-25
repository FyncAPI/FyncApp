import { User } from "constants/type";
import { View } from "./View";
import { Image } from "react-native";
import { Text } from "./Text";
import { JsonViewer } from "./JsonViewer";
import { IconButton } from "./IconButton";
import { Button } from "./Button";

export function UserCard({ user }: { user: User }) {
  return (
    <Button href={`/profile/${user._id}`}>
      <View row m={5} p={5} r={5} bg={2}>
        <View>
          <Image width={50} height={50} source={{ uri: user.profilePicture }} />
          <Text>{user.name}</Text>
        </View>
        <IconButton name="person-add" />
        <JsonViewer json={JSON.stringify(user)} />
      </View>
    </Button>
  );
}
