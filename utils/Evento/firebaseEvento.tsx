import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set, get, update, DataSnapshot, remove } from 'firebase/database';



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

  export const removerEventoDoBanco = async (eventoId: string) => {
    try {
      const eventoRef = ref(database, `eventos/${eventoId}`);
      await remove(eventoRef);
      console.log('Evento removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover evento:', error);
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
