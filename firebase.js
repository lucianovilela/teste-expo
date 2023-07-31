// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFrVY0I_EQfSQQbnE7wXxIQ5ijjtiDdoU",
  authDomain: "previa2020-e8032.firebaseapp.com",
  databaseURL: "https://previa2020-e8032.firebaseio.com",
  projectId: "previa2020-e8032",
  storageBucket: "previa2020-e8032.appspot.com",
  messagingSenderId: "565833973019",
  appId: "1:565833973019:web:b87b9a507b4fe2353167be",
  measurementId: "G-VE1FNH4SFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export {app,  firestore, auth}