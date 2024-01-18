import { useSession } from "contexts/auth.context";
import { router } from "expo-router";
import { Text, View } from "react-native";
import * as Linking from "expo-linking";
import { useEffect } from "react";

export default function SignIn() {
  const { signIn, isLoading, session } = useSession();
  useEffect(() => {
    console.log(session, isLoading);
  }, [session, isLoading]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={async () => {
          await signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace("/home");
        }}
      >
        Sign In
      </Text>

      <Text>Isloading: {isLoading}</Text>
      <Text>session: {session}</Text>
    </View>
  );
}
