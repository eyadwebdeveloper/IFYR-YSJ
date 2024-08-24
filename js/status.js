let urlParams = new URLSearchParams(window.location.search);
let activeTab = urlParams.get('tab');

let statusTab = document.getElementById('status-tab');
let announcmentsTab = document.getElementById('announcments-tab');


let status = document.getElementById('status-content');
let announcments = document.getElementById('announcments-content');


announcmentsTab.classList.remove('active');
statusTab.classList.add('active');
announcments.style.display = 'none';
status.style.display = 'block';

if(activeTab == 'status'){
  announcmentsTab.classList.remove('active');
  statusTab.classList.add('active');
  announcments.style.display = 'none';
  status.style.display = 'block';
} else if(activeTab == 'announcments'){
  announcmentsTab.classList.add('active');
  statusTab.classList.remove('active');
  status.style.display = 'none';
  announcments.style.display = 'block';

} 