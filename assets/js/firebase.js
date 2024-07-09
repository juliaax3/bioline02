import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import{getDatabase} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js"

const firebaseConfig = {
  apiKey: "AIzaSyCJgqb5d9b9tg0SHepMydGiPXEVZBAOuS0",
  authDomain: "jujuba-cf4e9.firebaseapp.com",
  projectId: "jujuba-cf4e9",
  storageBucket: "jujuba-cf4e9.appspot.com",
  messagingSenderId: "807516463621",
  appId: "1:807516463621:web:d68dc093b8661d4ba3f26c",
  measurementId: "G-4M812KH9YJ",
  databaseURL: "https://jujuba-cf4e9-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

  export {app, auth, database}