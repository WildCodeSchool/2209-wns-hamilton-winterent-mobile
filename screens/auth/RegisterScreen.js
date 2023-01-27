import React, { useState } from 'react';
import { Button, ImageBackground, Image, Text, View, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { Form } from 'react-native-form-component';
import { Input } from '@rneui/themed';
import { ADD_USER } from './graphql/user';

export default function RegisterScreen({ navigation }) {
  const bgImage = require('../../assets/bg_home.jpg');

  const [form, setForm] = useState({
    email: 'dadazd@gmail.com',
    lastname: 'dazdazd',
    firstname: 'qsdqsd',
    password: 'sdqsd',
  });

  const handleChangeEmail = (e) => {
    setForm({ ...form, email: e });
  };
  const handleChangePassword = (e) => {
    setForm({ ...form, password: e });
  };
  const handleChangeFirstname = (e) => {
    setForm({ ...form, firstname: e });
  };
  const handleChangeLastname = (e) => {
    setForm({ ...form, lastname: e });
  };

  
  const [addUser, { loading, error }] = useMutation(ADD_USER, {
    onCompleted: (data) => {
      console.log("DATA", data)
    },
    onError: (error) => {
      console.log(error)
  }});

  const onSubmit = async () => {
    await addUser({ variables: form });
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
          source={require('../../assets/Logo_winterent-light.png')}
        />
        <Text style={styles.h1}>Register</Text>
        <Text style={styles.txtLight}>
          Déjà inscrit
          <Text
            style={styles.span}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            S'identifier
          </Text>{' '}
        </Text>
      </View>
      </ImageBackground>
      <Form
        buttonText="Valider"
        buttonStyle={{ backgroundColor: '#0075FF', height: 50, margin: 30 }}
        onButtonPress={onSubmit}
      >
        <Input
          label="Firstname"
          isRequired
          placeholder="Entrez votre firstname"
          onChangeText={handleChangeFirstname}
          value={form.firstname}
        />
        <Input
          label="Lastname"
          isRequired
          placeholder="Entrez votre lastname"
          onChangeText={handleChangeLastname}
          value={form.lastname}
        />
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
          secureTextEntry={true}
          onChangeText={handleChangePassword}
          value={form.password}
        />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyItem: 'center',
  },
  content: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
  },
  span: {
    fontSize: 16,
    color: '#3FAEFF',
  },
  txtLight: {
    color: 'white',
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: '0075FF',
    padding: 10,
    backgroundColor: '#EEF3F5',
  },
  Logo: {
    width: 144,
    height: 121,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
});
