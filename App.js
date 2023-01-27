import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileStack from './stack/ProfileStack';
import BookingStack from './stack/BookingStack';
import RegisterScreen from './screens/auth/RegisterScreen';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import LoginScreen from './screens/auth/LoginScreen';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const client = new ApolloClient({
  uri: 'http://10.0.2.2:8000/graphql',
  credentials: 'include',
  cache: new InMemoryCache({
    addTypename: false, //permet d'éviter d'avoir __typename dans nos retours
  }),
  
});

console.log(client);
export default function App() {
  const [user, setUser] = useState(false);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {user ? (
          <Tab.Navigator>
            <Tab.Screen
              name="ProfileStack"
              options={{ headerShown: false }}
              component={ProfileStack}
            />
            <Tab.Screen name="BookingStack" component={BookingStack} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="LoginScreen"
              component={LoginScreen}
            />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </ApolloProvider>
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
