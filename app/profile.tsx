import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

export default function Perfil() {
  return (
    <>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  );
}
