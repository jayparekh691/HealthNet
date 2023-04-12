import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC2jnyaQTUvJk4BcO3gPFTOzazwAnCZp5M",
  authDomain: "hadcloud-69bc1.firebaseapp.com",
  projectId: "hadcloud-69bc1",
  storageBucket: "hadcloud-69bc1.appspot.com",
  messagingSenderId: "252978841983",
  appId: "1:252978841983:web:a69870ad6158024f80724a",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
