import firebase from 'firebase/app'
import 'firebase/firestore'
require('firebase/auth')

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA2VM3IU0FLjhcs-iDGa_iXd5rnJcmPdWU",
  authDomain: "todoteam-3263d.firebaseapp.com",
  databaseURL: "https://todoteam-3263d.firebaseio.com",
  projectId: "todoteam-3263d",
  storageBucket: "todoteam-3263d.appspot.com",
  messagingSenderId: "643524690865",
  appId: "1:643524690865:web:1b7e4938dad3e2e4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

export default db;
