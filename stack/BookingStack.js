import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BookingsScreen from '../screens/BookingsScreen';

const Stack = createStackNavigator();

export default function BookingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BookingsScreen" options={{headerShown: false}} component={BookingsScreen}>
      </Stack.Screen>
      {/* <Stack.Screen
        name="BookingScreen"
        options={{ title: "Booking" }}
        component={BookingScreen}
      /> */}
    </Stack.Navigator>
  );
}
