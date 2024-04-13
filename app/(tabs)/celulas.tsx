import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Celulas() {
  return (
    <>
      <Stack.Screen options={{ title: 'Células' }} />
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
