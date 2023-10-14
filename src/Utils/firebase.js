// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCXlb_yl37IeRUi7EwNDtzMCxY2lwdYxa0",
    authDomain: "netflix-gpt-9c528.firebaseapp.com",
    projectId: "netflix-gpt-9c528",
    storageBucket: "netflix-gpt-9c528.appspot.com",
    messagingSenderId: "896392923302",
    appId: "1:896392923302:web:1ddacef8e7b47dab580c67",
    measurementId: "G-L8TFN95CMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();


