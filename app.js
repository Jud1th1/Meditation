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
      slideshowSpeed: 2000,
      reverse: false,
      pauseOnHover: true
    });
  }


/*===================================
           Meditation Timer JS
=====================================*/

const sound = document.getElementById('sound');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const pauseBtn = document.getElementById('pause');
const timeButtons = document.querySelectorAll('.time-select button');

if (sound && minutesDisplay && secondsDisplay && startBtn) {
  let timerInterval;
  let isTimerRunning = false;
  let fakeDuration = 600;

  // Init display
  updateDisplay(fakeDuration);

  function updateDisplay(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
  }

  function start() {
    if (isTimerRunning) return;

    startBtn.style.display = "none";
    resetBtn.style.display = "inline-block";
    pauseBtn.style.display = "inline-block";

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
        startBtn.style.display = "inline-block";
        resetBtn.style.display = "none";
        pauseBtn.style.display = "none";
      }
    }, 1000);

    isTimerRunning = true;
  }

  function pause() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    sound.pause();
  }

  function reset() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    sound.pause();
    sound.currentTime = 0;
    updateDisplay(fakeDuration);
    startBtn.style.display = "inline-block";
    resetBtn.style.display = "none";
    pauseBtn.style.display = "none";
  }

  startBtn.addEventListener('click', start);
  resetBtn.addEventListener('click', reset);
  pauseBtn.addEventListener('click', pause);

  timeButtons.forEach(button => {
    button.addEventListener('click', function () {
      fakeDuration = parseInt(this.getAttribute('data-time'));
      updateDisplay(fakeDuration);
      reset();
    });
  });
}
});