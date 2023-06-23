import { StyleSheet, Text, View } from "react-native";
import { Input, Avatar } from "@rneui/themed";
import { Form } from "react-native-form-component";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER, USER } from "./auth/graphql/user";

export default function EditProfileScreen({ navigation, user }) {
  const [updateUser] = useMutation(UPDATE_USER);
  const [form, setForm] = useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
  });
  const { refetch } = useQuery(USER, {
    variables: { userId: user.user.id },
    onCompleted(data) {
      if (data.user) {
        setForm({
          id: data.user.id,
          firstname: data.user.firstname,
          lastname: data.user.lastname,
          email: data.user.email,
        });
      }
    },
  });

  const handleSubmit = async () => {
    try {
      await updateUser({
        variables: { user: form },
        onCompleted() {
          refetch();
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.picture}>
        <Avatar
          size={150}
          rounded
          source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
        />
        <Text>{form.email}</Text>
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
            value={form.firstname}
            onChangeText={(text) => {
              setForm({ ...form, firstname: text });
            }}
          ></Input>
          <Input
            label="Nom"
            value={form.lastname}
            onChangeText={(text) => {
              setForm({ ...form, lastname: text });
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
