import { StyleSheet, Text, View } from 'react-native';
import { Input, Avatar } from '@rneui/themed';
import { Form } from 'react-native-form-component';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER, USER } from './auth/graphql/user';

export default function EditProfileScreen({ user }) {
  const [updateUser] = useMutation(UPDATE_USER);
  const [form, setForm] = useState({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    birthdate: '',
  });
  const { refetch } = useQuery(USER, {
    variables: { userId: user.user.id },
    onCompleted(data) {
      console.log(data);
      if (data.user) {
        setForm({
          id: data.user.id,
          firstname: data.user.firstname,
          lastname: data.user.lastname,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
          birthdate: data.user.birthdate,
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
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.picture}>
        <Avatar
          size={150}
          rounded
          source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }}
        />
        <Text>{form.email}</Text>
      </View>

      <Form
        buttonText="Sauvegarder"
        buttonStyle={{
          backgroundColor: '#0075FF',
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
          <Input
            label="Numero téléphone"
            value={form.phoneNumber}
            onChangeText={(text) => {
              setForm({ ...form, phoneNumber: text });
            }}
          ></Input>
        </View>
      </Form>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  picture: {
    marginTop: 20,
    alignItems: 'center',
  },

  input: {
    marginTop: 30,
    marginHorizontal: 10,
  },
});
