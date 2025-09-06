import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCnAwXEDHTs000dSmFWImrgRNBvb7D5xXw",
  authDomain: "blog-app-71b67.firebaseapp.com",
  projectId: "blog-app-71b67",
  storageBucket: "blog-app-71b67.firebasestorage.app",
  messagingSenderId: "644974552650",
  appId: "1:644974552650:web:fd0188b72820f156a528b3",
  measurementId: "G-B1RM3K0XMV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)