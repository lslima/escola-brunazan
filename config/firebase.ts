import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBdFn2lePGPcWuo2KU4vrNXdkK9dhdJdVI",
  authDomain: "escola-brunazan.firebaseapp.com",
  projectId: "escola-brunazan",
  storageBucket: "escola-brunazan.firebasestorage.app",
  messagingSenderId: "45524497710",
  appId: "1:45524497710:web:46d1f9b3981ba94c1776bf"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
