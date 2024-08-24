import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

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
const storage = getStorage(app);






onAuthStateChanged(auth, (user) => {
  console.log('onAuthStateChanged callback executed');
  if (user) {
    console.log('User is signed in:', user.displayName);
    const userEmail = user.email;
    checkProgress();
  } else {
    console.log('No user signed in');
    showMsg('no user signed in');
    setTimeout(function() {
      window.location.href = `./`;
    }, 2000);
  }
  
});

async function checkProgress() {
  console.log('checkProgress() called');
  if (auth.currentUser) {
    console.log('auth.currentUser is not null');
    document.getElementById('username').innerHTML = auth.currentUser.displayName;
    
    try {
      const userRef = doc(db, 'IFYR', auth.currentUser.email);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        window.location.href = 'Status.html'
      }
    } catch (error) {
      console.log('Error checking progress: ' + error.message);
    }
  } else {
    console.log('auth.currentUser is null');
    location.href = './';
    console.log('You must be signed in to check your progress.');
  }
}

function signOutUser() {
  auth.signOut().then(() => {
    // Sign-out successful.
    showMsg('You have been signed out');
    setTimeout(function() {
      window.location.href = `./`;
    }, 3000);
  }).catch((error) => {
    // An error happened.
    showMsg('Error signing out');
  });
}
const signOut = document.getElementById('signout');
signOut.addEventListener('click', (event) => {
  event.preventDefault();
  signOutUser();
});



document.querySelector("section").classList.remove("active");

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


async function submitForm(formData) {
  try {
    
    const file = fileInput.files[0];

    // Create a reference to the file in Firebase Storage
    const fileRef = ref(storage, `IFYR/${auth.currentUser.email}/${file.name}`);

    // Upload the file to Firebase Storage
    await uploadBytes(fileRef, file);


    const downloadURL = await getDownloadURL(fileRef);
    


    const userRef = doc(db, 'IFYR', auth.currentUser.email);
    await setDoc(userRef, { ...formData, fileUrl: downloadURL });
  


    const section = document.getElementById("submitted-popup");
    section.classList.add("active");

    const formURL =
"https://docs.google.com/forms/u/0/d/e/1FAIpQLScP-oYGKJL8DvehvANq54pCk0Wzl0S3AXDX2J1T1bJUimplIw/formResponse";
// Get the radio inputs
const paperCategoryRadios = document.getElementsByName('paper-category');
const paperFieldRadios = document.getElementsByName('paper-field');


// Function to get the value of the checked radio input
function getCheckedRadioValue(radios) {
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
  return null; // Return null if no radio is checked
}

// Get the values of the checked radio inputs
const paperCategoryValue = getCheckedRadioValue(paperCategoryRadios);
const paperFieldValue = getCheckedRadioValue(paperFieldRadios);


const googleFormData = new URLSearchParams();
    googleFormData.append("entry.860275760", document.getElementById('team-name').value); 
    googleFormData.append("entry.680923620", document.getElementById('team-size').value); 
    googleFormData.append("entry.486526103", document.getElementById('member1-first-name').value); 
    googleFormData.append("entry.1933235603", document.getElementById('member1-last-name').value); 
    googleFormData.append("entry.1357994705", document.getElementById('member1-email-address').value); 
    googleFormData.append("entry.908897602", document.getElementById('member1-birthday').value); 
    googleFormData.append("entry.206079933", document.getElementById('member1-country').value); 
    googleFormData.append("entry.1770413877", document.getElementById('member1-institution').value); 
    googleFormData.append("entry.1644785390", document.getElementById('member2-first-name').value); 
    googleFormData.append("entry.563182524", document.getElementById('member2-last-name').value); 
    googleFormData.append("entry.912107245", document.getElementById('member2-email-address').value); 
    googleFormData.append("entry.1768535193", document.getElementById('member2-birthday').value); 
    googleFormData.append("entry.1045836548", document.getElementById('member2-country').value); 
    googleFormData.append("entry.108170736", document.getElementById('member2-institution').value); 
    googleFormData.append("entry.311693373", document.getElementById('member3-first-name').value); 
    googleFormData.append("entry.1234092342", document.getElementById('member3-last-name').value); 
    googleFormData.append("entry.2045238547", document.getElementById('member3-email-address').value); 
    googleFormData.append("entry.1287178124", document.getElementById('member3-birthday').value); 
    googleFormData.append("entry.1513047101", document.getElementById('member3-country').value); 
    googleFormData.append("entry.239067867", document.getElementById('member3-institution').value); 
    googleFormData.append("entry.1865177102", document.getElementById('member4-first-name').value); 
    googleFormData.append("entry.1507037362", document.getElementById('member4-last-name').value); 
    googleFormData.append("entry.42093406", document.getElementById('member4-email-address').value); 
    googleFormData.append("entry.2068689237", document.getElementById('member4-birthday').value); 
    googleFormData.append("entry.742183357", document.getElementById('member4-country').value); 
    googleFormData.append("entry.2034212667", document.getElementById('member4-institution').value); 
    googleFormData.append("entry.747475559", document.getElementById('member5-first-name').value); 
    googleFormData.append("entry.504779670", document.getElementById('member5-last-name').value);
    googleFormData.append("entry.911268612", document.getElementById('member5-email-address').value);  
    googleFormData.append("entry.251897964", document.getElementById('member5-birthday').value); 
    googleFormData.append("entry.1766643228", document.getElementById('member5-country').value); 
    googleFormData.append("entry.84853997", document.getElementById('member5-institution').value); 
    googleFormData.append("entry.1860016323", paperCategoryValue); 
    googleFormData.append("entry.427655415", paperFieldValue); 

    try {
      const response = await fetch(formURL, {
        method: "POST",
        body: googleFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: 'no-cors', 
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
      } 
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    // ...
  } catch (error) {
    showMsg('Error submitting Portal: ' + error.message);
  }
}




const AppForm = document.getElementById('app-content');
AppForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if(document.getElementById('team-name').value == ''){
    showMsg('Please enter your team name');
  } else if(document.getElementById('team-size').value == ''){
    showMsg('Please select your team size');
  } else if(document.getElementById('team-size').value == 'due'){
      if(document.getElementById('member2-first-name').value == ''){
        showMsg('Please enter member 2\'s first name');
      } else if(document.getElementById('member2-last-name').value == ''){
        showMsg('Please enter member 2\'s last name');
      } else if(document.getElementById('member2-birthday').value == ''){
        showMsg('Please enter member 2\'s birthday');
      } else if(document.getElementById('member2-country').value == ''){
        showMsg('Please enter member 2\'s country');
      } else if(document.getElementById('member2-institution').value == ''){
        showMsg('Please enter member 2\'s institution');
      }
  } else if(document.getElementById('team-size').value == 'trio'){
      if(document.getElementById('member3-first-name').value == ''){
        showMsg('Please enter member 3\'s first name');
      } else if(document.getElementById('member3-last-name').value == ''){
        showMsg('Please enter member 3\'s last name');
      } else if(document.getElementById('member3-birthday').value == ''){
        showMsg('Please enter member 3\'s birthday');
      } else if(document.getElementById('member3-country').value == ''){
        showMsg('Please enter member 3\'s country');
      } else if(document.getElementById('member3-institution').value == ''){
        showMsg('Please enter member 3\'s institution');
      } 
  } else if(document.getElementById('team-size').value == 'squad'){
      if(document.getElementById('member4-first-name').value == ''){
        showMsg('Please enter member 4\'s first name');
      } else if(document.getElementById('member4-last-name').value == ''){
        showMsg('Please enter member 4\'s last name');
      } else if(document.getElementById('member4-birthday').value == ''){
        showMsg('Please enter member 4\'s birthday');
      } else if(document.getElementById('member4-country').value == ''){
        showMsg('Please enter member 4\'s country');
      } else if(document.getElementById('member4-institution').value == ''){
        showMsg('Please enter member 4\'s institution');
      } 
  } else if(document.getElementById('team-size').value == 'quintet'){
      if(document.getElementById('member5-first-name').value == ''){
        showMsg('Please enter member 5\'s first name');
      } else if(document.getElementById('member5-last-name').value == ''){
        showMsg('Please enter member 5\'s last name');
      } else if(document.getElementById('member5-birthday').value == ''){
        showMsg('Please enter member 5\'s birthday');
      } else if(document.getElementById('member5-country').value == ''){
        showMsg('Please enter member 5\'s country');
      } else if(document.getElementById('member5-institution').value == ''){
        showMsg('Please enter member 5\'s institution');
      } 
  } else if(document.getElementById('member1-first-name').value == ''){
    showMsg('Please enter the leader\'s first name');
  } else if(document.getElementById('member1-last-name').value == ''){
    showMsg('Please enter the leader\'s last name');
  } else if(document.getElementById('member1-birthday').value == ''){
    showMsg('Please enter the leader\'s birthday');
  } else if(document.getElementById('member1-country').value == ''){
    showMsg('Please enter the leader\'s country');
  } else if(document.getElementById('member1-institution').value == ''){
    showMsg('Please enter the leader\'s institution');
  } else if(document.getElementById('paper-title').value == ''){
    showMsg('Please enter the paper title');
  } else if(!document.querySelector('input[name="paper-category"]:checked')){
    showMsg('Please select the paper category');
  } else if(!document.querySelector('input[name="paper-field"]:checked')){
    showMsg('Please select the paper field');
  } 
  else{
    let currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    let currentTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    const paperCategoryRadios = document.getElementsByName('paper-category');
const paperFieldRadios = document.getElementsByName('paper-field');

// Function to get the value of the checked radio input
function getCheckedRadioValue(radios) {
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
  return null; // Return null if no radio is checked
}
    const paperCategoryValue = getCheckedRadioValue(paperCategoryRadios);
const paperFieldValue = getCheckedRadioValue(paperFieldRadios);
    const formData = {
      TeamName: document.getElementById('team-name').value,
      TeamSize: document.getElementById('team-size').value,
      LeaderFirstName: document.getElementById('member1-first-name').value,
      LeaderLastName: document.getElementById('member1-last-name').value,
      LeaderEmailAddress: document.getElementById('member1-email-address').value,
      LeaderBirthday: document.getElementById('member1-birthday').value,
      LeaderCountry: document.getElementById('member1-country').value,
      Leaderinstitution: document.getElementById('member1-institution').value,
      Member2FirstName: document.getElementById('member2-first-name').value,
      Member2LastName: document.getElementById('member2-last-name').value,
      Member2EmailAddress: document.getElementById('member2-email-address').value,
      Member2Birthday: document.getElementById('member2-birthday').value,
      Member2Country: document.getElementById('member2-country').value,
      Member2institution: document.getElementById('member2-institution').value,
      Member3FirstName: document.getElementById('member3-first-name').value,
      Member3LastName: document.getElementById('member3-last-name').value,
      Member3EmailAddress: document.getElementById('member3-email-address').value,
      Member3Birthday: document.getElementById('member3-birthday').value,
      Member3Country: document.getElementById('member3-country').value,
      Member3institution: document.getElementById('member3-institution').value,
      Member4FirstName: document.getElementById('member4-first-name').value,
      Member4LastName: document.getElementById('member4-last-name').value,
      Member4EmailAddress: document.getElementById('member4-email-address').value,
      Member4Birthday: document.getElementById('member4-birthday').value,
      Member4Country: document.getElementById('member4-country').value,
      Member4institution: document.getElementById('member4-institution').value,
      Member5FirstName: document.getElementById('member5-first-name').value,
      Member5LastName: document.getElementById('member5-last-name').value,
      Member5EmailAddress: document.getElementById('member5-email-address').value,
      Member5Birthday: document.getElementById('member5-birthday').value,
      Member5Country: document.getElementById('member5-country').value,
      Member5institution: document.getElementById('member5-institution').value,
      paperCategorey: paperCategoryValue,
      paperField: paperFieldValue,
      date: currentDate,
      time: currentTime
    };
    submitForm(formData);
  }
});