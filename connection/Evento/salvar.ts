import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";

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

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export const salvarEventoNoBanco = async (
  titulo: string,
  data: string,
  horario: string,
  imagem: string,
  endereco: string,
  linkEnderecoMaps: string,
  numeroContato: string,
  valor: string,
  descricao: string
): Promise<string> => {
  // Ajuste o tipo de retorno para Promise<string>
  try {
    const eventosRef = ref(database, "eventos");
    const novoEventoRef = push(eventosRef);

    await set(novoEventoRef, {
      titulo,
      data,
      horario,
      imagem,
      endereco,
      linkEnderecoMaps,
      numeroContato,
      valor,
      descricao,
    });

    console.log("Evento salvo com sucesso!");

    // Retorna o ID do novo evento
    return novoEventoRef.key as string; // Garante que o ID do evento seja uma string
  } catch (error) {
    console.error("Erro ao salvar evento:", error);
    throw error; // Propaga o erro para o tratamento em `handleAddEvento`
  }
};
