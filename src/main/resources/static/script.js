const API = "http://localhost:8080/api/tasks";

async function loadTasks() {
    const response = await fetch(API);
    const tasks = await response.json();

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        taskList.innerHTML += `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>${task.priority}</p>
                <p>${task.status}</p>
                <hr>
            </div>
        `;
    });
}

async function addTask() {

    const task = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value,
        status: document.getElementById("status").value
    };

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });

    loadTasks();
}

async function deleteTask(id) {

    await fetch(API + "/" + id, {
        method: "DELETE"
    });

    loadTasks();
}

loadTasks();