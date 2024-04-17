/* eslint-disable prettier/prettier */
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
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
} from 'react-native';

import { salvarUsuario } from '../utils/firebase';

export default function Login() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  const gerarID = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  };

  const [editMode, setEditMode] = useState(false);
  const handleEditPress = () => {
    setEditMode(true);
  };
  const handleSavePress = () => {
    setEditMode(false);
    const novoUsuario = {
      id: gerarID(),
      nome,
      senha,
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
            keyboardType="visible-password"
            placeholder="Senha"
            editable={editMode}
            value={senha}
            onChangeText={(text) => setSenha(text)}
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
    marginTop: 50,
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
