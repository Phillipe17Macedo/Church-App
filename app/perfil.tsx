/* eslint-disable prettier/prettier */
import { Link, useRouter } from 'expo-router';
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

import { salvarUsuario } from '../utils/firebase';

export default function Perfil() {
  const router = useRouter();
  const route = router.route;
  const usuario = route ? route.params.usuario : {};

  const [nome, setNome] = useState(usuario.nome || '');
  const [telefone, setTelefone] = useState(usuario.telefone || '');
  const [endereco, setEndereco] = useState(usuario.endereco || '');
  const [email, setEmail] = useState(usuario.email || '');
  const [dataNascimento, setDataNascimento] = useState(usuario.dataNascimento || '');
  const [senha, setSenha] = useState(usuario.senha || '');
  const [funcao, setFuncao] = useState(usuario.funcao || '');
  
  const [editMode, setEditMode] = useState(false);
  const handleEditPress = () => {
    setEditMode(true);
  };
  const handleSavePress = () => {
    setEditMode(false);
    const novoUsuario = {
      id: usuario.id,
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
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
          <TextInput
            style={[styles.inputDados]}
            keyboardType="phone-pad"
            placeholder="WhatsApp"
            editable={editMode}
            value={telefone}
            onChangeText={(text) => setTelefone(text)}
          />
          <TextInput
            style={[styles.inputDados]}
            keyboardType="default"
            placeholder="Endereço"
            editable={editMode}
            value={endereco}
            onChangeText={(text) => setEndereco(text)}
          />
          <TextInput
            style={[styles.inputDados]}
            keyboardType="email-address"
            placeholder="Email"
            editable={editMode}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={[styles.inputDados]}
            keyboardType="decimal-pad"
            placeholder="Data de Nascimento"
            editable={editMode}
            value={dataNascimento}
            onChangeText={(text) => setDataNascimento(text)}
          />
          <TextInput
            style={[styles.inputDados]}
            keyboardType="visible-password"
            placeholder="Senha"
            editable={editMode}
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />
          <TextInput
            style={[styles.inputDados]}
            keyboardType="default"
            placeholder="Função"
            editable={editMode}
            value={funcao}
            onChangeText={(text) => setFuncao(text)}
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
