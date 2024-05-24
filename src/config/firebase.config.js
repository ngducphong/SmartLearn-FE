// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxvVH0TyMfPDGTx7i79aGR3K_mCl_W4l4",
  authDomain: "uploadimageelearning.firebaseapp.com",
  projectId: "uploadimageelearning",
  storageBucket: "uploadimageelearning.appspot.com",
  messagingSenderId: "33355721151",
  appId: "1:33355721151:web:04f5e459979b1d6ff8990a",
  measurementId: "G-XM07MGPM81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
