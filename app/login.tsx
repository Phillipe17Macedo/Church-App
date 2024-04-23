/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';


export default function Login() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Inicializar o Firebase App
  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyCyhMAnKhc2y_2EzP2LyO7-AbVEBjgj2ek',
      authDomain: 'videiraapp.firebaseapp.com',
      databaseURL: 'https://videiraapp-default-rtdb.firebaseio.com',
      projectId: 'videiraapp',
      storageBucket: 'videiraapp.appspot.com',
      messagingSenderId: '348499807286',
      appId: '1:348499807286:web:c9bcbc26c1c9acad9adc97',
      measurementId: 'G-KHDPWMVYNN',
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const firebaseApp = initializeApp(firebaseConfig);
  }, []);

  const handleLoginPress = async () => {
    console.log('Dados de input:');
    console.log('Email:', email);
    console.log('Senha:', senha);
    try {
      const auth = getAuth(); // Obter a instância de autenticação do Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      await AsyncStorage.setItem('userId', user.uid);
      console.log('Login realizado com sucesso!');
      console.log('ID do User', user.uid);
      console.log(email);
      console.log(senha);
      Alert.alert('Login com Sucesso!');
      navigation.navigate('perfil');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        <View style={[styles.containerInput]}>
          <TextInput
            style={[styles.inputDados]}
            keyboardType="default"
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={[styles.inputDados]}
            keyboardType="visible-password"
            placeholder="Senha"
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />
          <View style={[styles.containerRedefinir]}>
            <Link href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox" style={[styles.linkRedefinir]}>
              Redefinir Senha
            </Link>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <View style={[styles.containerTextLink]}>
          <Link href="/sign" style={[styles.textLink]}>
            CADASTRAR-SE
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#040316',
  },
  containerInput: {
    backgroundColor: '#878787',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: 50,
    paddingTop: 15,
    paddingBottom: 5,
    borderRadius: 20,
    height: 'auto',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  inputDados: {
    backgroundColor: '#fff',
    height: 35,
    width: '90%',
    borderRadius: 15,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#CACACA',
    color: '#202022',
    fontWeight: 'bold',
    fontSize: 18,
    fontVariant: ['small-caps'],
    marginBottom: 10,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  containerRedefinir: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
    alignSelf: 'baseline',
    left: 20,
    paddingBottom: 8,
  },
  linkRedefinir: {
    color: '#DAFDBA',
    fontWeight: 'bold',
    fontSize: 16,
    fontVariant: ['small-caps'], 
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#DAFDBA',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 50,
    marginTop: 40,
    marginBottom: 25,
    width: 150,
    height: 60,
    textAlign: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#CACACA',
  },
  buttonText: {
    color: '#012030',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
    fontVariant: ['small-caps'],
  },
  containerTextLink: {
    marginBottom: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  textLink: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    fontVariant: ['small-caps'],
    padding: 4,
  },
});
