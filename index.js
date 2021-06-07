const addTodo = (mockData) => {
  const todoData = mockData ? mockData : getTodoInput();
  const newTodoElement = createTodoElement(todoData);
  const todoList = document.querySelector(".todos");

  console.log(newTodoElement);
  if (newTodoElement === null) {
    alert("New Todos must have a filename and content.");
  } else {
    todoList.appendChild(newTodoElement);
  }
};

const getTodoInput = () => {
  let filename = getInputText("input-filename");
  let content = getInputText("input-content");

  clearInputText("input-filename");
  clearInputText("input-content");

  return {
    filename,
    content,
  };
};

const getInputText = (className) => {
  let [filenameElement] = document.getElementsByClassName(className);
  let inputValueString = filenameElement.value;
  return inputValueString;
};

const clearInputText = (className) => {
  document.getElementsByClassName(className)[0].value = "";
};

const createTodoElement = (todoData) => {
  const { filename, content } = todoData;

  const todoTemplate = document.querySelector("li");
  const newTodo = todoTemplate.cloneNode(true);

  const newFilename = newTodo.querySelector("h3");
  const newContent = newTodo.querySelector("p");

  const newFilenameText = document.createTextNode(filename);
  const newContentText = document.createTextNode(content);

  if (filename === undefined || content === undefined) {
    return null;
  }

  newFilename.appendChild(newFilenameText);
  newContent.appendChild(newContentText);

  // We set Display CSS Property to "inline-block" so it's visible
  newTodo.style.display = "inline-block";

  createEventListeners(newTodo);

  return newTodo;
};

const createEventListeners = (todoElement) => {
  const publishButton = todoElement.querySelector(".publish-trigger");
  const expandButton = todoElement.querySelector(".expand-trigger");
  const destroyButton = todoElement.querySelector(".destroy-trigger");

  const header = todoElement.querySelector(".heading");
  const filename = todoElement.querySelector(".trigger-link");
  const content = todoElement.querySelector(".contents");

  expandButton.addEventListener("click", expandEvent);
  header.addEventListener("click", expandEvent);
  filename.addEventListener("click", expandEvent);
  function expandEvent(event) {
    event.stopPropagation();
    if (todoElement.classList.contains("todo--destroyed")) {
      return;
    }
    content.classList.toggle("contents--open");
    // If the content is previewed, stop doing so.
    content.classList.remove("contents--preview");

    const expanded = content.classList.contains("contents--open");
    expandButton.innerText = expanded ? "collapse" : "expand";
  }

  filename.addEventListener("mouseover", previewEventShow);
  filename.addEventListener("mouseleave", previewEventHide);
  function previewEventShow(event) {
    event.stopPropagation();
    // If contents are expanded, do not preview.
    if (content.classList.contains("contents--open")) {
      return;
    } else {
      content.classList.add("contents--preview");
    }
  }
  function previewEventHide(event) {
    event.stopPropagation();
    content.classList.remove("contents--preview");
  }

  content.addEventListener("focus", contentFocus);
  content.addEventListener("blur", contentBlur);
  function contentFocus(event) {
    event.stopPropagation();
    if (todoElement.classList.contains("todo--destroyed")) {
      return;
    }
    event.target.style.background = "aliceblue";
  }
  function contentBlur(event) {
    event.stopPropagation();
    event.target.style.background = "";
  }

  content.addEventListener("copy", NotNice);
  function NotNice(event) {
    if (!todoElement.classList.contains("todo--published")) {
      alert("What you're doing here ain't nice buddy.");
      event.preventDefault();
    }
  }

  destroyButton.addEventListener("click", destroyEvent);
  function destroyEvent(event) {
    event.stopPropagation();
    content.classList.remove("contents--open");
    todoElement.classList.toggle("todo--destroyed");

    const destroyed = todoElement.classList.contains("todo--destroyed");

    // Disable the functionality of buttons while the To-do remains destroyed.
    if (destroyed) {
      publishButton.removeEventListener("click", publishEvent, false);
      expandButton.removeEventListener("click", expandEvent, false);
    } else {
      publishButton.addEventListener("click", publishEvent);
      expandButton.addEventListener("click", expandEvent);
    }

    destroyButton.innerText = destroyed ? "restore" : "x";
  }

  publishButton.addEventListener("click", publishEvent);
  function publishEvent(event) {
    event.stopPropagation();
    todoElement.classList.add("todo--published");
    content.classList.add("contents--open");
    // content.removeEventListener("focus", contentFocus, false);
    filename.removeEventListener("mouseover", previewEventShow, false);
  }
};

// Todo mockup.
const mockText = [
  {
    filename: "Clean the toilet",
    content:
      "You haven't cleaned the toilet yet, I'd agree that's very disgusting and you should do it as soon as possible my friend.",
  },
  {
    filename: "Attend FooCamp classes",
    content:
      "At 7 PM in Venezuelan time, make sure to attend to FooCamp. Very important ok.",
  },
  {
    filename: "I don't know fam",
    content: "Yeah I just didn't know what to put in this one, alright.",
  },
];

mockText.forEach((todo) => {
  addTodo(todo);
});
