/* eslint-disable prettier/prettier */
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import {Agenda} from 'react-native-calendars';

export default function Eventos() {
  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar style="auto" />
      <Stack.Screen options={{ title: 'Eventos' }} />
      <Agenda
        style={{
          borderRadius: 15,
          marginBottom: 80,
        }}
        items={{
          '2024-04-23': [{name: 'CURSO DE MATURIDADE NO ESPIRÍTO', data:'Das 19h15 às 21h30'}],
          '2024-04-24': [{name: 'CÉLULAS DE ADULTOS E CRIANÇAS', data:'Às 20h00'}],
          '2024-04-25': [{name: 'VISITAS PARA OS CONVIDADOS DO ENCONTRO', data:'Às 19h00'}],
          '2024-04-26': [{name: 'ORGANIZAÇÃO E PREPARAÇÃO DA ESTRUTURA DO ENCONTRO COM DEUS', data:'Às 19h00'}],
          '2024-04-27': [{name: 'ENCONTRO COM DEUS', data:'O dia todo'}],
          '2024-04-28': [{name: 'ENCONTRO COM DEUS, ', data:'Até às 15h30'}],
        }}
        renderItem={(item, isFirst) => (
          <TouchableOpacity style={[styles.item]}>
            <Text style={[styles.itemText]}>{item.name}</Text>
            <Text style={[styles.itemText]}>{item.data}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#040316',
  },
  item: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#CACACA',
    marginTop: 15,
    marginRight: 10,
    textAlign: 'justify',
    padding: 8,
    marginBottom: 15,
  },
  itemText: {
    color: '#202022',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
