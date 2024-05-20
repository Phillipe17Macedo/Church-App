import { initializeApp } from 'firebase/app';
import { getDatabase, ref, update } from 'firebase/database';


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
  
interface Evento {
    id: string;
    titulo: string;
    data: string;
    horario: string;
    imagem: string;
}
  
  const firebaseApp = initializeApp(firebaseConfig);
  const database = getDatabase(firebaseApp);
  
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