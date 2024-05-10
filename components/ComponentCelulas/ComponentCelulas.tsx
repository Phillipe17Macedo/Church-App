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
        <View >
            <View>
                <TouchableOpacity>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default ComponentCelulas;