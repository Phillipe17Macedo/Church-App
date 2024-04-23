/* eslint-disable prettier/prettier */
import { Stack } from 'expo-router';
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="(tabs)" 
        options={{ 
          headerShown: false,
        }} 
      />
      <Stack.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          headerStyle: {
            backgroundColor: '#3E4A59',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
      <Stack.Screen 
        name='login' 
        options={{
          title: 'Login',
          headerStyle: {
            backgroundColor: '#3E4A59',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }} 
      />
      <Stack.Screen 
        name='sign' 
        options={{
          title: 'Cadastro',
          headerStyle: {
            backgroundColor: '#3E4A59',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
    </Stack>
  );
}
