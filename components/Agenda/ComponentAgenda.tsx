import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import {Agenda, AgendaEntry} from 'react-native-calendars';
import { styles } from '../../style/StylesEventos/styles';

export function ComponentAgenda() {
    const items: Record<string, AgendaEntry[]> = {
        '2024-05-08': [{ name: 'Organização  da Equipe para o Encontro com Deus', height: 50, day: '2024-04-25' }],
        '2024-05-09': [{ name: 'PRIMEIRO DIA DE ENCONTRO COM DEUS', height: 50, day: '2024-04-26' }],
        '2024-05-10': [{ name: 'SEGUNDO DIA DE ENCONTRO COM DEUS', height: 50, day: '2024-04-27' }],
      };
  return (
    <>
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
    </>
  );
}