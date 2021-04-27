import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAYMpCgSz_Fw-IqvaMsVNEJPxU2JNtew-0",
  authDomain: "signal-clone-34c63.firebaseapp.com",
  projectId: "signal-clone-34c63",
  storageBucket: "signal-clone-34c63.appspot.com",
  messagingSenderId: "777842170340",
  appId: "1:777842170340:web:41077f56da5f1d53224ff1",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
export { db, auth };