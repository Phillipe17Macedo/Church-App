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

interface Celula {
    id: string;
    nomeCelula: string;
    diaCelula: string;
    horarioCelula: string;
    enderecoCelula: string;
    imagemCelula: string;
}

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export const removerCelulaDoBanco = async (celulaId: string) => {
    try {
        const celulaRef = ref(database, `celulas/${celulaId}`);
        await remove(celulaRef);
        console.log('Celula removida com sucesso!');
    } catch (error) {
        console.error('Erro ao remover celula:', error);
        throw error;
    }
};