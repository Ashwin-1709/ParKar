import { initializeApp } from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAkHkIy09oTSE6hALh-hxEHuH4FgX8znYA",
  authDomain: "car-parking-java-oops.firebaseapp.com",
  projectId: "car-parking-java-oops",
  storageBucket: "car-parking-java-oops.appspot.com",
  messagingSenderId: "800907144169",
  appId: "1:800907144169:web:f15952415cf3d654bbf978",
  measurementId: "G-CTQDTWZSE8"
};
const app = initializeApp(firebaseConfig);
export default app;