let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.textContent = task.text;
        if (task.completed) {
            li.classList.add("completed");
        }

        // Mark complete
        li.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        };

        // Delete button
        let delBtn = document.createElement("button");
        delBtn.textContent = "X";
        delBtn.classList.add("delete-btn");

        delBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTask(index);
        };

        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (text === "") return;

    tasks.push({ text: text, completed: false });
    saveTasks();
    renderTasks();

    input.value = "";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Load tasks on page load
renderTasks();