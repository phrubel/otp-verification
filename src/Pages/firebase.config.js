// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCsxY9zTb20jf6pIXPH9JbnTUpHQUbjvtU',
  authDomain: 'otp-verify-by-phone.firebaseapp.com',
  projectId: 'otp-verify-by-phone',
  storageBucket: 'otp-verify-by-phone.appspot.com',
  messagingSenderId: '867213821963',
  appId: '1:867213821963:web:d47bffee2807e25fd39f0e',
  measurementId: 'G-60EPED3YLN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// export auth function
export const auth = getAuth(app);
