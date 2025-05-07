document.addEventListener("DOMContentLoaded", function () {

/*===================================
            TOGGLE JS
=====================================*/
  const toggleCheckbox = document.getElementById("toggle-theme");
  if (toggleCheckbox) {
    toggleCheckbox.addEventListener("change", function () {
      document.body.classList.toggle("dark-theme", this.checked);
      localStorage.setItem("theme", this.checked ? "dark" : "light");
    });

    // Set saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
      toggleCheckbox.checked = true;
    }
  }


/*===================================
            FLEXSLIDER JS
=====================================*/
  if ($('.flexslider').length) {
    $('.flexslider').flexslider({
      animation: "slide",
      slideshowSpeed: 3000,
      reverse: false,
      pauseOnHover: true
    });
  }


/*===================================
           Meditation Timer JS
=====================================*/

const sound = document.getElementById('sound');
  if (sound) {
    const path = window.location.pathname;

    if (path.includes("jazz")) {
      sound.volume = 0.3; // Adjusted for Jazz page
    } else if (path.includes("forest")) {
      sound.volume = 0.35; // Adjusted for Forest page
    } else {
      sound.volume = 0.5; // Default volume for other pages
    }
  }

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const pauseBtn = document.getElementById('pause');
const timeButtons = document.querySelectorAll('.time-select button');
const audio = document.querySelector("audio");

audio.loop = true;

  if (startBtn && minutesDisplay && secondsDisplay && resetBtn) {
  let timerInterval;
  let isTimerRunning = false;
  let fakeDuration = 600;

  
  updateDisplay(fakeDuration);

  function updateDisplay(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
  }

  const startIcon = startBtn.querySelector('i'); 
  let currentTime = fakeDuration;
  
  function togglePlay() {
    if (!isTimerRunning) {
      // START
      sound.play();
      timerInterval = setInterval(() => {
        currentTime--;
        updateDisplay(currentTime);
  
        if (currentTime <= 0) {
          clearInterval(timerInterval);
          sound.pause();
          sound.currentTime = 0;
          isTimerRunning = false;
          startIcon.className = "fa-solid fa-play";
        }
      }, 1000);
  
      startIcon.className = "fa-solid fa-pause";
      isTimerRunning = true;
    } else {
      // PAUSE
      clearInterval(timerInterval);
      sound.pause();
      startIcon.className = "fa-solid fa-play";
      isTimerRunning = false;
    }
  }
    
  startBtn.addEventListener('click', togglePlay);    

  function reset() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    sound.pause();
    sound.currentTime = 0;
    currentTime = fakeDuration;
    updateDisplay(fakeDuration);
    startIcon.className = "fa-solid fa-play";
  }
    
  resetBtn.addEventListener('click', reset);

  timeButtons.forEach(button => {
    button.addEventListener('click', function () {
      fakeDuration = parseInt(this.getAttribute('data-time'));
      updateDisplay(fakeDuration);
      reset();
    });
  });
}
});