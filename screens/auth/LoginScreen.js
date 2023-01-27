import React, { useState } from 'react';
import { Button, Image, ImageBackground, Text, View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Form } from 'react-native-form-component';
import { Input } from '@rneui/themed';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const bgImage = require('../../assets/bg_home.jpg');

  return (
    <>
      <View style={styles.container}>
      <ImageBackground source={bgImage} resizeMode="cover" style={styles.bgImage}>
          <View style={styles.content}>
              <Image
                style={styles.Logo}
                source={require('../../assets/Logo_winterent-light.png')}/>
              <Text style={styles.h1}>Login</Text>
              <Text style={styles.txtLight}>
                <Text
                  style={styles.span}
                  onPress={() => navigation.navigate('RegisterScreen')}
                >
                  Créer un compte
                </Text>{' '}
                et retouvez vos articles
              </Text>
          </View>
        </ImageBackground>
        <Form
          buttonText="Valider"
          buttonStyle={{ backgroundColor: '#0075FF', height: 50, margin: 30 }}
          onButtonPress={() => console.log(email)}
        >
          <Input
            label="Email"
            isRequired
            placeholder="Entrez votre email"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
          <Input
            label="Password"
            isRequired
            placeholder="Entrez votre password"
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
