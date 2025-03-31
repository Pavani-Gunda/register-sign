import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import {getAuth,signOut,onAuthStateChanged, } from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js'
import { getFirestore,
  setDoc,
  doc, } from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js'

//intilized firebase
const firebaseConfig = {
  apiKey: "AIzaSyA0H9DCQBcQpbIClHX1tTm2i0Z82dQXc_Q",
  authDomain: "register-and-signin-fbd7b.firebaseapp.com",
  projectId: "register-and-signin-fbd7b",
  storageBucket: "register-and-signin-fbd7b.firebasestorage.app",
  messagingSenderId: "398801107437",
  appId: "1:398801107437:web:2c17a04256740dc09a4fe4"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  if (loggedInUserId) {
    const docRef = doc(db, "users", loggedInUserId);

    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          const user = doc.data();
          document.getElementById("user-container").style.display = "block";
          document.getElementById("error-container").style.display = "none";
          document.getElementById("firstName").innerText = user?.firstName;
          document.getElementById("lastName").innerText = user?.lastName;
          document.getElementById("email").innerText = user?.email;
        }
      })
      .catch((error) => {
        console.log("there some issue while fetching data", error);
      });
  }
});

const logoutbtn = document.getElementById("logout");

logoutbtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUserId");
  signOut(auth)
    .then(() => {
      window.location.href = "./index.html";
    })
    .catch((error) => {
      console.log("getting error while logging out", error);
    });
});