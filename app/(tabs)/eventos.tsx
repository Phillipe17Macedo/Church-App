/* eslint-disable prettier/prettier */
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import {Agenda, AgendaEntry} from 'react-native-calendars';

export default function Eventos() {
  const items: Record<string, AgendaEntry[]> = {
    '2024-04-25': [{ name: 'Organização  da Equipe para o Encontro com Deus', height: 50, day: '2024-04-25' }],
    '2024-04-26': [{ name: 'PRIMEIRO DIA DE ENCONTRO COM DEUS', height: 50, day: '2024-04-26' }],
    '2024-04-27': [{ name: 'SEGUNDO DIA DE ENCONTRO COM DEUS', height: 50, day: '2024-04-27' }],
  };
  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar style="auto" />
      <Stack.Screen options={{ title: 'Eventos' }} />
      <Agenda
        style={{
          borderRadius: 15,
          marginBottom: 80,
        }}
        items={items}
        renderItem={(item, isFirst) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
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
