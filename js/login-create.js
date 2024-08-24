// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

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


function showMsg(msg){
  const section = document.getElementById("failed-popup");
   const overlay = document.querySelector(".overlay");
   const closeBtn = document.getElementById("close-btn");
   const message = document.getElementById('failed-msg');
      message.innerHTML = msg;
      section.classList.add("active");
    overlay.addEventListener("click", () =>{
      section.classList.remove("active");
    }
    );
    closeBtn.addEventListener("click", () =>{
      section.classList.remove("active");
    }
    );
}
function good(msg){
  document.getElementById("msg").innerHTML = msg;
  document.getElementById("submitted-popup").classList.add("active");
}

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const loginEmail = document.getElementById('login-email').value;
  const loginPassword = document.getElementById('login-password').value;
  
  if(loginEmail == ''){
    showMsg('Please enter your email address');
    return;
  } else if (!/[@.]/.test(loginEmail)) {
    showMsg('Please enter a valid email address');
    return;
  } else if (loginPassword == '') {
    showMsg('Please enter your password');
    return;
  }
  else{
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
      
      good('logged in successfully');
      const user = userCredential.user;
      setTimeout(function() {
        window.location.href = `./IFYR.html?tab=rules`;
      }, 3000);
      
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-credential') {
        showMsg('Incorrect Email or Password');
      } else {
        showMsg('Account does not Exist');
      }
    })
  }
});



const createForm = document.getElementById('create-form');
createForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let createName = document.getElementById('create-name').value;
  let createEmail = document.getElementById('create-email').value;
  let createPassword = document.getElementById('create-password').value;
  if (createName == '') {
    showMsg('Please Enter your name');
    return;
  } else if (createEmail == '') {
    showMsg('Please Enter your email');
    return;
  }  else if (!/[@.]/.test(createEmail)) {
    showMsg('Please Enter valid email');
    return;
  }  else if (createPassword == '') {
    showMsg('Please Enter your password');
    return;
  } else if (createPassword.length < 6) {
    showMsg('Password must be at least 6 characters long');
    return;
  } else{
    let createName = document.getElementById('create-name').value;
    let createEmail = document.getElementById('create-email').value;
    let createPassword = document.getElementById('create-password').value;
    createUserWithEmailAndPassword(auth, createEmail, createPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: createName
      })
      .then(() => {
        console.log('Profile updated successfully!');
        good(`Account Created Successfully ${createName}`);
        setTimeout(function() {
          window.location.href = `./IFYR.html?tab=rules`;
        }, 2000);
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        // Handle profile update error here
      });
    })
    .catch((error) => {
      console.error('Error creating user:', error);
      // Handle user creation error here
      if(error.code == 'auth/email-already-in-use'){
        showMsg(`Email already in use`);
      }
    });
  }
})

document.getElementById('continue-google').addEventListener('click', (event)=>{
  event.preventDefault();

  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      showMsg('login is successful');
      const user = result.user;
      setTimeout(function() {
        window.location.href = `./IFYR.html?tab=rules`;
      }, 2000);
    })
    .catch((error) => {
      const errorCode = error.code;
      showMsg('Error signing in with Google: ' + errorCode);
    });
})  
document.getElementById('continue2-google').addEventListener('click', (event)=>{
    event.preventDefault();
  
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        showMsg('login is successful');
        const user = result.user;
        setTimeout(function() {
          window.location.href = `./IFYR.html?tab=rules`;
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        showMsg('Error signing in with Google: ' + errorCode);
      });
  })  

const resetForm = document.getElementById('forgot-form');

resetForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    const forgotEmail = document.getElementById('forgot-email').value;
    sendPasswordResetEmail(auth, forgotEmail)
  .then(() => {
    showMsg("Password reset link sent successfully!, check your email, then you can sigin with the new passwrod.");    
  })
  .catch((error) => {
    showMsg("Error sending password reset link:");
  });
})
  