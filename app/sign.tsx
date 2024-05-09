/* eslint-disable prettier/prettier */
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
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

import { salvarUsuario } from '../utils/Usuario/salvar';
import { styles } from '../style/StylesSign/styles';

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
      <StatusBar style="light" />
      <ScrollView>
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
            keyboardType="default"
            placeholder="Data de Nascimento"
            value={dataNascimento}
            onChangeText={(text) => setDataNascimento(text)}
          />
          <TextInput
            style={[styles.inputDados]}
            keyboardType="visible-password"
            placeholder="Senha"
            secureTextEntry
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
