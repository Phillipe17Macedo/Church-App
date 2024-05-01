/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const ImagemEvento = (props: any) => {
  const { text, imageUri, onPress } = props;
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
            <Text style={[styles.textoEvento]}>{text}</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  containerEvento: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 245,
    marginTop: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  containerImagemEvento: {
    width: '100%',
    height: '69.5%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  imagemEvento: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  containerTextoEvento: {
    position: 'absolute',
    top: 170,
    width: '100%',
    height: 75,
    backgroundColor: '#3E4A59',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textoEvento: {
    textAlign: 'justify',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    padding: 10,
  },
});
export default ImagemEvento;