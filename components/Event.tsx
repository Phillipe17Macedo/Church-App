/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const Event = ({ text, imageUri, onPress }) => {
  return (
    <View style={[styles.item]}>
      <View style={[styles.containerEvento]}>
        <TouchableOpacity onPress={onPress}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={[styles.images]} />
          ) : (
            <Image source={require('../assets/img/RL/Jesus.jpeg')} style={[styles.images]} />
          )}
          <View style={[styles.textContainer]}>
            <Text style={[styles.itemText]}>{text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#3E4A59',
    borderRadius: 10,
    height: 250,
    marginTop: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  itemLeft: {
  },
  containerEvento: {
    width: '100%',
    height: '68%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden',
  },
  textContainer: {
    position: 'absolute',
    top: 170,
    width: '100%',
    height: 80,
    backgroundColor: '#3E4A59',
    paddingTop: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  itemText: {
    textAlign: 'justify',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    padding: 10,
  },
  images: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
export default Event;
