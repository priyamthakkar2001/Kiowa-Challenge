document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task');
    const inputField = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        // Sort tasks to keep uncompleted on top before saving
        tasks.sort((a, b) => a.completed - b.completed);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTask = () => {
        const taskText = inputField.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            renderTasks();
            inputField.value = '';
        }
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskElement = document.createElement('li');
            taskElement.className = 'flex items-center justify-between bg-gray-100 p-4 rounded shadow';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.className = 'form-checkbox h-5 w-5 text-blue-600';
            checkbox.onchange = () => toggleCompletion(index);

            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            taskText.className = 'ml-2 flex-1';

            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'flex items-center space-x-2';

            const moveUpButton = document.createElement('button');
            moveUpButton.innerHTML = '&#x25B2;';
            moveUpButton.className = 'text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded';
            moveUpButton.onclick = () => moveTask(index, -1);

            const moveDownButton = document.createElement('button');
            moveDownButton.innerHTML = '&#x25BC;';
            moveDownButton.className = 'text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded';
            moveDownButton.onclick = () => moveTask(index, 1);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.className = 'text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded';
            deleteButton.onclick = () => deleteTask(index);

            buttonContainer.append(moveUpButton, moveDownButton, deleteButton);
            taskElement.append(checkbox, taskText, buttonContainer);
            taskList.appendChild(taskElement);
        });
    };

    const toggleCompletion = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    const moveTask = (currentIndex, direction) => {
        const newPosition = currentIndex + direction;
        if (newPosition < 0 || newPosition >= tasks.length) return; // Prevent moving out of array bounds

        const itemToMove = tasks[currentIndex];
        tasks.splice(currentIndex, 1); // Remove item from current position
        tasks.splice(newPosition, 0, itemToMove); // Insert item in new position

        saveTasks();
        renderTasks();
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    addButton.addEventListener('click', addTask);

    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
});
