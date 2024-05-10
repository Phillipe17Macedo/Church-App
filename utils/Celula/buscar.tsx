import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, DataSnapshot } from 'firebase/database';

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

export const buscarCelulaDoBanco = async (): Promise<Celula[]> => {
    try {
        const celulasRef = ref(database, 'celulas');
        const snapshot: DataSnapshot = await get(celulasRef);
        const celulas: Celula[] = [];

        snapshot.forEach((childSnapshot) => {
            const celulaData = childSnapshot.val();
            const celula: Celula = {
                id: childSnapshot.key !== null ? childSnapshot.key : '',
                nomeCelula: celulaData.nomeCelula,
                diaCelula: celulaData.diaCelula,
                horarioCelula: celulaData.horarioCelula,
                enderecoCelula: celulaData.enderecoCelula,
                imagemCelula: celulaData.imagemCelula,
            };
            celulas.push(celula);
        });
        return celulas;
    } catch (error) {
        console.error('Erro ao buscar celulas no banco: ', error);
        throw error;
    }
};