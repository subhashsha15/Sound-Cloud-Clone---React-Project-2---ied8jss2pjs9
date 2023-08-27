// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCvn9MaWj3DTutXaKBGYdSSvqMgeS2AZVA",
    authDomain: "soundcloud-8bd3c.firebaseapp.com",
    projectId: "soundcloud-8bd3c",
    storageBucket: "soundcloud-8bd3c.appspot.com",
    messagingSenderId: "594766343830",
    appId: "1:594766343830:web:65be4d567ab23fe7061cb7",
    measurementId: "G-ZE70MLGXV3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider=new GoogleAuthProvider();

export { provider, auth };