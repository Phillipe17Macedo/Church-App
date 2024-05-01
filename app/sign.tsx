/* eslint-disable prettier/prettier */
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
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

import { salvarUsuario } from '../utils/firebase';

export default function Sign() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [funcao, setFuncao] = useState('');

  const auth = getAuth(); // Obtendo a instância de autenticação do Firebase

  const handleSavePress = () => {
    // Verificar se todos os campos foram preenchidos
    if (!nome || !telefone || !endereco || !email || !dataNascimento || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Verificar se o email é válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um endereço de email válido.');
      return;
    }

    // Registrar o novo usuário no Firebase Authentication
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        // Novo usuário registrado com sucesso
        const user = userCredential.user;
        // Salvar os dados do usuário no Realtime Database
        const novoUsuario = {
          id: user.uid, // Usar o UID gerado pelo Firebase como ID do usuário
          nome,
          telefone,
          endereco,
          email,
          dataNascimento,
          senha,
          funcao,
        };
        salvarUsuario(novoUsuario);
        // Limpar os campos após salvar o usuário
        setNome('');
        setTelefone('');
        setEndereco('');
        setEmail('');
        setDataNascimento('');
        setSenha('');
        setFuncao('');
        // Mostrar uma mensagem de sucesso
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso.');
      })
      .catch((error) => {
        // Ocorreu um erro ao registrar o usuário
        const errorMessage = error.message;
        Alert.alert('Erro', errorMessage);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        <View style={[styles.containerInput]}>
          <TextInput
            style={[styles.inputDados]}
            keyboardType="default"
            placeholder="Nome"
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
          <TextInput
            style={[styles.inputDados]}
            keyboardType="phone-pad"
            placeholder="WhatsApp"
            value={telefone}
            onChangeText={(text) => setTelefone(text)}
          />
          <TextInput
            style={[styles.inputDados]}
            keyboardType="default"
            placeholder="Endereço"
            value={endereco}
            onChangeText={(text) => setEndereco(text)}
          />
          <TextInput
            style={[styles.inputDados]}
            keyboardType="email-address"
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={[styles.inputDados]}
            keyboardType="decimal-pad"
            placeholder="Data de Nascimento"
            value={dataNascimento}
            onChangeText={(text) => setDataNascimento(text)}
          />
          <TextInput
            style={[styles.inputDados]}
            keyboardType="visible-password"
            placeholder="Senha"
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />
        <TouchableOpacity style={styles.button} onPress={handleSavePress}>
          <Text style={styles.buttonText}>SALVAR</Text>
        </TouchableOpacity>

        <View style={[styles.containerTextLink]}>
          <Link href="/login" style={[styles.textLink]}>
            LOGIN
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
    backgroundColor: '#878787',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: 20,
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
    width: 130,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    padding: 5,
    borderRadius: 13,
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
