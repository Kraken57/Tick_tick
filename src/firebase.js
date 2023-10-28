import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9tGL0tVCGTjWFDT--jAgRnD8GHmj8IeM",
  authDomain: "taskmanager-a2173.firebaseapp.com",
  projectId: "taskmanager-a2173",
  storageBucket: "taskmanager-a2173.appspot.com",
  messagingSenderId: "1030547554622",
  appId: "1:1030547554622:web:95427b7a4a18c604582c6f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const fbFunctions = getFunctions(app);

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");//9099  5001 8080
  connectFirestoreEmulator(db, "localhost", 8080);
  connectFunctionsEmulator(fbFunctions, "localhost", 5001);
}
