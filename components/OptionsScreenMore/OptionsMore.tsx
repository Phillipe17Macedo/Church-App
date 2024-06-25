import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';

export default function OptionsMore() {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={[styles.constainerOpcoes]}>
            <Text style={[styles.textoOpcoes]}>Dizímos & Ofertas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.constainerOpcoes]} >
            <Text style={[styles.textoOpcoes]} >Palavras</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.constainerOpcoes]} >
            <Text style={[styles.textoOpcoes]} >Bíblia</Text>
        </TouchableOpacity>
    </View>
  );
}