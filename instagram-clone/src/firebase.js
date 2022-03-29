
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const config = {
  apiKey: "AIzaSyBfY7mi9sJlpp5yJvBLQNxq78D3aaJzn-4",
  authDomain: "instagram-clone-9e98f.firebaseapp.com",
  projectId: "instagram-clone-9e98f",
  storageBucket: "instagram-clone-9e98f.appspot.com",
  messagingSenderId: "256973062824",
  appId: "1:256973062824:web:fe93793a9a6f40fdc6789d",
  measurementId: "G-C0F40VYNRP"
};

const app = initializeApp(config);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {db, auth, storage};
