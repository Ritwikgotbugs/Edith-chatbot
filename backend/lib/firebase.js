// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiijpabD5fODuuD9-gCgr3bqBNEFz3KJc",
  authDomain: "edith-chatbot-8f9eb.firebaseapp.com",
  projectId: "edith-chatbot-8f9eb",
  storageBucket: "edith-chatbot-8f9eb.appspot.com",
  messagingSenderId: "45254642793",
  appId: "1:45254642793:web:0a61abf7c5e3a4f0ea26f8",
};

import firebase from "firebase/app";
import "firebase/storage";

export const DocumentUpload = async (file) => {
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(file.name);
  await fileRef.put(file);
  const fileUrl = await fileRef.getDownloadURL();
  return fileUrl;
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
