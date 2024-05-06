/* eslint-disable prettier/prettier */
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';

export default function More() {
  return (
    <>
      <StatusBar style="light" />
      <Stack.Screen options={{ title: 'Mais' }} />
      <View style={styles.container} >
        <View style={[{backgroundColor: '#3E4A59',}, {alignItems: 'center'}, {marginTop: 25},{marginBottom: 20}, {width: '100%'}, {justifyContent: 'center'}, {alignSelf: 'center'}, {borderRadius: 10}]}>
          <Text style={[{fontSize: 21}, {paddingHorizontal: 2}, {paddingVertical: 3}, {color: '#fff'}, {textAlign: 'justify'}]}>
            ESTÁ TELA SERÁ LANÇADA EM BREVE COM SUAS FUNCIONALIDADES
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040316',
    paddingHorizontal: 25,
  },
});
