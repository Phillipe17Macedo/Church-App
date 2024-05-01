/* eslint-disable prettier/prettier */
import { launchImageLibraryAsync, ImagePickerResult } from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
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

import ImageEvento from '../../components/ImagemEventos/ImagemEvento';

export default function Home() {
  const [tituloEvento, setTituloEvento] = useState('');
  const [dataDoEvento, setDataDoEvento] = useState('');
  const [horarioDoEvento, setHorarioDoEvento] = useState('');
  const [eventoItem, setEventoItems] = useState<{ nomeEvento: string; dataEvento: string; horarioEvento: string; imageUri: string }[]>([]);

  const handleAddEvento = async () => {
    let result = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('Informações sobre a Imagem: ',result);
    console.log('Titulo do Evento: ', tituloEvento);
    console.log('Data do Evento: ', dataDoEvento);
    console.log('Horario do Evento: ', horarioDoEvento);
    if (!result.canceled) {
      setEventoItems([
        ...eventoItem, { nomeEvento: tituloEvento, dataEvento: dataDoEvento, horarioEvento: horarioDoEvento, imageUri: result.assets[0].uri }
      ]);
      setTituloEvento('');
      setDataDoEvento('');
      setHorarioDoEvento('');
    }
    Keyboard.dismiss();
  }

  const completeEvento = (index: number) => {
    const itemsCopy = [...eventoItem];
    itemsCopy.splice(index, 1);
    setEventoItems(itemsCopy);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
          <View style={[styles.areaEventos]}>

            <View style={[styles.areaContainerEvento]}>
              {
                eventoItem.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => completeEvento(index)}>
                      <ImageEvento 
                        nomeEvento={item.nomeEvento} 
                        dataEvento={item.dataEvento}
                        horarioEvento={item.horarioEvento}
                        imageUri={item.imageUri} 
                        onPress={() => completeEvento(index)} 
                      />
                    </TouchableOpacity>
                  )
                })
              }
            </View>

          </View>        


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
                keyboardType='phone-pad' 
                placeholder='Data do Evento' 
                value={dataDoEvento} 
                onChangeText={(dataEvento) => setDataDoEvento(dataEvento)} 
              />
              <TextInput 
                style={[styles.inputTextoEvento]} 
                keyboardType='phone-pad' 
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
    width: '90%',
    height: 'auto',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputTextoEvento: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
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
