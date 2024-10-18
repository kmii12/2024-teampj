// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrFK0Z5Q3xD4-3JVoKKLmjtb6Xkp7htOM",
  authDomain: "teampj-93580.firebaseapp.com",
  projectId: "teampj-93580",
  storageBucket: "teampj-93580.appspot.com",
  messagingSenderId: "980725207688",
  appId: "1:980725207688:web:449ec652ff53821d19053d",
  measurementId: "G-44ZMDLLSWP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
