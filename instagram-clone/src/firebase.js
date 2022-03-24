import firebase from 'firebase';
//import firebase from 'firebase/compat/app';
//import 'firebase/compat/auth';
//import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBfY7mi9sJlpp5yJvBLQNxq78D3aaJzn-4",
    authDomain: "instagram-clone-9e98f.firebaseapp.com",
    projectId: "instagram-clone-9e98f",
    storageBucket: "instagram-clone-9e98f.appspot.com",
    messagingSenderId: "256973062824",
    appId: "1:256973062824:web:fe93793a9a6f40fdc6789d",
    measurementId: "G-C0F40VYNRP"
});

const db = firebaseApp.fireStore(); 
//const auth = firebase.auth();
//const storage = firebase.storage();

export {db}