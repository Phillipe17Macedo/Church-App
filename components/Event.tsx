/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
const Task = (props: any) => {
  return (
    <View style={[styles.item]}>
      <View style={[styles.itemLeft]}>
        <TouchableOpacity style={[styles.containerEvento]} />
        <Text style={[styles.itemText]}>{props.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerEvento: {
    width: 30,
    height: 30,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    opacity: 0.4,
    marginRight: 15,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default Task;
