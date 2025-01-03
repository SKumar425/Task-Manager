// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZYJ2PqseC3Y8aOHfIBoZDh-3lUXJBoUM",
  authDomain: "task-manager-58132.firebaseapp.com",
  projectId: "task-manager-58132",
  storageBucket: "task-manager-58132.firebasestorage.app",
  messagingSenderId: "1036727918613",
  appId: "1:1036727918613:web:03213ca470df19bbb1ee1c",
  measurementId: "G-5LBS84V3R1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
