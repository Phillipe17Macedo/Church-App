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
  funcao: string;
}
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const loginUsuario = async (nomeUsuario: string, senha: string): Promise<Usuario | null> => {
  const usuariosRef = ref(database, 'usuarios');
  try {
    const snapshot = await get(usuariosRef);
    let usuarioEncontrado: Usuario | null = null; // Inicializa como null
    snapshot.forEach((childSnapshot) => {
      const usuario = childSnapshot.val();
      if (usuario && usuario.nome === nomeUsuario && usuario.senha === senha) {
        // Verifica se o usuário não é nulo e se as credenciais correspondem
        console.log('Usuário logado com sucesso:', usuario);
        usuarioEncontrado = {
          id: childSnapshot.key,
          ...usuario,
        }; // Define o usuário encontrado
      }
    });
    return usuarioEncontrado; // Retorna o usuário encontrado ou null se não encontrou
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw new Error('Erro ao fazer login'); // Lança o erro para que ele possa ser tratado em outro lugar
  }
};

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
export const buscarDadosDoBanco = async (userId: string): Promise<Usuario | null> => {
  try {
    const snapshot: DataSnapshot = await get(ref(database, `usuarios/${userId}`));
    const usuarioData = snapshot.val();
    // Verificar se os dados do usuário estão completos e se o usuário foi encontrado
    if (
      snapshot.exists() &&
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
        id: snapshot.key, // Usar a chave do snapshot como ID do usuário
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
    return null; // Retorna null se o usuário não foi encontrado ou os dados estão incompletos
  } catch (error) {
    console.error('Erro ao buscar dados no banco:', error);
    throw error;
  }
};

export default database;
