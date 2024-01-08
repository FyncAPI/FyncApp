import { useSession } from "contexts/auth.context";
import { router } from "expo-router";
import { Text, View } from "react-native";
import * as Linking from "expo-linking";

export default function SignIn() {
  const { signIn } = useSession();
  const url = Linking.useURL();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace("/");
        }}
      >
        Sign In
      </Text>
      <Text>URL: {url}</Text>
    </View>
  );
}
