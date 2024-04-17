import { initializeApp } from 'firebase/app';
import { getDatabase, update, ref, set, get, push, DataSnapshot } from 'firebase/database';
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
  usuario: string;
}
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const salvarUsuario = (usuario: Usuario) => {
  const usuariosRef = ref(database, 'usuarios');

  push(usuariosRef)
    .then((newUserRef) => {
      // Obtém o ID único gerado para o novo usuário
      const usuarioId = newUserRef.key;

      // Adiciona o ID único aos dados do usuário
      const usuarioComId = { ...usuario, id: usuarioId };

      // Salva o usuário com o ID no banco de dados
      set(ref(database, `usuarios/${usuarioId}`), usuarioComId)
        .then(() => {
          console.log('Novo usuário adicionado com ID: ', usuarioId);
        })
        .catch((error) => {
          console.error('Erro ao adicionar novo usuário: ', error);
        });
    })
    .catch((error) => {
      console.error('Erro ao gerar ID para novo usuário: ', error);
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
export const buscarDadosDoBanco = async () => {
  try {
    const snapshot: DataSnapshot = await get(ref(database, 'usuarios'));
    const dados: Usuario[] = [];
    snapshot.forEach((childSnapshot) => {
      // Extrair os dados de cada usuário do snapshot
      const usuarioData = childSnapshot.val();
      // Verificar se os dados do usuário estão completos
      if (
        usuarioData &&
        typeof usuarioData === 'object' &&
        'nome' in usuarioData &&
        'telefone' in usuarioData &&
        'endereco' in usuarioData &&
        'email' in usuarioData &&
        'dataNascimento' in usuarioData &&
        'senha' in usuarioData &&
        'usuario' in usuarioData
      ) {
        // Criar um objeto Usuario manualmente a partir dos dados do snapshot
        const usuario: Usuario = {
          id: childSnapshot.key, // Usar a chave do snapshot como ID do usuário
          nome: usuarioData.nome,
          telefone: usuarioData.telefone,
          endereco: usuarioData.endereco,
          email: usuarioData.email,
          dataNascimento: usuarioData,
          senha: usuarioData.senha,
          usuario: usuarioData.usuario,
        };
        dados.push(usuario);
      }
    });
    return dados;
  } catch (error) {
    console.error('Erro ao buscar dados no banco:', error);
    throw error;
  }
};
export default database;
