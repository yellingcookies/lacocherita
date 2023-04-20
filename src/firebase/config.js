// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "restaurantplus-fc4eb.firebaseapp.com",
  projectId: "restaurantplus-fc4eb",
  storageBucket: "restaurantplus-fc4eb.appspot.com",
  messagingSenderId: "468434117093",
  appId: "1:468434117093:web:0217fc4ca0a092f0390f0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const db= getFirestore(app);
export const storage= getStorage(app);
export default app;