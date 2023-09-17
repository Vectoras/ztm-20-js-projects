// caching DOM elements -------------------------------//
const player = document.getElementById("player");
const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const speed = document.getElementById("player-speed");
const fullscreenBtn = document.querySelector(".fullscreen");

// Global variables
let muted = false;

// Play & Pause ----------------------------------- //

function showPlayIcon() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    video.pause();
    showPlayIcon();
  }
}

// Progress Bar ---------------------------------- //

// Convert time format
function convertTimeFormat(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

// Update current time on DOM
function updateCurrentTime() {
  currentTime.textContent = convertTimeFormat(video.currentTime);
}

// Update duration on DOM
function updateDuration() {
  duration.textContent = convertTimeFormat(video.duration);
}

// Update progress bar as video plays
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  updateCurrentTime();
}

// Set new time when click on progress bar
function setNewTime(e) {
  let newProgress = e.offsetX / e.currentTarget.clientWidth;
  video.currentTime = video.duration * newProgress;
}

// Volume Controls --------------------------- //

function updateVolumeVisuals(volume) {
  // updating the Icom
  if (volume === 0) volumeIcon.className = "fas fa-volume-off";
  else if (volume < 0.7) volumeIcon.className = "fas fa-volume-down";
  else if (volume >= 0.7) volumeIcon.className = "fas fa-volume-up";
  else {
    volumeIcon.className = "fas fa-volume-mute";
    volume = 0;
  }
  // updating the volume bar
  volumeBar.style.width = `${volume * 100}%`;
}

// Volume Bar
function changeVolume(e) {
  muted = false;
  // calculating the volume in procentage based on how the user clicked
  let volume = e.offsetX / e.currentTarget.clientWidth;
  // Rounding volume up or down and updating the volume icon
  if (volume < 0.1) volume = 0;
  else if (volume > 0.9) volume = 1;
  // updating the visuals
  updateVolumeVisuals(volume);
  // updating the volume (sound) itself
  video.volume = volume;
}

// Mute / Unmute

const toggleMute = (function () {
  let cachedVolume = 1;

  return function () {
    if (!muted) {
      cachedVolume = video.volume;
      muted = true;
      video.volume = 0;
      // updating the visuals
      updateVolumeVisuals("muted");
      volumeIcon.setAttribute("title", "Unmute");
    } else {
      muted = false;
      video.volume = cachedVolume;
      // updating the visuals
      updateVolumeVisuals(cachedVolume);
      volumeIcon.setAttribute("title", "Mute");
    }
  };
})();

// Change Playback Speed -------------------- //

function changeSpeed() {
  video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //

const toggleFullscreen = (function () {
  // Full Screen State boolean
  let isFullscreen = false;

  /* View in fullscreen */
  function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  function closeFullscreen(elem) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }

  return function () {
    !isFullscreen ? openFullscreen(player) : closeFullscreen();
    video.classList.toggle("video-fullscreen");
    isFullscreen = !isFullscreen;
  };
})();

// Event Listeners
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("ended", showPlayIcon); // On Video End, show play button icon
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", () => {
  updateDuration();
  updateCurrentTime();
  updateProgress();
});
progressRange.addEventListener("click", setNewTime);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changeSpeed);
fullscreenBtn.addEventListener("click", toggleFullscreen);
