import { createStackNavigator } from '@react-navigation/stack';
import EditProfileScreen from '../screens/EditProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

export default function ProfileStack({user, setUser}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen">
        {(props) => <ProfileScreen {...props} user={user} setUser={setUser} />}
      </Stack.Screen>
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
