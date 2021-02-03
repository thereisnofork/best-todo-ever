const input = document.getElementById("input");
const todoTable = document.getElementById("todoTable");
const color = document.getElementById("color");
const btn = document.getElementById("btn");
const submit = document.getElementById("add");
const body = document.getElementById("bod");

color.addEventListener("change", () => {
  btn.style.color = color.value;
});

submit.addEventListener("click", () => {
  addTODO();
  input.focus();
});

input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") addTODO();
});

function addTODO() {
  const todotxt = input.value;
  if (!todotxt) return;

  const colorValue = color.value;
  const newNote = new Todo(todotxt, colorValue);
  newNote.creatTodo();
  newNote.displacement();
  newNote.rightClick();

  RemoveRightClick(newNote.box, newNote.wrapeDIV, newNote.textDIV);

  input.value = "";
}

class Todo {
  constructor(text, color) {
    this.txt = text;
    this.setedColor = color;
  }

  wrapeDIV = document.createElement("div");
  checkboxDIV = document.createElement("input");
  textDIV = document.createElement("div");
  priorityDIV = document.createElement("div");
  dltDIV = document.createElement("i");
  lineDIV = document.createElement("div");

  box = document.createElement("div");

  creatTodo() {
    this.wrapeDIV.id = "ONEtodo";
    this.wrapeDIV.classList.add("ONEtodo");

    this.checkboxDIV.id = "checkbox";
    this.checkboxDIV.type = "checkbox";

    this.textDIV.id = "text";
    this.textDIV.classList.add("text");
    this.textDIV.innerHTML = this.txt;

    this.priorityDIV.id = "Priority";
    this.priorityDIV.classList.add("Priority");
    this.priorityDIV.style.backgroundColor = this.setedColor;

    this.dltDIV.id = "dlt";
    this.dltDIV.classList.add("fas");
    this.dltDIV.classList.add("fa-eraser");

    this.lineDIV.id = "line";

    this.wrapeDIV.appendChild(this.checkboxDIV);
    this.wrapeDIV.appendChild(this.textDIV);
    this.wrapeDIV.appendChild(this.priorityDIV);
    this.wrapeDIV.appendChild(this.dltDIV);
  }

  displacement() {
    todoTable.prepend(this.wrapeDIV);
    todoTable.prepend(this.lineDIV);

    this.checkboxDIV.addEventListener("change", () => {
      const elementHeight = this.wrapeDIV.getBoundingClientRect().height;
      if (elementHeight >= 70) {
        this.textDIV.classList.toggle("doneWave");
      } else {
        this.textDIV.classList.toggle("done");
      }
    });

    this.dltDIV.addEventListener("click", () => {
      this.lineDIV.classList.add("removing");
      this.wrapeDIV.classList.add("removing");
      setTimeout(() => {
        this.wrapeDIV.remove();
        this.lineDIV.remove();
      }, 710);
    });
  }

  rightClick() {
    this.wrapeDIV.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      this.rightClickLogic(e);
    });
  }

  rightClickLogic(e) {
    if (body.querySelector("#rightClickBox") == null) {
      this.box.id = "rightClickBox";

      this.box.style.left = e.pageX + "px";
      this.box.style.top = e.pageY + "px";
      body.appendChild(this.box);
    } else {
      this.box.remove();
      this.box.id = "rightClickBox";
      this.box.style.left = e.pageX + "px";
      this.box.style.top = e.pageY + "px";
      body.appendChild(this.box);
    }
  }
}

function RemoveRightClick(box, todo, text) {
  document.addEventListener("contextmenu", (e) => {
    if (e.target !== todo && e.target !== text) {
      box.remove();
      console.log(box);
    }
  });
  document.addEventListener("click", (e) => {
    if (e.target !== todo && e.target !== text) {
      box.remove();
      console.log(box);
    }
  });
}
