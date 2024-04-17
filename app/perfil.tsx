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

export default function Perfil() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [usuario, setUsuario] = useState('');

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
      telefone,
      email,
      senha,
      usuario,
    };

    salvarUsuario(novoUsuario);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        <View>
          <Text>Tela Perfil</Text>
        </View>
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
          keyboardType="visible-password"
          placeholder="Senha"
          value={senha}
          onChangeText={(text) => setSenha(text)}
        />
        <TextInput
          style={[styles.inputDados]}
          keyboardType="default"
          placeholder="Função"
          editable={editMode}
          value={usuario}
          onChangeText={(text) => setUsuario(text)}
        />
        {editMode ? (
          <TouchableOpacity style={styles.button} onPress={handleSavePress}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleEditPress}>
            <Text style={styles.buttonText}>Editar Dados Pessoais</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#040316',
  },
  inputDados: {
    backgroundColor: '#fff',
    height: 35,
    borderRadius: 10,
    paddingLeft: 10,
    borderWidth: 3,
    borderColor: 'lightgreen',
    color: '#161F30',
    fontWeight: 'bold',
    fontSize: 18,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3E4A59',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});
