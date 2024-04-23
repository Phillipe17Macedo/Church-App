/* eslint-disable @typescript-eslint/no-unused-vars *//* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
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
} from 'react-native';

import { salvarUsuario, buscarDadosDoBanco } from '../utils/firebase';

interface Usuario {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  email: string;
  dataNascimento: string;
  senha: string;
  funcao: string;
}

export default function Perfil() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [funcao, setFuncao] = useState('');
  
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    buscarDadosUsuario(); // Buscar os dados do usuário ao abrir a tela de perfil
  }, []);
  
  const buscarDadosUsuario = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      console.log('ID do usuário recuperado:', userId); // Adiciona este log
      if (userId) {
        const usuario = await buscarDadosDoBanco(userId);
        if (usuario) {
          console.log('Dados do usuário encontrados:', usuario); // Adiciona este log
          setUsuario(usuario);
        } else {
          console.log('Usuário não encontrado no banco de dados.');
        }
      } else {
        console.log('ID do usuário não encontrado no AsyncStorage.');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };
  const handleEditPress = () => {
    setEditMode(true);
  };
  const handleSavePress = () => {
    setEditMode(false);
    const novoUsuario = {
      id: usuario?.id || '',
      nome,
      telefone,
      endereco,
      email,
      dataNascimento,
      senha,
      funcao,
    };

    salvarUsuario(novoUsuario);
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
            editable={editMode}
            value={usuario ? usuario.nome : ''}
            onChangeText={(text) => setUsuario(usuario ? { ...usuario, nome: text } : null)}
          />
          <TextInput
            style={[styles.inputDados]}
            keyboardType="phone-pad"
            placeholder="Telefone"
            editable={editMode}
            value={usuario ? usuario.telefone : ''}
            onChangeText={(text) => setUsuario(usuario ? { ...usuario, telefone: text } : null)}
          />
          <TextInput
            style={[styles.inputDados]}
            keyboardType="default"
            placeholder="Endereço"
            editable={editMode}
            value={usuario ? usuario.endereco : ''}
            onChangeText={(text) => setUsuario(usuario ? { ...usuario, endereco: text } : null)}
          />
          <TextInput
            style={[styles.inputDados]}
            keyboardType="email-address"
            placeholder="Email"
            editable={editMode}
            value={usuario ? usuario.email : ''}
            onChangeText={(text) => setUsuario(usuario ? { ...usuario, email: text } : null)}
          />
          <TextInput
            style={[styles.inputDados]}
            keyboardType="decimal-pad"
            placeholder="Data de Nascimento"
            editable={editMode}
            value={usuario ? usuario.dataNascimento : ''}
            onChangeText={(text) => setUsuario(usuario ? { ...usuario, dataNascimento: text } : null)}
          />
          <TextInput
            style={[styles.inputDados]}
            keyboardType="visible-password"
            placeholder="Senha"
            editable={editMode}
            value={usuario ? usuario.senha : ''}
            onChangeText={(text) => setUsuario(usuario ? { ...usuario, senha: text } : null)}
          />
          <TextInput
            style={[styles.inputDados]}
            keyboardType="default"
            placeholder="Função"
            editable={editMode}
            value={usuario ? usuario.funcao : ''}
            onChangeText={(text) => setUsuario(usuario ? { ...usuario, funcao: text } : null)}
          />
        </View>

        {editMode ? (
          <TouchableOpacity style={styles.button} onPress={handleSavePress}>
            <Text style={styles.buttonText}>SALVAR</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleEditPress}>
            <Text style={styles.buttonText}>EDITAR</Text>
          </TouchableOpacity>
        )}

        <View style={[styles.containerTextLink]}>
          <Link href="/login" style={[styles.textLink]}>LOGIN</Link>
          <Link href="/sign" style={[styles.textLink]} >CADASTRAR-SE</Link>
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
    justifyContent:'space-between',
    flexDirection: 'column',
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 5,
    borderRadius: 20,
    height: 'auto',
    shadowOffset:{width:5,height:5},
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
    shadowOffset:{width:10,height:10},
    shadowOpacity:0.5,
    shadowRadius:10,
    elevation:5,  
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
    fontSize: 17,
    textAlign: 'center',
    fontVariant: ['small-caps'],
  },
  containerTextLink:{
    marginBottom: 20,
    justifyContent: 'space-between',
    flexDirection:'column',
  },
  textLink: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    fontVariant:  ['small-caps'],
    padding: 4,
  },
});
