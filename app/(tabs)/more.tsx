/* eslint-disable prettier/prettier */
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';


export default function More() {
  return (
    <>
      <Stack.Screen options={{ title: 'Mais' }} />
      <View style={styles.container} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
