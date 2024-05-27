/* eslint-disable @typescript-eslint/no-unused-vars *//* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { signOut } from '../utils/Usuario/signUser';
import { buscarDadosDoBanco } from '@/utils/Usuario/buscar';
import { atualizarDadosNoBanco } from '@/utils/Usuario/editar';
import { styles } from '../style/StylesPerfil/styles';

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
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    verificarUsuarioLogado();
  }, []);

  const verificarUsuarioLogado = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const usuario = await buscarDadosDoBanco(userId);
        if (usuario) {
          setUsuario(usuario);
          setLogado(true);
        } else {
          setUsuario(null);
          setLogado(false);
        }
      } else {
        setUsuario(null);
        setLogado(false);
      }
      console.log('Usuario está:', logado); // Adicionando mensagem de console para depuração
    } catch (error) {
      console.error('Erro ao verificar se o usuário está logado:', error);
      setUsuario(null);
      setLogado(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setLogado(false);
      limparCampos();
      Alert.alert('Logout realizado com sucesso.');
      console.log('Logout realizado com Sucesso.');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro ao fazer logout.');
    }
  };

  const limparCampos = () => {
    setNome('');
    setTelefone('');
    setEndereco('');
    setEmail('');
    setDataNascimento('');
    setSenha('');
    setFuncao('');
  };

  const handleEditPress = () => {
    setEditMode(true);
  };

  const handleSavePress = () => {
    setEditMode(false);
    if (!usuario) {
      console.error('Usuário não encontrado para atualização.');
      return;
    }
  
    const novosDados = { 
      id: usuario.id,
      nome: nome || usuario.nome,
      telefone: telefone || usuario.telefone,
      endereco: endereco || usuario.endereco,
      email: email || usuario.email,
      dataNascimento: dataNascimento || usuario.dataNascimento,
      senha: senha || usuario.senha,
      funcao: funcao || usuario.funcao,
    };
  
    atualizarDadosNoBanco(usuario.id, novosDados)
      .then(() => {
        console.log('Dados do usuário atualizados com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao atualizar dados do usuário:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style="light" />
        <View style={[styles.containerInput]}>
          <View style={[styles.containerTitulo]}>
            <Text style={[styles.titulo]}>
              DADOS PESSOAIS
            </Text>
          </View>
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
            keyboardType="default"
            placeholder="Data de Nascimento"
            editable={editMode}
            value={usuario ? usuario.dataNascimento : ''}
            onChangeText={(text) => setUsuario(usuario ? { ...usuario, dataNascimento: text } : null)}
          />

          <View style={[styles.containerButton]}>
            {editMode ? (
              <TouchableOpacity style={styles.button} onPress={handleSavePress}>
                <Text style={styles.buttonText}>SALVAR</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleEditPress}>
                <Text style={styles.buttonText}>EDITAR</Text>
              </TouchableOpacity>
            )}

            {!logado ? (
              <TouchableOpacity style={[styles.button]} >
                <Link href='/login'style={[styles.buttonText]}>LOGIN</Link>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[styles.button]} onPress={handleLogout} >
                <Text style={[styles.buttonText]}>SAIR</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={[styles.containerTextLink]}>
            <Link href="/sign" style={[styles.textLink]} >CADASTRAR-SE</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}