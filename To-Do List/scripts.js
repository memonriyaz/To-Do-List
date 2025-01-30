document.addEventListener("DOMContentLoaded", () => {
  let addTaskButton = document.getElementById("addtask");
  let taskInput = document.getElementById("taskInput");
  let todoList = document.getElementById("todo-items");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => rendertask(task));
  console.log(tasks);
  

  addTaskButton.addEventListener("click", function () {
    let taskText = taskInput.value.trim();
    if (taskText === "") return;
    const task = {
      id: Date.now(),
      text: taskText,
      isCompleted: false,
    };
    tasks.push(task);
    saveTasks();
    rendertask(task);
    taskInput.value = "";
    console.log(tasks);
  });

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function rendertask(task) {
    const li = document.createElement("li");
    li.setAttribute("id", task.id);
    if (task.isCompleted) li.classList.add("completed");
    li.innerHTML = `
        <span>${task.text}</span>
        <button id="deleteTask">Delete</button>
        `;
    li.addEventListener("click", function (e) {
        if (e.target.tagName === "BUTTON") return;  
      task.isCompleted = !task.isCompleted;
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector("#deleteTask").addEventListener("click", function (e) {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      li.remove();
    });

    todoList.appendChild(li);
  }
});
