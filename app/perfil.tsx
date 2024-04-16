import { StatusBar } from 'expo-status-bar';
import { Platform, View, Text} from 'react-native';

export default function Perfil() {
  return (
    <>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View>
        <Text>Tela Perfil</Text>
      </View>
    </>
  );
}
