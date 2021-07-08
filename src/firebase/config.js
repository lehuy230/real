import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAUEgO3Ra3I-N-tXNKJE5oY3XzXOHrwkC4",
    authDomain: "chat-real-time-4fc0b.firebaseapp.com",
    projectId: "chat-real-time-4fc0b",
    storageBucket: "chat-real-time-4fc0b.appspot.com",
    messagingSenderId: "109770480912",
    appId: "1:109770480912:web:ff83b783d5666a3ac55995",
    measurementId: "G-DGVEZHMN4Z"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const auth = firebase.auth();
  const db = firebase.firestore();

  export {db,auth};
  export default firebase;