// Array to store tasks
const tasks = [];

// DOM elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date-input');
const priorityInput = document.getElementById('priority-input');
const taskTable = document.getElementById('task-table');

// Function to render tasks
function renderTasks() {
  taskTable.querySelector('tbody').innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const row = document.createElement('tr');
    row.innerHTML = `<td>${task.name}</td> <td>${task.dueDate}</td> <td>${task.priority}</td> <td> ${task.completed ? '<input type="checkbox" checked disabled>' : `<input type="checkbox" data-index="${i}">`} </td> <td> <button class="delete-btn" data-index="${i}">Delete</button> </td>`;
    if (task.completed) {
      row.classList.add('completed');
    }
    taskTable.querySelector('tbody').appendChild(row);
  }
}

// Function to add a new task
function addTask(event) {
  event.preventDefault();
  const name = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = priorityInput.value;
  if (name === '') {
    alert('Please enter a task name');
    return;
  }
  tasks.push({
    name,
    dueDate,
    priority,
    completed: false
  });
  taskForm.reset();
  renderTasks();
}

// Function to delete a task
function deleteTask(event) {
  if (event.target.classList.contains('delete-btn')) {
    const index = event.target.dataset.index;
    tasks.splice(index, 1);
    renderTasks();
  }
}

function completeTask(event) {
  if (event.target.type === 'checkbox') {
    const index = event.target.dataset.index;
    tasks[index].completed = event.target.checked;
    renderTasks();
  }
}

// Attach event listeners
taskForm.addEventListener('submit', addTask);
taskTable.addEventListener('click', deleteTask);
taskTable.addEventListener('change', completeTask);

// Initial render
renderTasks();
