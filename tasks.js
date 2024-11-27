document.addEventListener("DOMContentLoaded", () => {
  todos = JSON.parse(window.localStorage.getItem("todos")) || [];
  const input_name = document.getElementById("name");
  const form = document.getElementById("new-todo-form");

  const username = window.localStorage.getItem("username") || "";
  input_name.value = username;
  input_name.addEventListener("change", (e) => {
    window.localStorage.setItem("username", e.target.value);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (content.value === "") {
      return;
    }
    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      id: new Date().getTime(),
    };
    todos.push(todo);

    window.localStorage.setItem("todos", JSON.stringify(todos));
    e.target.reset();
    displaytodos();
    // console.log(Array.isArray (todos));
    // localStorage.clear()
  });
  displaytodos();
});

function displaytodos() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const media = document.createElement("div");
    media.classList.add("media");

    const label = document.createElement("label");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = todo.done;

    const span = document.createElement("span");
    span.classList.add("bubble");

    const content = document.createElement("div"); //input
    content.classList.add("todo-content");

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const edit = document.createElement("button");
    edit.classList.add("edit");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");

    if (todo.category == "important") {
      span.classList.add("important");
    } else {
      span.classList.add("normal");
    }
    content.innerHTML = `<input type="text" value="${todo.content}" readonly />`;
    edit.innerHTML = "Edit";
    deleteBtn.innerHTML = "Delete";
    media.appendChild(label);
    media.appendChild(content);
    media.appendChild(actions);
    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteBtn);
    todoItem.appendChild(media);
    todoList.appendChild(todoItem);

    function handleSave() {
      const input = content.querySelector("input[type='text']");
      input.setAttribute("readonly", "true");
      edit.innerHTML = "Edit";
      todo.content = input.value;
      localStorage.setItem("todos", JSON.stringify(todos));
      displaytodos();
    }

    edit.addEventListener("click", () => {
      const input = content.querySelector("input[type='text']");
      if (edit.innerHTML.toLowerCase() == "edit") {
        input.removeAttribute("readonly");
        input.focus();
        edit.innerHTML = "Save";
        ed = input.value;
        input.value = "";
        input.value = ed;

        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            handleSave();
          }
        });
      } else {
        handleSave();
      }
    });

    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      displaytodos();
    });

    if (todo.done) {
      todoItem.classList.add("done");
    }
    input.addEventListener("click", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));
      if (todo.done) {
        content.classList.add("done");
      } else {
        content.classList.remove("done");
      }
      displaytodos();
    });
  });
}
const up = document.getElementById("up");
window.addEventListener("scroll", () => {
  if (window.scrollY >= 250) {
    up.style.display = "block";
  } else {
    up.style.display = "none";
  }
});
up.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  up.style.display = "none";
});
const mail = document.getElementById("mail");
const mail_icon = document.getElementById("mail-icon");
const title = document.getElementById("title");
const bigmail = document.getElementById("bigmail");
const intro = document.getElementById("intro");
mail_icon.addEventListener("click", () => {
  mail.classList.toggle("appear");
  if (mail.innerText === "") {
    mail.innerHTML = `<a href="mailto:white_lion_mina@yahoo.com">Send Email</a>`;
    title.style.display = "none";
  } else {
    mail.innerText = "";
    title.style.display = "block";
  }
  if (mail_icon.classList.contains("fa-user")) {
    mail_icon.classList.remove("fa-user");
    mail_icon.classList.add("fa-delete-left");
  } else {
    mail_icon.classList.remove("fa-delete-left");
    mail_icon.classList.add("fa-user");
  }
  const main = document.querySelector("main");
  main.classList.toggle("blur");
});

const toggle = document.getElementById("toggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggle.classList.toggle("rotate");
});
