import { createStackNavigator } from "@react-navigation/stack";
import EditProfileScreen from "../screens/EditProfileScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();

export default function ProfileStack({user, setUser}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        options={{ headerShown: false }}
        component={ProfileScreen}
      />
      <Stack.Screen
        name="EditProfileScreen"
        options={{ title: "Edition du profil" }}
        component={EditProfileScreen}
      />
    </Stack.Navigator>
  );
}
