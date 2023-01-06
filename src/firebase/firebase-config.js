import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBL8EKntGLCdMOqoUmt0ERhM7fqxCX6WR0",
	authDomain: "ripplenote-15.firebaseapp.com",
	projectId: "ripplenote-15",
	storageBucket: "ripplenote-15.appspot.com",
	messagingSenderId: "603590725350",
	appId: "1:603590725350:web:c099b8952dc117c4e77527"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
