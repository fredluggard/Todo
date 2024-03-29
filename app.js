//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event listener
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

let newTodo, todoDiv;

function addTodo(event) {
  //prevent form from submitting
  event.preventDefault();

  //TODO div
  todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create Li
  newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //add todo to local storage
  saveLocalTodos(todoInput.value);

  //Check Mark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //Edit Todo
  const editTodo = document.createElement("span");
  editTodo.innerHTML = "&#9998;";
  editTodo.classList.add("edit-btn");
  todoDiv.appendChild(editTodo);

  //Trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //Append to list
  if (newTodo.innerText === "") {
    alert("Please write what you want to do");
  } else {
    todoList.appendChild(todoDiv);
    //clear todo input value
    todoInput.value = "";
  }
}

function deleteCheck(e) {
  const item = e.target;

  //Edit todo
  if (item.classList[0] === "edit-btn") {
    editTodoItem(item.parentElement);
  }

  //delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //completed or check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function editTodoItem(todoElement) {
  const todoItem = todoElement.querySelector(".todo-item");
  const reTodo = document.createElement("input");
  reTodo.type = "text";
  reTodo.value = todoItem.innerText;
  reTodo.classList.add("todo-item", "edit-input");

  const markButton = document.createElement("button");
  markButton.innerHTML = '<i class="fas fa-check"></i>';
  markButton.classList.add("complete-btn1");

  reTodo.addEventListener("blur", () => {
    saveLocalTodos(reTodo.value);
    todoItem.innerText = reTodo.value;
    todoItem.classList.remove("hide");
    reTodo.remove();
    markButton.remove();
  });

  reTodo.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      saveLocalTodos(reTodo.value);
      todoItem.innerText = reTodo.value;
      todoItem.classList.remove("hide");
      reTodo.remove();
      markButton.remove();
    }
  });

  todoItem.classList.add("hide");
  todoDiv.appendChild(reTodo);
  todoDiv.appendChild(markButton);
  reTodo.focus();
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // check-- DO i have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  // check-- DO i have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //TODO div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
