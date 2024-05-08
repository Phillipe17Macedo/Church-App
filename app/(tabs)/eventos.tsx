/* eslint-disable prettier/prettier */
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView, View } from 'react-native';
import {Agenda, AgendaEntry} from 'react-native-calendars';

import { styles } from '../../style/StylesEventos/styles';

export default function Eventos() {
  const items: Record<string, AgendaEntry[]> = {
    '2024-05-08': [{ name: 'Organização  da Equipe para o Encontro com Deus', height: 50, day: '2024-04-25' }],
    '2024-05-09': [{ name: 'PRIMEIRO DIA DE ENCONTRO COM DEUS', height: 50, day: '2024-04-26' }],
    '2024-05-10': [{ name: 'SEGUNDO DIA DE ENCONTRO COM DEUS', height: 50, day: '2024-04-27' }],
  };
  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar style="light" />
      <Stack.Screen options={{ title: 'Eventos' }} 
      />

        <View style={[{backgroundColor: '#3E4A59',}, {alignItems: 'center'}, {marginTop: 25},{marginBottom: 20}, {width: '100%'}, {justifyContent: 'center'}, {alignSelf: 'center'}, {borderRadius: 10}]}>
          <Text style={[{fontSize: 21}, {paddingHorizontal: 2}, {paddingVertical: 3}, {color: '#fff'}, {textAlign: 'justify'}]}>
            ESTA TELA SERÁ LANÇADA EM BREVE COM SUAS FUNCIONALIDADES
          </Text>
        </View>

      <Agenda
        style={{
          borderRadius: 15,
          marginBottom: 100,
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
