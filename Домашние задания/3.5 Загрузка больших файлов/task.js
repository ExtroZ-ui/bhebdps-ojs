const form = document.getElementById('form');
const progress = document.getElementById('progress');

function updateProgress(event) {
  if (event.lengthComputable) {
    progress.value = event.loaded / event.total;
  }
}

function sendFile(event) {
  event.preventDefault();
  progress.value = 0;

  const xhr = new XMLHttpRequest();
  const formData = new FormData(form);

  xhr.open('POST', form.action);

  xhr.upload.addEventListener('progress', updateProgress);

  xhr.addEventListener('load', function () {
    progress.value = 1;
  });

  xhr.addEventListener('error', function () {
    progress.value = 0;
  });

  xhr.send(formData);
}

form.addEventListener('submit', sendFile);