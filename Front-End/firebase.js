// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2L_-_haxBhkiBzwNOa7BnkVRCBpP3_ro",
  authDomain: "thinkly-a9964.firebaseapp.com",
  projectId: "thinkly-a9964",
  storageBucket: "thinkly-a9964.firebasestorage.app",
  messagingSenderId: "150140683364",
  appId: "1:150140683364:web:c9764b6235c96884a80b71",
  measurementId: "G-CC7SVNWYHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);