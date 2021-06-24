import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDzebfRUDdlG4xNL4hzyd7rFi0MjtwPS64",
    authDomain: "practice-4e034.firebaseapp.com",
    projectId: "practice-4e034",
    storageBucket: "practice-4e034.appspot.com",
    messagingSenderId: "188019083166",
    appId: "1:188019083166:web:90d31e7238c5346346b88f"
  };
  // Initialize Firebase
firebase.initializeApp(config);
firebase.auth();
export const db = firebase.firestore();
export const usersCollection = db.collection('users');

// db.collection('users').get().then(snapshot => {
//     snapshot.forEach(doc =>{
//         console.log(doc.id, doc.data());
//     })
// } ).catch( e => console.log(e));


export default firebase;
  