import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzQypuows6Tesx4g3JEU04cePvoQiL__A",
  authDomain: "beespoke-d911e.firebaseapp.com",
  projectId: "beespoke-d911e",
  storageBucket: "beespoke-d911e.appspot.com",
  messagingSenderId: "124488833586",
  appId: "1:124488833586:web:fec81c85d6b75b19fcfa2b",
  measurementId: "G-M3EQ9R5M1Q"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app);

export {app,db,auth}