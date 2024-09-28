// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-bbd19.firebaseapp.com",
  projectId: "mern-real-estate-bbd19",
  storageBucket: "mern-real-estate-bbd19.appspot.com",
  messagingSenderId: "852889555732",
  appId: "1:852889555732:web:41675517a07089805aa801"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)