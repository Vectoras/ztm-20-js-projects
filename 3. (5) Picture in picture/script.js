console.log(Document.pictureInPictureEnabled);

const videoElement = document.getElementById('videoElement');
const button = document.getElementById('button');
let mediaStream = null;

// ---------- functions

async function selectMediaStream () {
  try {
    mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
  } catch (error) {
    console.log('Error at selecting the Media Stream:', error);
  }
}

// ------- events

button.addEventListener('click', selectMediaStream);
videoElement.addEventListener('loadedmetadata', async () => {
    videoElement.play();
    let pipWindow = await videoElement.requestPictureInPicture();
    pipWindow.height = 500;
  }
);