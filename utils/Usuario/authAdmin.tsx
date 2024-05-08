import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, get, update, DataSnapshot } from 'firebase/database';

import { buscarDadosDoBanco } from './buscar';

const firebaseConfig = {
  apiKey: 'AIzaSyCyhMAnKhc2y_2EzP2LyO7-AbVEBjgj2ek',
  authDomain: 'videiraapp.firebaseapp.com',
  databaseURL: 'https://videiraapp-default-rtdb.firebaseio.com',
  projectId: 'videiraapp',
  storageBucket: 'videiraapp.appspot.com',
  messagingSenderId: '348499807286',
  appId: '1:348499807286:web:c9bcbc26c1c9acad9adc97',
  measurementId: 'G-KHDPWMVYNN',
};

interface Usuario {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  email: string;
  dataNascimento: string;
  senha: string;
  funcao: string;
}

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

export const isAdmin = async (): Promise<boolean> => {
    try {
      const userId = await AsyncStorage.getItem('userId'); // Obtém o ID do usuário logado
      if (userId) {
        const usuario = await buscarDadosDoBanco(userId); // Busca os dados do usuário no banco de dados
        if (usuario && usuario.funcao.toLowerCase() === 'admin') {
          return true; // Retorna verdadeiro se o usuário for admin
        } else {
          return false; // Retorna falso se o usuário não for admin
        }
      } else {
        return false; // Retorna falso se não houver nenhum usuário logado
      }
    } catch (error) {
      console.error('Erro ao verificar status de administrador:', error);
      return false; // Retorna falso em caso de erro
    }
  };