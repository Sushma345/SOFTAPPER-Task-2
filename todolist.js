
document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('taskInput');
  const priorityInput = document.getElementById('priorityInput');
  const addTaskButton = document.getElementById('addTaskButton');
  const taskList = document.getElementById('taskList');

  addTaskButton.addEventListener('click', addTask);

  function addTask() {
      const taskText = taskInput.value.trim();
      const priority = priorityInput.value;

      if (taskText === '') {
          alert('Please enter a task.');
          return;
      }

      const taskItem = document.createElement('li');
      taskItem.className = 'task-item';
      taskItem.dataset.priority = priority;
      taskItem.innerHTML = `
          <span>${taskText} - <strong>${priority}</strong></span>
          <div class="actions">
              <button class="complete-btn">Complete</button>
              <button class="edit-btn">Edit</button>
              <button class="delete-btn">Delete</button>
          </div>
      `;

      taskList.appendChild(taskItem);
      taskInput.value = '';

      const completeBtn = taskItem.querySelector('.complete-btn');
      const editBtn = taskItem.querySelector('.edit-btn');
      const deleteBtn = taskItem.querySelector('.delete-btn');

      completeBtn.addEventListener('click', () => {
          taskItem.classList.toggle('completed');
      });

      editBtn.addEventListener('click', () => {
          const newTaskText = prompt('Edit your task:', taskText);
          if (newTaskText !== null) {
              taskItem.querySelector('span').innerHTML = `${newTaskText} - <strong>${priority}</strong>`;
          }
      });

      deleteBtn.addEventListener('click', () => {
          taskList.removeChild(taskItem);
      });

      sortTasks();
  }

  function sortTasks() {
      const tasks = Array.from(taskList.children);
      tasks.sort((a, b) => {
          const priorityA = getPriorityValue(a.dataset.priority);
          const priorityB = getPriorityValue(b.dataset.priority);
          return priorityB - priorityA;
      });
      tasks.forEach(task => taskList.appendChild(task));
  }

  function getPriorityValue(priority) {
      switch (priority) {
          case 'High': return 3;
          case 'Medium': return 2;
          case 'Low': return 1;
          default: return 0;
      }
  }
});
