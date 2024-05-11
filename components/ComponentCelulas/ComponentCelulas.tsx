import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import { styles } from '../ComponentCelulas/styles';

const ComponentCelulas = (props: any) => {
    const { nomeCelula, diaCelula, horarioCelula, enderecoCelula, imageUri, onPress } = props;
    console.log('Nome da Célula: ', nomeCelula);
    console.log('Dia da Célula: ', diaCelula);
    console.log('Horario da Célula: ', horarioCelula);
    console.log('Endereço da Célula: ', enderecoCelula);
    console.log('Endereço da Imagem da Célula: ', imageUri);
    return (
        <View style={[styles.containerCelula]}>
            <View style={[styles.containerImagemCelula]}>
                <TouchableOpacity onPress={onPress}>
                    {imageUri ? (
                        <Image source={{uri: imageUri}} style={[styles.imagemCelula]} />
                    ) : (
                        <Image source={require('../../assets/img/RL/Jesus.jpeg')} style={[styles.imagemCelula]} />
                    )}
                    <View style={[styles.containerTextoCelula]} >
                        <Text style={[styles.textoNomeCelula]} >{nomeCelula}</Text>
                        <Text style={[styles.textoDiaCelula]} >{diaCelula}</Text>
                        <Text style={[styles.textoHorarioCelula]} >{horarioCelula}</Text>
                        <Text style={[styles.textoEnderecoCelula]} ></Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default ComponentCelulas;