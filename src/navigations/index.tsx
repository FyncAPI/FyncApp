import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../features/home/screens/index";
import UserScreen from "../features/user/screens/index";

const Stack = createNativeStackNavigator();

export function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="Root" component={RootTab} /> */}
      <Stack.Screen name="Root" component={HomeScreen} />
      <Stack.Screen name="User" component={UserScreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function RootTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}
