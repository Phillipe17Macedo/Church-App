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
  Image,
  Button,
} from 'react-native';

import ImageEvento from '../../components/ImagemEventos/ImagemEvento';

export default function Home() {
  const [evento, setEvento] = useState('');
  const [eventoItem, setEventoItems] = useState<{ text: string; imageUri: string }[]>([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleAddEvento = async () => {
    let result = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('Informações sobre a Imagem: ',result);
    console.log('Texto do Evento: ', evento);
    if (!result.canceled) {
      setEventoItems([...eventoItem, { text: evento, imageUri: result.assets[0].uri }]);
      setEvento('');
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
                      <ImageEvento text={item.text} imageUri={item.imageUri} onPress={() => completeEvento(index)} />
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
                placeholder='Escreva o Evento' 
                value={evento} 
                onChangeText={(text) => setEvento(text)} 
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
  },
  areaEventos:{
    paddingHorizontal: 20,
  },
  areaContainerEvento: {
    marginTop: 80,
  },
  containerInputNewEvento:{
    flex: 1,
    position: 'absolute',
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputTextoEvento: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  containerIconeAddEvento: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  iconeAddEvento: {
    fontSize: 40,
    fontWeight: 'normal',
    paddingBottom: 3,
    color: 'gray',
  },
});
