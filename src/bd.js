// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOVNrGQnoiE5Ct5fTsfc3Kg7NJIAmI4RA",
  authDomain: "react-bd-74ed1.firebaseapp.com",
  projectId: "react-bd-74ed1",
  storageBucket: "react-bd-74ed1.appspot.com",
  messagingSenderId: "472377106992",
  appId: "1:472377106992:web:dc74533cce7c6435abc3f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {db, auth};