import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';

export default function OptionsMore() {
  return (
    <View style={styles.container}>
        <TouchableOpacity>
            <Text style={[{color: 'black', padding: 5, backgroundColor: 'lightgray', marginBottom: 10,}]}>Dizímos & Ofertas</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={[{color: 'black', padding: 5, backgroundColor: 'lightgray', marginBottom: 10,}]}>Palavras</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={[{color: 'black', padding: 5, backgroundColor: 'lightgray', marginBottom: 10,}]}>Bíblia</Text>
        </TouchableOpacity>
    </View>
  );
}