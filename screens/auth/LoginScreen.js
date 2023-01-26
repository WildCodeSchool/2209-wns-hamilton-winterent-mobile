import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Form } from 'react-native-form-component';
import { Input } from '@rneui/themed';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.h1}>Login</Text>
        <Text>
          <Text
            style={styles.span}
            onPress={() => navigation.navigate('RegisterScreen')}
          >
            Créer un compte
          </Text>{' '}
          et retouvez vos articles
        </Text>
      </View>

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyItem: 'center',
    margin: 20,
  },
  h1: {
    fontSize: 34,
    fontStyle: 'bold',
  },
  span: {
    fontSize: 16,
    color: 'blue',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#EEF3F5',
  },
});
