// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,initializeAuth, getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCosTin0n6CdtlMybH7javxevRiHnQhb8Y",
  authDomain: "spendvibe-8a403.firebaseapp.com",
  projectId: "spendvibe-8a403",
  storageBucket: "spendvibe-8a403.firebasestorage.app",
  messagingSenderId: "251172336234",
  appId: "1:251172336234:web:6defc93f693096f1245013",
  measurementId: "G-69D6CYLFT9"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});