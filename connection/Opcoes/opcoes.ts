import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  set,
  get,
  update,
  remove,
} from "firebase/database";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCyhMAnKhc2y_2EzP2LyO7-AbVEBjgj2ek",
  authDomain: "videiraapp.firebaseapp.com",
  databaseURL: "https://videiraapp-default-rtdb.firebaseio.com",
  projectId: "videiraapp",
  storageBucket: "videiraapp.appspot.com",
  messagingSenderId: "348499807286",
  appId: "1:348499807286:web:c9bcbc26c1c9acad9adc97",
  measurementId: "G-KHDPWMVYNN",
};

// Inicialização do Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

// Interface para a tabela "Opcoes"
interface Opcao {
  id?: string;
  nomeOpcao: string;
  url: string;
  dataCadastro: string;
}

// Método para criar uma nova opção
export const criarOpcao = async (opcao: Omit<Opcao, "id">): Promise<void> => {
  try {
    const opcoesRef = ref(database, "opcoes");
    const novaOpcaoRef = push(opcoesRef); // Gera um ID único
    await set(novaOpcaoRef, opcao);
    console.log("Opção criada com sucesso:", opcao);
  } catch (error) {
    console.error("Erro ao criar opção:", error);
    throw error;
  }
};

// Método para buscar todas as opções
export const buscarOpcoes = async (): Promise<Opcao[]> => {
  try {
    const opcoesRef = ref(database, "opcoes");
    const snapshot = await get(opcoesRef);
    const opcoes: Opcao[] = [];

    snapshot.forEach((childSnapshot) => {
      const opcaoData = childSnapshot.val();
      opcoes.push({
        id: childSnapshot.key || "",
        ...opcaoData,
      });
    });

    console.log("Opções buscadas com sucesso:", opcoes);
    return opcoes;
  } catch (error) {
    console.error("Erro ao buscar opções:", error);
    throw error;
  }
};

// Método para atualizar uma opção existente
export const atualizarOpcao = async (
  id: string,
  novosDados: Partial<Opcao>
): Promise<void> => {
  try {
    const opcaoRef = ref(database, `opcoes/${id}`);
    await update(opcaoRef, novosDados);
    console.log("Opção atualizada com sucesso:", novosDados);
  } catch (error) {
    console.error("Erro ao atualizar opção:", error);
    throw error;
  }
};

// Método para deletar uma opção
export const deletarOpcao = async (id: string): Promise<void> => {
  try {
    const opcaoRef = ref(database, `opcoes/${id}`);
    await remove(opcaoRef);
    console.log("Opção deletada com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar opção:", error);
    throw error;
  }
};
