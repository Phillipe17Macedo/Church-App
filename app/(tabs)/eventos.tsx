/* eslint-disable prettier/prettier */
import { Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Eventos() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack.Screen options={{ title: 'Eventos' }} />
      <View style={styles.container}>
        <Text> Eventos </Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
