
// Select HTML elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Store all tasks in an array
let tasks = [];


// Add new task
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskDescription = taskInput.value.trim();

    // Check if input is empty
    if (taskDescription === "") {
        return;
    }

    // Create a task object
    const newTask = {
        id: Date.now(),
        description: taskDescription,
        completed: false
    };

    // Add task to array
    tasks.push(newTask);

    // Clear input field
    taskInput.value = "";

    // Update the task list
    renderTasks();
});


// Render all tasks
function renderTasks() {

    // Remove previous tasks from the DOM
    taskList.innerHTML = "";

    // Separate pending and completed tasks
    const pendingTasks = tasks.filter(function (task) {
        return task.completed === false;
    });

    const completedTasks = tasks.filter(function (task) {
        return task.completed === true;
    });

    // Show pending tasks first
    // Then show completed tasks
    const sortedTasks = [...pendingTasks, ...completedTasks];

    sortedTasks.forEach(function (task) {

        // Create list item
        const li = document.createElement("li");
        li.classList.add("task-item");

        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");
        checkbox.checked = task.completed;

        // Create task text
        const span = document.createElement("span");
        span.classList.add("task-text");
        span.textContent = task.description;

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.innerHTML = "▣";
        deleteButton.setAttribute("aria-label", "Delete task");

        // Add completed class if task is completed
        if (task.completed) {
            li.classList.add("completed");
        }

        // Checkbox event
        checkbox.addEventListener("change", function () {

            task.completed = checkbox.checked;

            renderTasks();
        });

        // Delete button event
        deleteButton.addEventListener("click", function () {

            tasks = tasks.filter(function (item) {
                return item.id !== task.id;
            });

            renderTasks();
        });

        // Add elements to list item
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        // Add list item to the task list
        taskList.appendChild(li);

    });
}
