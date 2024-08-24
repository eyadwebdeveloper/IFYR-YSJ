import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDQtBb8zDA1iPZBRjFtXjcnj2zAIhlHzIY",
    authDomain: "ysg-portal.firebaseapp.com",
    projectId: "ysg-portal",
    storageBucket: "ysg-portal.appspot.com",
    messagingSenderId: "91821075370",
    appId: "1:91821075370:web:80369759cd25604e7499d3",
    measurementId: "G-EC8037VVTR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



onAuthStateChanged(auth, (user) => {
  console.log('onAuthStateChanged callback executed');
  if (user) {
    console.log('User is signed in:', user.displayName);
    checkProgress();
  } else {
    console.log('No user signed in');
    alert('no user signed in');
  }
});

async function checkProgress() {
  console.log('checkProgress() called');
  const user = auth.currentUser;
  if (user) {
    console.log('User is signed in:', user.displayName);
    try {
      const userRef = doc(db, 'IFYR', user.email);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('User is signed in:', user.displayName);
        document.getElementById('welcome-team').innerHTML = userData.TeamName;
        document.getElementById('status-date').innerHTML = userData.date + ' , ' + userData.time;
      } else {
        window.location.href = './Application.html?tab=rules';
      }
    } catch (error) {
      console.log('Error checking progress: ' + error.message);
    }
  } else {
    console.log('No user signed in');
    alert('You must Signin first');
    setTimeout(function() {
        window.location.href = `./Application.html?tab=status`;
      }, 2000);
  }
}

function signOutUser() {
  auth.signOut().then(() => {
    // Sign-out successful.
    alert('You have been signed out');
    window.location.href = `./`; // redirect to login page
  }).catch((error) => {
    // An error happened.
    alert('Error signing out');
  });
}
const signOut = document.getElementById('signout');
signOut.addEventListener('click', (event) => {
  event.preventDefault();
  signOutUser();
});

