/* eslint-disable prettier/prettier */
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView } from 'react-native';

import { styles } from '../../style/StylesMore/styles'
import OptionsMore from '@/components/OptionsScreebMore/OptionsMore';

export default function More() {
  return (
    <ScrollView style={styles.container} >
      <StatusBar style="light" />
      <Stack.Screen options={{ title: 'Mais' }} 
      />
        <View style={[{backgroundColor: '#3E4A59',}, {alignItems: 'center'}, {marginTop: 25},{marginBottom: 20}, {width: '100%'}, {justifyContent: 'center'}, {alignSelf: 'center'}, {borderRadius: 10}]}>
          <Text style={[{fontSize: 21}, {paddingHorizontal: 2}, {paddingVertical: 3}, {color: '#fff'}, {textAlign: 'justify'}]}>
            ESTA TELA SERÁ LANÇADA EM BREVE COM SUAS FUNCIONALIDADES
          </Text>
        </View>

        <OptionsMore/>

    </ScrollView>
  );
}