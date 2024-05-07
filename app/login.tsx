/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
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

  const handleLoginPress = async () => {
    console.log('Dados de Logados:');
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
      Alert.alert('Email ou Senha Inválidos!');
    }
  };
  const handleResetPasswordPress = async () => {
    if (!email) {
      Alert.alert('Por favor, insira seu email.');
      return;
    }
    
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Um email para redefinição de senha foi enviado para ' + email);
    } catch (error) {
      console.error('Erro ao enviar email de redefinição de senha:', error);
      Alert.alert('Erro ao enviar email de redefinição de senha. Por favor, tente novamente mais tarde.');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style="light" />
        <View style={[styles.containerInput]}>
          <TextInput
            style={[styles.inputDados]}
            keyboardType="email-address"
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={[styles.inputDados]}
            keyboardType="default"
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />

          <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <View style={[styles.containerRedefinir]}>
            <TouchableOpacity onPress={handleResetPasswordPress}>
              <Text style={[styles.linkRedefinir]}>
                Redefinir Senha
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.containerTextLink]}>
            <Link href="/sign" style={[styles.textLink]}>
              CADASTRAR-SE
            </Link>
          </View>
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
    backgroundColor: '#3E4A59',
    alignItems: 'center',
    justifyContent:'space-between',
    flexDirection: 'column',
    marginTop: 100,
    paddingTop: 20,
    paddingBottom: 5,
    borderRadius: 30,
    height: 'auto',
    shadowOffset:{width:5,height:5},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,  
  },
  inputDados: {
    backgroundColor: '#fff',
    height: 40,
    width: '90%',
    borderRadius: 15,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#CACACA',
    color: '#202022',
    fontWeight: 'bold',
    fontSize: 20,
    fontVariant: ['small-caps'],
    marginBottom: 15,
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
    left: 28,
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
    borderRadius: 18,
    marginTop: 15,
    marginBottom: 10,
    width: '90%',
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    shadowOffset:{width:10,height:10},
    shadowOpacity:0.5,
    shadowRadius:10,
    elevation:5,  
    borderWidth: 1,
    borderColor: '#CACACA',
  },
  buttonText: {
    color: '#012030',
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
    fontVariant: ['small-caps'],
  },
  containerTextLink: {
    marginTop: 30,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    padding: 5,
    borderRadius: 10,
  },
  textLink: {
    alignSelf: 'center',
    fontSize: 18,
    color: '#202022',
    fontWeight: 'bold',
    fontVariant: ['small-caps'],
    padding: 4,
  },
});
