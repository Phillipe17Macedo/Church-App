/* eslint-disable prettier/prettier */
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
} from 'react-native';

import Evento from '../../components/Event';

export default function Home() {
  const [evento, setEvento] = useState();

  const handleAddEvento = () => {
    console.log(evento);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={[styles.containerEvento]}>
      <View style={[styles.items]}>
          <Evento text="Evento número 1"/>
          <Evento text="Evento número 2"/>
        </View>
      </View>        


        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[styles.inputAddEvento]}>
            <TextInput style={[styles.input]} placeholder='Escreva o Evento' />
            <TouchableOpacity>
              <View style={[styles.addEvento]}>
                <Text style={[styles.addTexto]}>+</Text>
              </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
      <ScrollView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040316',
  },
  containerEvento:{
    paddingHorizontal: 20,
  },
  items: {
    marginTop: 30,
  },
  inputAddEvento:{
    position: 'absolute',
    bottom: 110,
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
  },
  addEvento: {
    width: 60,
    height: 60,
    backgroundColor: 'red',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addTexto: {
    
  },
  content: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '85%',
    height: 200,
    marginBottom: 20,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    overflow: 'hidden',
  },
  containerEventos: {
    position: 'relative',
    width: '100%',
    height: '65.08%',
    textAlign: 'center',
    bottom: 35,
  },
  images: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    position: 'absolute',
    top: 130,
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#3E4A59',
    paddingTop: 10,
    paddingLeft: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textOne: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textTwo: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 14,
  },
  textThree: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 14,
  },
  category: {
    marginBottom: 20,
    width: '85%',
    height: 'auto',
    alignSelf: 'center',
  },
  textCategory: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 21,
  },
    editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#3E4A59',
    padding: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButtonContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '85%',
    padding:3,
    borderRadius: 10,
    backgroundColor: 'gray',
  },
});