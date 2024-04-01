// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeaslwnkaLWtxx9O88yMjp4Bj6Fja9U_w",
  authDomain: "user-email-password-auth-f153d.firebaseapp.com",
  projectId: "user-email-password-auth-f153d",
  storageBucket: "user-email-password-auth-f153d.appspot.com",
  messagingSenderId: "512615066703",
  appId: "1:512615066703:web:55d483b524f3602f628e3a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
