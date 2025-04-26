// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_FIREBASE_API_KEY,
  authDomain: "ramhacks-d7372.firebaseapp.com",
  projectId: "ramhacks-d7372",
  storageBucket: "ramhacks-d7372.firebasestorage.app",
  messagingSenderId: "690716237731",
  appId: "1:690716237731:web:ce40def3d83c99624bc416",
  measurementId: "G-6Q8RCYFH9G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)