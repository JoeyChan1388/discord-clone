import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAgkqMghws4cuRI8UDDaxgC2q9X9W8383s",
    authDomain: "discord-clone-24bee.firebaseapp.com",
    projectId: "discord-clone-24bee",
    storageBucket: "discord-clone-24bee.appspot.com",
    messagingSenderId: "477169105861",
    appId: "1:477169105861:web:17bc8e3d51740e594aa9ac",
    measurementId: "G-WKJJ76X3V5"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;