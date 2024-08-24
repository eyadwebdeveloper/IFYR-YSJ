let urlParams = new URLSearchParams(window.location.search);
let activeTab = urlParams.get('tab');

let loginTab = document.getElementById('login-tab');
let createTab = document.getElementById('create-tab');
let forgotTab = document.getElementById('forgot-tab');



let login = document.getElementById('login-form');
let create = document.getElementById('create-form');
let forgot = document.getElementById('forgot-form');



createTab.classList.remove('active');
forgotTab.classList.remove('active');
loginTab.classList.add('active');
create.style.display = 'none';
forgot.style.display = 'none';
login.style.display = 'block';

if(activeTab == 'login'){
  createTab.classList.remove('active');
  forgotTab.classList.remove('active');
  loginTab.classList.add('active');
  create.style.display = 'none';
  forgot.style.display = 'none';
  login.style.display = 'block';
} else if(activeTab == 'create'){
  createTab.classList.add('active');
  loginTab.classList.remove('active');
  forgotTab.classList.remove('active');
  login.style.display = 'none';
  forgot.style.display = 'none';
  create.style.display = 'block';
}  else if(activeTab == 'forgot'){
  createTab.classList.remove('active');
  loginTab.classList.remove('active');
  forgotTab.classList.add('active');
  login.style.display = 'none';
  forgot.style.display = 'block';
  create.style.display = 'none';
} 