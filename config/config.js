import firebase from "firebase";
require("firebase/firestore");
import { env } from "../env";

const {
  apiKey,
  appId,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  measurementId,
  messagingSenderId
} = env;

const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
};

export const initialize = firebase.initializeApp(firebaseConfig);

const db = initialize.firestore();

export { db };
