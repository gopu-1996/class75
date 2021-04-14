import * as firebase from 'firebase'
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyCr_AxaQy_sHJ063X0eGms9ZBytiBoVpcM",
    authDomain: "wily-e1a7d.firebaseapp.com",
    projectId: "wily-e1a7d",
    storageBucket: "wily-e1a7d.appspot.com",
    messagingSenderId: "776875471857",
    appId: "1:776875471857:web:3fde187d433bd4cbd14a50"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();