import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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
const auth = getAuth(firebaseApp);

export const signOut = async () => {
    try {
      await auth.signOut(); // Função de logout do Firebase Authentication
    } catch (error) {
      throw error;
    }
};