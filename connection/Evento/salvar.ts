import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set } from 'firebase/database';


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
        endereco,
        linkEnderecoMaps,
        numeroContato,
        valor,
        descricao
      });
      console.log('Evento salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
      throw error;
    }
};