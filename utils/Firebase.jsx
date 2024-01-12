// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyCb4FvbI0cbAp8er_VtW25Vp9Fz8MRpfFU",
  authDomain: "productivity-app-1b355.firebaseapp.com",
  projectId: "productivity-app-1b355",
  storageBucket: "productivity-app-1b355.appspot.com",
  messagingSenderId: "273733865394",
  appId: "1:273733865394:web:b0da97aebf1378caf5deab",
  measurementId: "G-WMFEJP1J9R",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);

// Get a list of cities from your database
// async function getCities(db) {
//     const citiesCol = collection(db, 'cities');
//     const citySnapshot = await getDocs(citiesCol);
//     const cityList = citySnapshot.docs.map(doc => doc.data());
//     return cityList;
// }
