/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { styles } from '../style/StylesLogin/styles';

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

