import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileStack from './stack/ProfileStack';
import BookingStack from './stack/BookingStack';
import RegisterScreen from './screens/auth/RegisterScreen';
import LoginScreen from './screens/auth/LoginScreen';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(true);

  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator>
          <Tab.Screen name="ProfileStack" options={{headerShown: false}} component={ProfileStack} />
          <Tab.Screen name="BookingStack" component={BookingStack} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
