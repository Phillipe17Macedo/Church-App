import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
export default function Eventos() {
  return (
    <>
      <Stack.Screen options={{ title: 'Eventos' }} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
