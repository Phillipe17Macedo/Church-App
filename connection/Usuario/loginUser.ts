import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

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