// Pomodoro Logic
let time = 25 * 60;
let timerInterval;
let isRunning = false;

function updateTimerDisplay() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  document.getElementById("timer").textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(() => {
      if (time > 0) {
        time--;
        updateTimerDisplay();
      } else {
        pauseTimer();
        alert("Time's up!");
        time = 5 * 60; // break
        updateTimerDisplay();
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  time = 25 * 60;
  updateTimerDisplay();
}

updateTimerDisplay();

// Task List Logic
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText !== "") {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");

    li.textContent = taskText;

    const remove = document.createElement("button");
    remove.textContent = "✕";
    remove.onclick = () => li.remove();
    remove.style.marginLeft = "10px";

    li.appendChild(remove);
    taskList.appendChild(li);
    input.value = "";
  }
}
