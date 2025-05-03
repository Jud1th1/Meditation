/*===================================
            TOGGLE JS
=====================================*/
document.addEventListener("DOMContentLoaded", function () {
    const toggleCheckbox = document.getElementById("toggle-theme");
  
    toggleCheckbox.addEventListener("change", function () {
      document.body.classList.toggle("dark-theme", this.checked);
    });
  });
  
/* SAVE THEME PREFRENCE */
const toggle = document.getElementById("toggle-theme");
const body = document.body;

// On toggle
toggle.addEventListener("change", function () {
  if (this.checked) {
    body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
  }
});


window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");

    const toggle = document.getElementById("toggle-theme");
    if (toggle) toggle.checked = true; // sync the toggle on homepage
  }
});


/*===================================
            FLEXSLIDER JS
=====================================*/
$(window).on('load', function() {
    $('.flexslider').flexslider({
      animation: "slide",
      slideshowSpeed: 2000,
      reverse: false,
      pauseOnHover: true
    });
  });


/*===================================
           Meditation Timer JS
=====================================*/

let sound = document.getElementById('sound');
let minutesDisplay = document.getElementById('minutes');
let secondsDisplay = document.getElementById('seconds');

let timerInterval;
let isTimerRunning = false;
let fakeDuration = 600; // Default to 10 min

// Set default display
window.onload = () => {
  updateDisplay(fakeDuration);
};

// Utility: Update the MM:SS display
function updateDisplay(duration) {
  let minutes = Math.floor(duration / 60);
  let seconds = duration % 60;
  minutesDisplay.textContent = minutes.toString().padStart(2, '0');
  secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

// Start button
function start() {
  if (isTimerRunning) return;

  document.getElementById('start').style.display = "none";
  document.getElementById('reset').style.display = "inline-block";
  document.getElementById('pause').style.display = "inline-block";

  let currentTime = fakeDuration;

  sound.play();

  timerInterval = setInterval(() => {
    currentTime--;
    updateDisplay(currentTime);

    if (currentTime <= 0) {
      clearInterval(timerInterval);
      sound.pause();
      sound.currentTime = 0;
      isTimerRunning = false;
      document.getElementById('start').style.display = "inline-block";
      document.getElementById('reset').style.display = "none";
      document.getElementById('pause').style.display = "none";
    }
  }, 1000);

  isTimerRunning = true;
}

// Pause button
function pause() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  sound.pause();
}

// Reset button
function reset() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  sound.pause();
  sound.currentTime = 0;
  updateDisplay(fakeDuration);
  document.getElementById('start').style.display = "inline-block";
  document.getElementById('reset').style.display = "none";
  document.getElementById('pause').style.display = "none";
}

// Handle time-select buttons
const timeButtons = document.querySelectorAll('.time-select button');
timeButtons.forEach(button => {
  button.addEventListener('click', function () {
    fakeDuration = parseInt(this.getAttribute('data-time'));
    updateDisplay(fakeDuration);
    reset(); // Also stop/reset any running session
  });
});


