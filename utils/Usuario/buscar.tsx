import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, DataSnapshot } from 'firebase/database';

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

export const buscarDadosDoBanco = async (userId: string): Promise<Usuario | null> => {
    try {
      const usuarioRef = ref(database, `usuarios/${userId}`);
      const snapshot: DataSnapshot = await get(usuarioRef);
  
      if (snapshot.exists()) {
        const usuarioData = snapshot.val();
        if (
          usuarioData &&
          typeof usuarioData === 'object' &&
          'nome' in usuarioData &&
          'telefone' in usuarioData &&
          'endereco' in usuarioData &&
          'email' in usuarioData &&
          'dataNascimento' in usuarioData &&
          'senha' in usuarioData &&
          'funcao' in usuarioData
        ) {
          // Criar um objeto Usuario manualmente a partir dos dados do snapshot
          const usuario: Usuario = {
            id: snapshot.key !== null ? snapshot.key : '', // Usar a chave do snapshot como ID do usuário, garantindo que não seja nulo
            nome: usuarioData.nome,
            telefone: usuarioData.telefone,
            endereco: usuarioData.endereco,
            email: usuarioData.email,
            dataNascimento: usuarioData.dataNascimento,
            senha: usuarioData.senha,
            funcao: usuarioData.funcao,
          };
          return usuario;
        }
      }
      return null; // Retorna null se o usuário não foi encontrado ou os dados estão incompletos
    } catch (error) {
      console.error('Erro ao buscar dados no banco:', error);
      throw error;
    }
  };