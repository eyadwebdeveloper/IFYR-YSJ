let urlParams = new URLSearchParams(window.location.search);
let activeTab = urlParams.get('tab');

let instructionsTab = document.getElementById('instructions-tab');
let appTab = document.getElementById('app-tab');


let instructions = document.getElementById('instructions-content');
let app = document.getElementById('app-content');


appTab.classList.remove('active');
instructionsTab.classList.add('active');
app.style.display = 'none';
instructions.style.display = 'block';

if(activeTab == 'instructions'){
  appTab.classList.remove('active');
  instructionsTab.classList.add('active');
  app.style.display = 'none';
  instructions.style.display = 'block';
} else if(activeTab == 'app'){
  appTab.classList.add('active');
  instructionsTab.classList.remove('active');
  instructions.style.display = 'none';
  app.style.display = 'block';

} 
const fileInput = document.getElementById('file-input');
  const fileContainer = document.getElementById('file-container');
  const fileNameElement = document.getElementById('file-name');
  const removeFileButton = document.getElementById('remove-file');
  removeFileButton.style.display = 'none';

  fileContainer.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    fileNameElement.innerHTML = `${file.name}  (${fileSizeInMB} MB)`;
    removeFileButton.style.display = 'block';
  });

  removeFileButton.addEventListener('click', () => {
    fileInput.value = '';
    fileNameElement.textContent = 'No file uploaded ';
    removeFileButton.style.display = 'none';
  });
  const radioInputs = document.querySelectorAll('input[name="if-upload"]');
const paperUploadCon = document.getElementById('paper-upload-con');

radioInputs.forEach((radio) => {
  radio.addEventListener('change', () => {
    if (radio.value === 'Yes') {
      paperUploadCon.style.display = 'block';
    } else {
      paperUploadCon.style.display = 'none';
    }
  });
});



document.getElementById('member2').style.display = 'none';
document.getElementById('member3').style.display = 'none';
document.getElementById('member4').style.display = 'none';
document.getElementById('member5').style.display = 'none';
document.getElementById('team-size').addEventListener('change', function() {
    var selectedValue = document.getElementById('team-size').value;
    console.log("Selected team size:", selectedValue);
    if (selectedValue == 'solo'){
      document.getElementById('member2').style.display = 'none';
      document.getElementById('member3').style.display = 'none';
      document.getElementById('member4').style.display = 'none';
      document.getElementById('member5').style.display = 'none';
    }
    else if(selectedValue == 'due'){
      document.getElementById('member2').style.display = 'block';
      document.getElementById('member3').style.display = 'none';
      document.getElementById('member4').style.display = 'none';
      document.getElementById('member5').style.display = 'none';
    } else if(selectedValue == 'trio'){
      document.getElementById('member2').style.display = 'block';
      document.getElementById('member3').style.display = 'block';
      document.getElementById('member4').style.display = 'none';
      document.getElementById('member5').style.display = 'none';
    } else if(selectedValue == 'squad'){
      document.getElementById('member2').style.display = 'block';
      document.getElementById('member3').style.display = 'block';
      document.getElementById('member4').style.display = 'block';
      document.getElementById('member5').style.display = 'none';
    } else if(selectedValue == 'quintet'){
      document.getElementById('member2').style.display = 'block';
      document.getElementById('member3').style.display = 'block';
      document.getElementById('member4').style.display = 'block';
      document.getElementById('member5').style.display = 'block';
    } 
  });