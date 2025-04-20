document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')); // Retrieve tasks from local storage

    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task)); // Populate tasks array with stored tasks
        updateTaskList(); // Update the task list on page load
        updateStats(); // Update stats on page load
    }
 
})

let tasks = [];


const saveTasks = () => {
    localStorage.setItem('tasks',JSON.stringify(tasks)); // Save to local storage
}

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();

    if (task) {
        tasks.push({ text: task, completed: false }); // Add task to the tasks array
        updateTaskList(); // Update the task list
        taskInput.value = ""; // Clear input field
        saveTasks(); // Save tasks to local storage
    }
};

const updateTaskList = () => {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear the task list

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskCompletion(${index})" />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./image/edit.png" onclick="editTask(${index})" alt="Edit Task" style="height:1.7rem; width:1.7rem;"/>
                    <img src="./image/delete.png" onclick="deleteTask(${index})" alt="Delete Task" style="height:1.7rem; width:1.7rem;"/>
                </div>
            </div>
        `;
        taskList.appendChild(listItem);
    });

    updateStats(); // Update stats after the list is updated
};

const toggleTaskCompletion = (index) => {
    tasks[index].completed = !tasks[index].completed; // Toggle task completion status
    updateTaskList(); // Refresh the task list
    saveTasks(); // Save tasks to local storage
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text; // Set the input field to the task text
    deleteTask(index); // Remove the task so it can be re-added
    taskInput.focus(); // Focus on the input field
    saveTasks(); // Save tasks to local storage
};

const deleteTask = (index) => {
    tasks.splice(index, 1); // Remove the task from the array
    updateTaskList(); // Refresh the task list
    saveTasks(); // Save tasks to local storage
};

const updateStats = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    // Update the task counter (e.g., "1 / 4")
    const numberElement = document.getElementById('number');
    numberElement.textContent = `${completedTasks} / ${totalTasks}`;

    // Update the progress bar
    const progressElement = document.getElementById('progress');
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    progressElement.style.width = `${progressPercentage}%`;
};

// Add event listener to the "Add Task" button
document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent form submission
    addTask(); // Add a new task
});