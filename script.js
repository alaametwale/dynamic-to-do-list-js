document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false => do not save again to Local Storage
    }

    // Add a new task
    function addTask(taskText = null, save = true) {
        if (taskText === null) {
            taskText = taskInput.value.trim();
        }

        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            if (save) updateLocalStorage();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            updateLocalStorage();
        }

        taskInput.value = '';
    }

    // Update Local Storage with current tasks
    function updateLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push(li.firstChild.textContent); // exclude Remove button text
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addButton.addEventListener('click', () => addTask(null, true));
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(null, true);
        }
    });

    loadTasks();
});
