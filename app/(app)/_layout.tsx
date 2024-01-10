import { useSession } from "contexts/auth.context";
import { UserProvider } from "contexts/user.context";
import { Redirect, Stack, Tabs } from "expo-router";
import { Text } from "react-native";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <UserProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          // tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          // Name of the route to hide.
          name="index"
          options={{
            // This tab will no longer show up in the tab bar.
            href: null,
          }}
        />
        <Tabs.Screen
          // Name of the route to hide.
          name="meets"
          options={{
            // This tab will no longer show up in the tab bar.
            href: null,
          }}
        />
        <Tabs.Screen
          // Name of the route to hide.
          name="home"
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Text
                  style={{
                    color: focused ? "blue" : "black",
                    fontSize: 30,
                    fontWeight: "bold",
                  }}
                >
                  home
                </Text>
              );
            },
          }}
        />
        <Tabs.Screen
          // Name of the route to hide.
          name="profile"
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Text
                  style={{
                    color: focused ? "blue" : "black",
                    fontSize: 30,
                    fontWeight: "bold",
                  }}
                >
                  👤
                </Text>
              );
            },
          }}
        />
      </Tabs>
    </UserProvider>
  );
}
