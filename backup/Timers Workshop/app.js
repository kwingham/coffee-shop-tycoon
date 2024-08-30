const toggleTimerBtn = document.getElementById("toggleTimerBtn");
const timerDisplay = document.getElementById("timerDisplay");
let timerId;
let time = 0;
let countingUp = true;

toggleTimerBtn.addEventListener("click", () => {
  if (!timerId) {
    timerId = setInterval(() => {
      if (countingUp) {
        time++;
        if (time === 5) {
          countingUp = false;
        }
      } else {
        time--;
        if (time === 0) {
          clearInterval(timerId);
          timerId = null;
          toggleTimerBtn.textContent = "Start Timer";
          return;
        }
      }
      timerDisplay.textContent = time;
    }, 1000); // 1 second interval
    toggleTimerBtn.textContent = "Stop Timer";
  } else {
    clearInterval(timerId);
    timerId = null;
    time = 0; // Reset the time when stopping
    countingUp = true; // Reset counting direction
    timerDisplay.textContent = time;
    toggleTimerBtn.textContent = "Start Timer";
  }
});
