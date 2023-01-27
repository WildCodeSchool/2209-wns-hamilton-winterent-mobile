import { StyleSheet, Text, View } from "react-native";
import { Input, Avatar } from "@rneui/themed";
import { Form } from "react-native-form-component";
import { useState } from "react";

export default function EditProfileScreen() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    console.log(form);
  };

  return (
    <View style={styles.container}>
      <View style={styles.picture}>
        <Avatar
          size={150}
          rounded
          source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
        />
      </View>

      <Form
        buttonText="Sauvegarder"
        buttonStyle={{
          backgroundColor: "#0075FF",
          height: 50,
          margin: 30,
        }}
        onButtonPress={handleSubmit}
      >
        <View style={styles.input}>
          <Input
            label="Prénom"
            onChangeText={(text) => {
              setForm({ ...form, firstname: text });
            }}
          ></Input>
          <Input
            label="Nom"
            onChangeText={(text) => {
              setForm({ ...form, lastname: text });
            }}
          ></Input>
          <Input
            keyboardType="email-address"
            label="Email"
            onChangeText={(text) => {
              setForm({ ...form, email: text });
            }}
          ></Input>
          <Input
            keyboardType="visible-password"
            textContentType="password"
            label="Mot de passe"
            onChangeText={(text) => {
              setForm({ ...form, password: text });
            }}
          ></Input>
        </View>
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  picture: {
    marginTop: 20,
    alignItems: "center",
  },

  input: {
    marginTop: 30,
    marginHorizontal: 10,
  },
});
