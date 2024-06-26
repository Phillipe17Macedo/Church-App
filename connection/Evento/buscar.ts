import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, DataSnapshot } from "firebase/database";

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

import { Evento } from "@/types";

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export const buscarEventosDoBanco = async (): Promise<Evento[]> => {
  try {
    const eventosRef = ref(database, "eventos");
    const snapshot: DataSnapshot = await get(eventosRef);
    const eventos: Evento[] = [];

    snapshot.forEach((childSnapshot) => {
      const eventoData = childSnapshot.val();
      const evento: Evento = {
        id: childSnapshot.key !== null ? childSnapshot.key : "",
        titulo: eventoData.titulo,
        data: eventoData.data,
        horario: eventoData.horario,
        imagem: eventoData.imagem,
        endereco: eventoData.endereco,
        linkEnderecoMaps: eventoData.linkEnderecoMaps,
        numeroContato: eventoData.numeroContato,
        valor: eventoData.valor,
        descricao: eventoData.descricao
      };
      eventos.push(evento);
    });
    return eventos;
  } catch (error) {
    console.error("Erro ao buscar eventos no banco:", error);
    throw error;
  }
};
