/* eslint-disable @typescript-eslint/no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, push, set, get, update, DataSnapshot } from 'firebase/database';
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
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
interface Evento {
  id: string;
  titulo: string;
  data: string;
  horario: string;
  imagem: string;
}
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

export const loginUsuario = async (nomeUsuario: string, senha: string): Promise<Usuario | null> => {
  const usuariosRef = ref(database, 'usuarios');
  try {
    const snapshot = await get(usuariosRef);
    let usuarioEncontrado: Usuario | null = null; // Inicializa como null
    snapshot.forEach((childSnapshot) => {
      const usuario = childSnapshot.val();
      const usuarioNome = usuario.nome.trim().toLowerCase(); // Normaliza e remove espaços em branco
      const usuarioSenha = usuario.senha.trim(); // Remove espaços em branco
      if (usuarioNome === nomeUsuario.trim().toLowerCase() && usuarioSenha === senha.trim()) {
        // Verifica se o usuário não é nulo e se as credenciais correspondem
        console.log('Usuário logado com sucesso:', usuario);
        usuarioEncontrado = {
          id: childSnapshot.key,
          ...usuario,
        }; // Define o usuário encontrado
      }
    });
    if (!usuarioEncontrado) {
      console.log('Nenhum usuário encontrado para as credenciais fornecidas.');
    }
    return usuarioEncontrado; // Retorna o usuário encontrado ou null se não encontrou
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw new Error('Erro ao fazer login'); // Lança o erro para que ele possa ser tratado em outro lugar
  }
};

export const signOut = async () => {
  try {
    await auth.signOut(); // Função de logout do Firebase Authentication
  } catch (error) {
    throw error;
  }
};

export const salvarUsuario = (usuario: Usuario) => {
  // Usar o UID do usuário como ID no Realtime Database
  const usuarioRef = ref(database, `usuarios/${usuario.id}`);

  // Salvar os dados do usuário no Realtime Database
  set(usuarioRef, usuario)
    .then(() => {
      console.log('Usuário cadastrado com sucesso:', usuario);
    })
    .catch((error) => {
      console.error('Erro ao cadastrar usuário:', error);
    });
};

export const atualizarDadosNoBanco = async (usuarioId: string, novosDados: Usuario) => {
  try {
    await update(ref(database, `usuarios/${usuarioId}`), novosDados);
    console.log('Dados do usuário atualizados com sucesso.');
  } catch (error) {
    console.error('Erro ao atualizar dados do usuário:', error);
    throw error;
  }
};
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
export const buscarEventosDoBanco = async (): Promise<Evento[]> => {
  try {
    const eventosRef = ref(database, 'eventos');
    const snapshot: DataSnapshot = await get(eventosRef);
    const eventos: Evento[] = [];

    snapshot.forEach((childSnapshot) => {
      const eventoData = childSnapshot.val();
      const evento: Evento = {
        id: childSnapshot.key !== null ? childSnapshot.key : '',
        titulo: eventoData.titulo,
        data: eventoData.data,
        horario: eventoData.horario,
        imagem: eventoData.imagem,
      };
      eventos.push(evento);
    });

    return eventos;
  } catch (error) {
    console.error('Erro ao buscar eventos no banco:', error);
    throw error;
  }
};
export const isAdmin = async (): Promise<boolean> => {
  try {
    const userId = await AsyncStorage.getItem('userId'); // Obtém o ID do usuário logado
    if (userId) {
      const usuario = await buscarDadosDoBanco(userId); // Busca os dados do usuário no banco de dados
      if (usuario && usuario.funcao === 'admin') {
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
export const salvarEventoNoBanco = async (
  titulo: string,
  data: string,
  horario: string,
  imagem: string
) => {
  try {
    // Referência para o nó 'eventos' no banco de dados
    const eventosRef = ref(database, 'eventos');

    // Cria um novo nó para o evento com um ID único gerado automaticamente
    const novoEventoRef = push(eventosRef);

    // Define os dados do evento
    await set(novoEventoRef, {
      titulo,
      data,
      horario,
      imagem,
    });

    console.log('Evento salvo com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar evento:', error);
    throw error;
  }
};
export const editarEventoNoBanco = async (eventoId: string, novosDados: Evento) => {
  try {
    const eventoRef = ref(database, `eventos/${eventoId}`);
    await update(eventoRef, novosDados);
    console.log('Dados do evento atualizados com sucesso!');
  } catch (error) {
    console.error('Erro ao editar dados do evento:', error);
    throw error;
  }
};
export default database;
