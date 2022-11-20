// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4nPlLHWeHNYr52JaYusOI4GxREd_NMjE",
    authDomain: "wh9heartatteach.firebaseapp.com",
    projectId: "wh9heartatteach",
    storageBucket: "wh9heartatteach.appspot.com",

    messagingSenderId: "221910672167",
    appId: "1:221910672167:web:9f0203df05738a6c917f02"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);

