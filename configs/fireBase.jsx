// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-course-generator-10c63.firebaseapp.com",
  projectId: "ai-course-generator-10c63",
  storageBucket: "ai-course-generator-10c63.appspot.com",
  messagingSenderId: "647680640141",
  appId: "1:647680640141:web:a93ecaacaacef2c2708ec4",
  measurementId: "G-DT3FEL66P3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage(app);