import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { styles } from '../ComponentCelulas/styles';

const ComponentCelulas = ({ nomeCelula, dataCelula, horarioCelula, enderecoCelula, imageUri, onPress }) => {
  return (
    <View style={[styles.containerCelula]}>
      <View style={[styles.containerImagemCelula]}>
        <TouchableOpacity onPress={onPress}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={[styles.imagemCelula]} />
          ) : (
            <Image source={require('../../assets/img/RL/Jesus.jpeg')} style={[styles.imagemCelula]} />
          )}
          <View style={[styles.containerTextoCelula]}>
            <Text style={[styles.textoNomeCelula]}>{nomeCelula}</Text>
            <Text style={[styles.textoDiaCelula]}>{dataCelula}</Text>
            <Text style={[styles.textoHorarioCelula]}>{horarioCelula}</Text>
            <Text style={[styles.textoEnderecoCelula]}>{enderecoCelula}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ComponentCelulas;
