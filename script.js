let tasks = [];

document.getElementById("addBtn").addEventListener("click", () => {
  const name = document.getElementById("taskInput").value.trim();
  if (!name) return alert("Please enter a task");

  const task = {
    id: Date.now(),
    name,
    startTime: null,
    totalTime: 0,
    interval: null
  };

  tasks.push(task);
  document.getElementById("taskInput").value = "";
  renderTasks();
});

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task";

    const content = document.createElement("div");
    content.innerHTML = `
      <div class="task-title">${task.name}</div>
      <div class="time-spent">Time: ${formatTime(task.totalTime)}</div>
    `;

    const btns = document.createElement("div");
    btns.className = "task-buttons";

    const startBtn = document.createElement("button");
    startBtn.className = "start-btn";
    startBtn.textContent = "▶ Start";
    startBtn.onclick = () => startTask(task.id);

    const stopBtn = document.createElement("button");
    stopBtn.className = "stop-btn";
    stopBtn.textContent = "⏸ Stop";
    stopBtn.onclick = () => stopTask(task.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "remove-btn";
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => removeTask(task.id);

    btns.append(startBtn, stopBtn, deleteBtn);
    li.append(content, btns);
    list.appendChild(li);
  });
}

function startTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task.interval) return;

  task.startTime = Date.now();
  task.interval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - task.startTime) / 1000);
    task.totalTime += elapsed;
    task.startTime = Date.now();
    renderTasks();
  }, 1000);
}

function stopTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task.interval) return;

  const elapsed = Math.floor((Date.now() - task.startTime) / 1000);
  task.totalTime += elapsed;
  clearInterval(task.interval);
  task.interval = null;
  task.startTime = null;
  renderTasks();
}

function removeTask(id) {
  const confirmDelete = confirm("Delete this task?");
  if (!confirmDelete) return;
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return (
    (h > 0 ? h + "h " : "") +
    (m > 0 ? m + "m " : "") +
    (s > 0 ? s + "s" : "")
  );
}
