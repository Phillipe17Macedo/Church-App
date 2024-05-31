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

export const salvarCelulaNoBanco = async (
    titulo: string,
    data: string,
    horario: string,
    endereco: string,
    imagem: string,
    linkEnderecoMaps: string,
    nomeLider: string,
    numeroLider: string,
    descricao: string
) => {
    try {
        const celulasRef = ref(database, 'celulas');
        const novaCelulaRef = push(celulasRef);
        await set(novaCelulaRef, {
            titulo,
            data,
            horario,
            endereco,
            imagem,
            linkEnderecoMaps,
            nomeLider,
            numeroLider,
            descricao
        });
        console.log('Celula salva com sucesso!');
        console.log('URI Imagem: ', imagem);
    } catch (error) {
        console.error('Erro ao salvar celula:', error);
        throw error;
    }
};