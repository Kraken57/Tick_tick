import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx3vyLES2BTs7vVZirNQveYd4ebU3xJkA",
  authDomain: "flowboard-b4020.firebaseapp.com",
  projectId: "flowboard-b4020",
  storageBucket: "flowboard-b4020.appspot.com",
  messagingSenderId: "432183901951",
  appId: "1:432183901951:web:3b2613751e84f1822896ca"
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
