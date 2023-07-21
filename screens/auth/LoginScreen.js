import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Image, ImageBackground, Text, View, StyleSheet } from "react-native";
import { Form } from "react-native-form-component";
import { Input } from "@rneui/themed";
import { LOGIN } from "./graphql/user";
import * as SecureStore from "expo-secure-store";

export default function LoginScreen({ navigation, setUser }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChangeEmail = (e) => {
    setForm({ ...form, email: e });
  };
  const handleChangePassword = (e) => {
    setForm({ ...form, password: e });
  };

  const [login, { loading }] = useLazyQuery(LOGIN, {
    async onCompleted(data) {
      try {
        await SecureStore.setItemAsync("user", JSON.stringify(data.login));
        setUser(data.login);
      } catch (e) {
        alert("Failed to save the data to the storage");
      }
    },

    onError(error) {
      console.log(error.message);
    },
  });

  const onSubmit = async () => {
    await login({ variables: { user: form } });
  };

  const bgImage = require("../../assets/bg_home.jpg");
if (loading) {return <Text>Chargement en cours</Text>}
  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={bgImage}
          resizeMode="cover"
          style={styles.bgImage}
        >
          <View style={styles.content}>
            <Image
              style={styles.Logo}
              source={require("../../assets/Logo_winterent-light.png")}
            />
            <Text style={styles.h1}>Login</Text>
            <Text style={styles.txtLight}>
              <Text
                style={styles.span}
                onPress={() => navigation.navigate("RegisterScreen")}
              >
                Créer un compte
              </Text>
              et retouvez vos articles
            </Text>
          </View>
        </ImageBackground>
        <Form
          buttonText="Valider"
          buttonStyle={{ backgroundColor: "#0075FF", height: 50, margin: 30 }}
          onButtonPress={onSubmit}
        >
          <Input
            label="Email"
            isRequired
            placeholder="Entrez votre email"
            value={form.email}
            onChangeText={handleChangeEmail}
            name="email"
          />

          <Input
            label="Password"
            isRequired
            placeholder="Entrez votre password"
            value={form.password}
            onChangeText={handleChangePassword}
            secureTextEntry={true}
          />
        </Form>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyItem: "center",
    backgroundColor: "white",
  },
  content: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
  },
  span: {
    fontSize: 16,
    color: "#3FAEFF",
  },
  txtLight: {
    color: "white",
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: "0075FF",
    padding: 10,
    backgroundColor: "#EEF3F5",
  },
  Logo: {
    width: 144,
    height: 121,
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
  },
});
