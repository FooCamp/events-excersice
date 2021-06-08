const btnAddTodo = document.querySelector(".add");
const todo = document.querySelector(".todo");
const titleTodo = document.querySelector(".title");
const content = document.querySelector(".content");
const todos = document.querySelector(".todos");

btnAddTodo.addEventListener("click", (e) => {
  e.preventDefault();
  let form = document.getElementById("addtodo");
  let title = form.elements[0].value;
  let text = form.elements[1].value;
  titleTodo.innerText = title;
  content.innerText = text;
  const newTodo = todo.cloneNode(true);
  newTodo.classList.remove("hide");
  addListeners(newTodo);
  todos.appendChild(newTodo);
  form.elements[0].value = "";
  form.elements[1].value = "";
});

function addListeners(todo) {
  let isExpanded = false;
  let isRestore = false;
  let button = "";
  const title = todo.querySelector(".trigger-link");
  const expandBtn = todo.querySelector(".expand-trigger");
  const destroyBtn = todo.querySelector(".destroy-trigger");
  const publishBtn = todo.querySelector(".publish-trigger");
  const contents = todo.querySelector(".contents");
  const controls = todo.querySelector(".controls");
  const contentOpen = () => {
    contents.classList.toggle("contents--open");
    isExpanded = !isExpanded;
    expandBtn.innerText = isExpanded ? "collapse" : "expand";
  };
  const previewOpen = () => {
    if (!isExpanded) contents.classList.add("contents--preview");
  };
  const previewClose = () => {
    if (!isExpanded) contents.classList.remove("contents--preview");
  };
  title.addEventListener("click", contentOpen);
  expandBtn.addEventListener("click", contentOpen);
  title.addEventListener("mouseenter", previewOpen);
  title.addEventListener("mouseleave", previewClose);
  contents.addEventListener("focus", () => {
    contents.style.background = "#abdbe3";
  });
  contents.addEventListener("blur", () => {
    contents.style.background = "none";
  });
  const preventCopy = (e) => {
    e.preventDefault();
    alert("You cannot copy this content");
  };
  const preventCut = (e) => {
    e.preventDefault();
    alert("You cannot cut this content");
  };
  contents.addEventListener("copy", preventCopy);
  contents.addEventListener("cut", preventCut);
  publishBtn.addEventListener("click", () => {
    publishBtn.innerText = "publish";
    button = controls.removeChild(expandBtn);
    publishBtn.disabled = "true";
    contents.removeEventListener("copy", preventCopy);
    contents.removeEventListener("cut", preventCut);
    contents.classList.add("contents--open");
    title.removeEventListener("mouseenter", previewOpen);
    title.removeEventListener("mouseleave", previewClose);
  });
  destroyBtn.addEventListener("click", () => {
    isRestore = !isRestore;
    destroyBtn.innerText = isRestore ? "restore" : "X";
    publishBtn.classList.toggle("hide");
    if (!button) {
      button = controls.removeChild(expandBtn);
    }
    if (isRestore) {
      title.removeEventListener("mouseenter", previewOpen);
      title.removeEventListener("mouseleave", previewClose);
      contents.classList.remove("contents--open");
      expandBtn.innerText = "expand";

      todo.style.background = "red";
    } else {
      title.addEventListener("mouseenter", previewOpen);
      title.addEventListener("mouseleave", previewClose);
      todo.style.background = "none";
      if (publishBtn.innerText == "publish") {
        contents.classList.add("contents--open");
      } else {
        button.style.marginRight = "5px";
        controls.insertBefore(button, destroyBtn);
      }
    }
  });
}