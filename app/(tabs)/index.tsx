/* eslint-disable prettier/prettier */
import { launchImageLibraryAsync, ImagePickerResult } from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Keyboard,
} from 'react-native';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { salvarEventoNoBanco, removerEventoDoBanco, buscarEventosDoBanco, isAdmin } from '~/utils/firebase';
import ImageEvento from '../../components/ImagemEventos/ImagemEvento';

export default function Home() {
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [eventoItems, setEventoItems] = useState<Evento[]>([]);

  useEffect(() => {
    // Verifica se o usuário é administrador ao carregar a tela
    const checkAdminStatus = async () => {
      const isAdminResult = await isAdmin();
      setIsAdminUser(isAdminResult);
    };
    checkAdminStatus();

    // Busca os eventos do banco de dados ao carregar a tela
    const fetchEventos = async () => {
      try {
        const eventosDoBanco = await buscarEventosDoBanco();
        setEventoItems(eventosDoBanco);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };
    fetchEventos();
  }, []);

  const [tituloEvento, setTituloEvento] = useState('');
  const [dataDoEvento, setDataDoEvento] = useState('');
  const [horarioDoEvento, setHorarioDoEvento] = useState('');

  const handleAddEvento = async () => {
    try {
      let result = await launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [3, 2],
        quality: 1,
      });
      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        const imageName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
        const storage = getStorage(); // Renomeando a variável
        const storageReference = storageRef(storage, `eventos/${imageName}`); // Renomeando a variável
        const imageBlob = await fetch(imageUri).then((response) => response.blob());
        await uploadBytes(storageReference, imageBlob); // Usando a referência renomeada
        
        const downloadURL = await getDownloadURL(storageReference); // Usando a referência renomeada
        const eventoId = await salvarEventoNoBanco(tituloEvento, dataDoEvento, horarioDoEvento, downloadURL);
        const novoEvento = {
          id: eventoId,
          nomeEvento: tituloEvento,
          dataEvento: dataDoEvento,
          horarioEvento: horarioDoEvento,
          imageUri: downloadURL,
        };
        setEventoItems([
          ...eventoItems, 
          novoEvento
        ]);
        setTituloEvento('');
        setDataDoEvento('');
        setHorarioDoEvento('');
      }
    } catch (error) {
      console.error('Erro ao adicionar evento:', error);
    }
    Keyboard.dismiss();
  }

  const completeEvento = async (index: number) => {
    try {
      const eventoToRemove = eventoItems[index];
      if (!eventoToRemove) {
        console.error('O evento não foi encontrado.');
        return;
      }
  
      // Verificar se o usuário é admin
      const isAdminUser = await isAdmin();
      if (!isAdminUser) {
        console.error('Apenas usuários administradores podem remover eventos.');
        return;
      }
  
      // Remover o evento do array local
      const updatedEventoItems = eventoItems.filter((_, i) => i !== index);
      setEventoItems(updatedEventoItems);
  
      // Remover o evento do banco de dados
      await removerEventoDoBanco(eventoToRemove.id);
    } catch (error) {
      console.error('Erro ao remover evento:', error);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
          <View style={[styles.areaEventos]}>

            <View style={[styles.areaContainerEvento]}>
              {
                eventoItems.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => completeEvento(index)}>
                      <ImageEvento 
                        nomeEvento={item.titulo} 
                        dataEvento={item.data}
                        horarioEvento={item.horario}
                        imageUri={item.imagem} 
                        onPress={() => completeEvento(index)} 
                      />
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>        

          {isAdminUser &&(
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={[styles.containerInputNewEvento]}
            >  
              <TextInput 
                style={[styles.inputTextoEvento]} 
                keyboardType='default' 
                placeholder='Nome do Evento' 
                value={tituloEvento} 
                onChangeText={(nomeEvento) => setTituloEvento(nomeEvento)} 
              />
              <TextInput 
                style={[styles.inputTextoEvento]} 
                keyboardType='default' 
                placeholder='Data do Evento' 
                value={dataDoEvento} 
                onChangeText={(dataEvento) => setDataDoEvento(dataEvento)} 
              />
              <TextInput 
                style={[styles.inputTextoEvento]} 
                keyboardType='default' 
                placeholder='Horário do Evento' 
                value={horarioDoEvento} 
                onChangeText={(horarioEvento) => setHorarioDoEvento(horarioEvento)} 
              />
              <TouchableOpacity onPress={() => handleAddEvento()}>
                <View style={[styles.containerIconeAddEvento]}>
                  <Text style={[styles.iconeAddEvento]}>+</Text>
                </View>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040316',
    paddingBottom: 100,
  },
  areaEventos:{
    paddingHorizontal: 25,
  },
  areaContainerEvento: {
    marginTop: 10,
  },
  containerInputNewEvento:{
    flex: 1,
    position: 'relative',
    marginTop: 10,
    width: '85%',
    height: 'auto',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputTextoEvento: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: '100%',
    height: 40,
    marginBottom: 5,
  },
  containerIconeAddEvento: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginBottom: 5,
  },
  iconeAddEvento: {
    fontSize: 30,
    fontWeight: 'normal',
    paddingBottom: 3,
    color: 'gray',
  },
});