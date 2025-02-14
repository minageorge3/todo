document.addEventListener("DOMContentLoaded", () => {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (!Array.isArray(tasks)) {
    tasks = [];
  }
  let inner = document.querySelectorAll(".inner-text");

  let input = document.getElementById("input");

  // name
  let name = document.querySelector("#name input");
  let userName = localStorage.getItem("username");
  if (userName) {
    name.value = userName;
  }

  name.addEventListener("change", (e) => {
    // if (name.value === "" || !/^[a-zA-Z]+$/.test(name.value)) {
    //   alert("only one name without spaces, please...");
    //   return;
    // }
    localStorage.setItem("username", e.target.value);
  });
  name.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      localStorage.setItem("username", e.target.value);
      name.blur();
    }
  });
  // name

  //******************* */ bar ***************
  //******************* */ bar ***************
  const hamburger = document.querySelector(".hamburger");
  const bars = document.querySelector(".bars");
  const close = document.getElementById("close");

  let isMenuOpen = false; // to not open menu automatically when resizing
  // function for resizing when click and resize window
  const updateBarsWidth = () => {
    if (isMenuOpen) {
      if (window.innerWidth <= 600) {
        bars.style.width = "100%";
      } else {
        bars.style.width = "30%";
      }
    }
  };
  // function for resizing when click and resize window

  // open menu
  hamburger.addEventListener("click", () => {
    isMenuOpen = true;
    updateBarsWidth();
    hamburger.style.visibility = "hidden";
  });
  // open menu

  // media queriry
  window.addEventListener("resize", () => {
    updateBarsWidth();
  });
  // media queriry

  // close button
  close.addEventListener("click", () => {
    isMenuOpen = false;
    bars.style.width = "0";
    hamburger.style.visibility = "visible";
  });
  // close button

  // close menu when click on page
  const closeMenu = () => {
    isMenuOpen = false;
    bars.style.width = "0";
    hamburger.style.visibility = "visible";
  };
  document.addEventListener("click", (event) => {
    if (
      isMenuOpen &&
      !bars.contains(event.target) &&
      !hamburger.contains(event.target)
    ) {
      closeMenu();
    }
  });
  // close menu when click on page

  const small1 = document.getElementById("small1");
  const small2 = document.getElementById("small2");
  const back1 = document.getElementById("back1");
  const back2 = document.getElementById("back2");
  const front1 = document.getElementById("front1");
  const front2 = document.getElementById("front2");
  back1.style.transform = "rotateX(180deg)";
  back2.style.transform = "rotateX(180deg)";
  front1.style.transform = "rotateX(0deg)";
  front2.style.transform = "rotateX(0deg)";

  small1.addEventListener("click", () => {
    if (back1.style.transform === "rotateX(180deg)") {
      back1.style.transform = "rotateX(0deg)";
      front1.style.transform = "rotateX(180deg)";
    } else {
      back1.style.transform = "rotateX(180deg)";
      front1.style.transform = "rotateX(0deg)";
    }
  });
  small2.addEventListener("click", () => {
    if (back2.style.transform === "rotateX(180deg)") {
      back2.style.transform = "rotateX(0deg)";
      front2.style.transform = "rotateX(180deg)";
    } else {
      back2.style.transform = "rotateX(180deg)";
      front2.style.transform = "rotateX(0deg)";
    }
  });

  //******************************* */ bar *************
  // colors
  let label = document.querySelectorAll(".label");
  let color = document.querySelectorAll(".color");
  let create = document.querySelector(".create");

  if (localStorage.getItem("color") && localStorage.getItem("text")) {
    document.body.style.backgroundColor = localStorage.getItem("color");
    create.style.backgroundColor = localStorage.getItem("color");
    document.body.style.color = localStorage.getItem("text");
    input.style.color = localStorage.getItem("text");
    inner.forEach((e) => {
      e.style.color = localStorage.getItem("text");
    });

    if (localStorage.getItem("label")) {
      label.forEach((e) => {
        e.style.color = localStorage.getItem("label");
      });
    }
    color.forEach((col) => {
      col.classList.remove("co");
    });
    let storedColor = document.querySelector(
      `[data-color="${localStorage.getItem("color")}"]`
    );
    if (storedColor) {
      storedColor.classList.add("co");
    }
  }
  color.forEach((col) => {
    col.addEventListener("click", (e) => {
      color.forEach((col) => {
        col.classList.remove("co");
      });
      e.target.classList.add("co");
      localStorage.setItem("color", e.target.dataset.color);
      document.body.style.backgroundColor = localStorage.getItem("color");
      create.style.backgroundColor = localStorage.getItem("color");
      localStorage.setItem("text", e.target.dataset.text);
      document.body.style.color = localStorage.getItem("text");
      input.style.color = localStorage.getItem("text");
      inner.forEach((e) => {
        e.style.color = localStorage.getItem("text");
      });

      localStorage.setItem("label", e.target.dataset.label);
      label.forEach((e) => {
        e.style.color = localStorage.getItem("label");
      });
    });
  });
  // colors
  // form
  let form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = input.value.trim();
    if (inputValue === "") {
      return;
    }
    const newTask = {
      content: inputValue,
      category: e.target.elements.category.value,
      done: false,
    };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    form.reset();
    display();
  });
  display();
  // form
  // localStorage.clear()
  function display() {
    const tasksList = document.getElementById("tasks-list");
    tasksList.innerHTML = "";
    tasks.forEach((task) => {
      const taskList = document.createElement("div");
      taskList.classList.add("task");
      tasksList.appendChild(taskList);

      const wrap = document.createElement("div");
      wrap.classList.add("wrap");
      taskList.appendChild(wrap);

      const label = document.createElement("label");
      // taskList.appendChild(label);
      wrap.appendChild(label);

      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = task.done;
      label.appendChild(input);

      // normal and important
      const span = document.createElement("span");
      span.classList.add("bubble");
      label.appendChild(span);

      if (task.category === "normal") {
        span.classList.add("normal");
      } else if (task.category === "important") {
        span.classList.add("important");
      }
      // normal and important

      // content
      const text = document.createElement("div");
      text.classList.add("text");
      // taskList.appendChild(text);
      wrap.appendChild(text);

      const innerText = document.createElement("input");
      innerText.classList.add("inner-text");
      innerText.setAttribute("readonly", "true");
      innerText.value = task.content;
      text.appendChild(innerText);

      // content

      const action = document.createElement("div");
      action.classList.add("action");
      const edit = document.createElement("button");
      edit.classList.add("edit");
      edit.innerHTML = "Edit <span>&#9998;</span>";
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete");
      deleteBtn.innerHTML =
        "Delete <span style='font-weight:bold'>&#128465;</span>";
      action.appendChild(edit);
      action.appendChild(deleteBtn);
      taskList.appendChild(action);
      // done check
      if (task.done) {
        text.classList.add("done");
      } else {
        text.classList.remove("done");
      }
      input.addEventListener("click", (e) => {
        task.done = e.target.checked;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        display();
      });
      // done check
      // del button
      deleteBtn.addEventListener("click", () => {
        tasks = tasks.filter((t) => t != task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        display();
      });
      // edit button
      function enterKey() {
        task.content = innerText.value;
        innerText.setAttribute("readonly", "true");
        edit.innerHTML = "Saved <span style='font-weight:bold'>✔</span>";
        setTimeout(() => {
          edit.innerHTML = "Edit <span>&#9998;</span>";
        }, 3000);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }

      edit.addEventListener("click", () => {
        if (edit.innerHTML.includes("Edit")) {
          edit.innerHTML = "save";
          innerText.removeAttribute("readonly");
          innerText.focus();
          innerText.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              enterKey();
            }
          });
        } else {
          enterKey();
        }
      });
      // edit button
    });
  }
  const up = document.getElementById("up");
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 100) {
      up.style.display = "inline-block";
    } else {
      up.style.display = "none";
    }
  });
  up.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  // xoGAME ><><><<><><><><<><><><><><>< xoxoxoxoxoxoxoxoxoxo
  // xoGAME ><><><<><><><><<><><><><><>< xoxoxoxoxoxoxoxoxoxo
  // const light = document.getElementById("light");
  // light.addEventListener("click", () => {
  //   if (light.classList.contains("fa-solid")) {
  //     change("light");
  //   } else {
  //     change("dark");
  //   }
  // });
  // function change(mood) {
  //   if (mood === "light") {
  //     document.body.style.backgroundColor = "#dadada";
  //     light.classList.remove("fa-solid");
  //     light.classList.add("fa-regular");
  //     light.style.color = "#000";
  //     XOgrid.style.color = "#000";
  //     localStorage.setItem("mood", "light");
  //   } else {
  //     XOgrid.style.backgroundColor = "#1b182cf4";
  //     light.classList.add("fa-solid");
  //     light.classList.remove("fa-regular");
  //     light.style.color = "#fff";
  //     XOgrid.style.color = "#fff";
  //     localStorage.setItem("mood", "dark");
  //   }
  // }
  // const getMood = localStorage.getItem("mood") || "dark";
  // change(getMood);
  //
  let boxes = document.querySelectorAll(".box");
  let turn = "x";
  let gameOver = false;
  const result = document.getElementById("result");
  const playAgain = document.getElementById("play-again");
  const bg = document.querySelector(".bg");

  boxes.forEach((e) => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
      if (e.innerHTML === "" && !gameOver) {
        e.innerHTML = turn;
        checkWin();
        checkDraw();
        if (!gameOver) {
          switchTurn();
        }
      }
    });
  });

  function switchTurn() {
    if (turn === "x") {
      turn = "o";
      bg.style.left = "5rem";
    } else {
      turn = "x";
      bg.style.left = "0";
    }
  }

  function checkWin() {
    let winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    winConditions.forEach((w) => {
      let one = boxes[w[0]].innerHTML;
      let two = boxes[w[1]].innerHTML;
      let three = boxes[w[2]].innerHTML;
      if (one !== "" && one === two && two === three) {
        gameOver = true;
        result.innerHTML = `${turn} win`;
        playAgain.style.display = "inline";
        w.forEach((e) => {
          boxes[e].style.backgroundColor = "gray";
        });
        // boxes[w[0]].style.color = "red";
        // boxes[w[1]].style.color = "red";
        // boxes[w[2]].style.color = "red";
      }
    });
    // for (i = 0; i < winConditions.length; i++) {
    //   let v0 = boxes[winConditions[i][0]].innerHTML;
    //   let v1 = boxes[winConditions[i][1]].innerHTML;
    //   let v2 = boxes[winConditions[i][2]].innerHTML;
    //   if (v0 != "" && v0 === v1 && v1 === v2) {
    //     gameOver = true;
    //     result.innerHTML = `${turn} win`;
    //     playAgain.style.display = "inline";

    //     for (j = 0; j < 3; j++) {
    //       boxes[winConditions[i][j]].style.backgroundColor = "#1a6aa0";
    //       boxes[winConditions[i][j]].style.color = "orange";
    //     }
    //   }
    // }
  }
  function checkDraw() {
    if (!gameOver) {
      let draw = true;
      boxes.forEach((e) => {
        if (e.innerHTML === "") {
          draw = false;
        }
      });
      if (draw) {
        gameOver = true;
        result.innerHTML = `draw`;
        playAgain.style.display = "inline";
      }
    }
  }
  playAgain.addEventListener("click", () => {
    gameOver = false;
    turn = "x";
    bg.style.left = "0";
    result.innerHTML = "";
    playAgain.style.display = "none";
    boxes.forEach((e) => {
      e.innerHTML = "";
      e.style.removeProperty("background-color");
      e.style.removeProperty("color");
    });
  });
  const openXO = document.getElementById("openXO");
  const xogame = document.getElementById("xogame");
  const main = document.querySelector("main");
  const back = document.getElementById("back");
  openXO.addEventListener("click", openXOGame);
  function openXOGame() {
    xogame.classList.remove("hidden");
    main.classList.add("hidden");
  }
  back.addEventListener("click", hideXO);
  function hideXO() {
    xogame.classList.add("hidden");
    main.classList.remove("hidden");
  }
  hideXO();
  // xoGAME ><><><<><><><><<><><><><><><
});
// localStorage.clear()
