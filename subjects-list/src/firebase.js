import firebase from "firebase/app";
import "firebase/database";


var firebaseConfig = {
    apiKey: "AIzaSyBqujmsuIdru5ktp4Ymep77TIjsBxiG-Jc",
    authDomain: "subjects-list-2f473.firebaseapp.com",
    projectId: "subjects-list-2f473",
    storageBucket: "subjects-list-2f473.appspot.com",
    messagingSenderId: "532370995325",
    appId: "1:532370995325:web:142c9c9e6d08774a945914",
    measurementId: "G-QTZ8DR70QJ"
  };

const fireDB = firebase.initializeApp(firebaseConfig);
export default fireDB.database().ref();
