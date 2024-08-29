const showMessageBtn = document.getElementById("showMessageBtn");
const message = document.getElementById("message");

showMessageBtn.addEventListener("click", () => {
  message.style.display = "block";
  setTimeout(() => {
    message.style.display = "none";
  }, 5000); // 5 seconds
});

// Part 2: setInterval
const toggleTimerBtn = document.getElementById("toggleTimerBtn");
const timerDisplay = document.getElementById("timerDisplay");
let timerId;
let time = 0;

toggleTimerBtn.addEventListener("click", () => {
  if (!timerId) {
    timerId = setInterval(() => {
      time++;
      timerDisplay.textContent = time;
    }, 1000); // 1 second
    toggleTimerBtn.textContent = "Stop Timer";
  } else {
    clearInterval(timerId);
    timerId = null;
    toggleTimerBtn.textContent = "Start Timer";
  }
});
