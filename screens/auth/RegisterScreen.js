import React, { useState } from "react";
import { ImageBackground, Image, Text, View, StyleSheet } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { Form } from "react-native-form-component";
import { Input } from "@rneui/themed";
import { ADD_USER } from "./graphql/user";

export default function RegisterScreen({ navigation }) {
  const bgImage = require("../../assets/bg_home.jpg");

  const [form, setForm] = useState({
    email: "",
    lastname: "",
    firstname: "",
    password: "",
    confirmPassword: ""
  });
  const [addUser, { loading, error }] = useMutation(ADD_USER);

  const handleChangeEmail = (email) => {
    setForm({ ...form, email });
  };
  const handleChangeLastname = (lastname) => {
    setForm({ ...form, lastname });
  };
  const handleChangeFirstname = (firstname) => {
    setForm({ ...form, firstname });
  };
  const handleChangePassword = (password) => {
    setForm({ ...form, password });
  };
  const handleChangeConfirmPassword = (confirmPassword) => {
    setForm({ ...form, confirmPassword });
  };

  const onSubmit = async () => {
    if (form.email && form.lastname && form.firstname && form.password && form.confirmPassword) {
      try {
        console.log("form", form)
        await addUser({ 
          variables: {user: form},
          onCompleted(data) {
            console.log("Data", data)
            navigation.navigate("LoginScreen");
          },
      });
      } catch (error) {
        // Gestion des erreurs lors de l'ajout de l'utilisateur à la base de données
        console.log("Erreur lors de l'ajout de l'utilisateur :", error);
      }
    } else {
    }
  };

  if (loading) return <Text>Chargement en cours</Text>;
  if (error) return <Text>Une erreur s'est produite</Text>;

  return (
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
          <Text style={styles.h1}>Register</Text>
          <Text style={styles.txtLight}>
            Déjà inscrit
            <Text
              style={styles.span}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              S'identifier
            </Text>{" "}
          </Text>
        </View>
      </ImageBackground>
      <Form
        buttonText="Valider"
        buttonStyle={{ backgroundColor: "#0075FF", height: 50, margin: 30 }}
        onButtonPress={onSubmit}
      >
        <Input
          label="Prénom"
          isRequired
          placeholder="Entrez votre prénom"
          value={form.firstname}
          onChangeText={handleChangeFirstname}
        />
        <Input
          label="Nom"
          isRequired
          placeholder="Entrez votre nom"
          value={form.lastname}
          onChangeText={handleChangeLastname}
        />
        <Input
          label="Email"
          isRequired
          placeholder="Entrez votre email"
          value={form.email}
          onChangeText={handleChangeEmail}
        />
        <Input
          label="Password"
          isRequired
          placeholder="Entrez votre password"
          secureTextEntry={true}
          value={form.password}
          onChangeText={handleChangePassword}
        />
        <Input
          label="Confirmation password"
          isRequired
          placeholder="Confirmez votre password"
          secureTextEntry={true}
          value={form.confirmPassword}
          onChangeText={handleChangeConfirmPassword}
        />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyItem: "center",
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
