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

interface Celula {
    id: string;
    nomeCelula: string;
    diaCelula: string;
    horarioCelula: string;
    enderecoCelula: string;
    imagemCelula: string;
    linkEnderecoMaps: string;
}

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export const editarCelulaNoBanco = async (celulaId: string, novosDados: Celula) => {
    try {
        const celulaRef = ref(database, `celulas/${celulaId}`);
        await update(celulaRef, novosDados);
        console.log('Dados da celula atualizados com sucesso!');
    } catch (error) {
        console.error('Erro ao editar dados da celula:', error);
        throw error;
    }
};