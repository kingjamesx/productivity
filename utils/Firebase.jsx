// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb4FvbI0cbAp8er_VtW25Vp9Fz8MRpfFU",
  authDomain: "productivity-app-1b355.firebaseapp.com",
  projectId: "productivity-app-1b355",
  storageBucket: "productivity-app-1b355.appspot.com",
  messagingSenderId: "273733865394",
  appId: "1:273733865394:web:b0da97aebf1378caf5deab",
  measurementId: "G-WMFEJP1J9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);