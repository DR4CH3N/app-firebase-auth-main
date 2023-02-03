// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// importando recursos da biblioteca de autenticação do firebase
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeagFKyypRHKGO1Up9kjxi-F2CYTU-VXM",
  authDomain: "pro-hour-194715.firebaseapp.com",
  projectId: "pro-hour-194715",
  storageBucket: "pro-hour-194715.appspot.com",
  messagingSenderId: "202132422659",
  appId: "1:202132422659:web:850b443791fb8b5b914e36",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// exportando os recursos de autenticação da biblioteca

export const auth = getAuth(app);
