/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import { styles } from '../../components/ComponentEventos/styles'

const ComponentEventos = (props: any) => {
  const { nomeEvento, dataEvento, horarioEvento, imageUri, onPress } = props;
  console.log("Nome do Evento: ", nomeEvento);
  console.log("Data do Evento: ", dataEvento);
  console.log("Hora do Evento: ", horarioEvento);
  console.log("Endereço da Imagem: ", imageUri);
  return (
    <View style={[styles.containerEvento]}>
      <View style={[styles.containerImagemEvento]}>
        <TouchableOpacity onPress={onPress}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={[styles.imagemEvento]} />
          ) : (
            <Image source={require('../../assets/img/RL/Jesus.jpeg')} style={[styles.imagemEvento]} />
          )}
          <View style={[styles.containerTextoEvento]}>
            <Text style={[styles.textoTituloEvento]}>{nomeEvento}</Text>
            <Text style={[styles.textoDataEvento]}>{dataEvento}</Text>
            <Text style={[styles.textoHorarioEvento]}>{horarioEvento}</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
};
export default ComponentEventos;