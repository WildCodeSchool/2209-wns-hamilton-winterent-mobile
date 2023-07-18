import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileStack from "./stack/ProfileStack";
import BookingStack from "./stack/BookingStack";
import RegisterScreen from "./screens/auth/RegisterScreen";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import LoginScreen from "./screens/auth/LoginScreen";
import Reactotron from "reactotron-react-native";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

Reactotron.log("hello rendering world");

const client = new ApolloClient({
  uri: "http://10.0.2.2:8000/graphql",
  credentials: "include",
  cache: new InMemoryCache({
    addTypename: false, //permet d'éviter d'avoir __typename dans nos retours
  }),
});

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {user ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarStyle: {
                backgroundColor: "#123456",
                height: 60,
                paddingBottom: 10,
              },
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Profile") {
                  iconName = focused ? "person" : "person-outline";
                } else if (route.name === "Booking") {
                  iconName = focused ? "cart" : "cart-outline";
                }

                return <Icon name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Profile" options={{ headerShown: false }}>
              {(props) => (
                <ProfileStack {...props} user={user} setUser={setUser} />
              )}
            </Tab.Screen>
            <Tab.Screen name="Booking" options={{ headerShown: false }}>
              {(props) => <BookingStack {...props} user={user} />}
            </Tab.Screen>
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="LoginScreen">
              {(props) => (
                <LoginScreen {...props} user={user} setUser={setUser} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="RegisterScreen"
              options={{ headerShown: false }}
              component={RegisterScreen}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  containerNav: {
    flex: 1,
    backgroundColor: "#0F2641",
  },
});
