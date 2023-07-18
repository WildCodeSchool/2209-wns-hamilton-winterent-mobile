import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BookingsScreen from "../screens/BookingsScreen";

const Stack = createStackNavigator();

export default function BookingStack({ user }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BookingsScreen" options={{ headerShown: false }}>
        {(props) => <BookingsScreen {...props} user={user} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
