const TASKLIST = [];
let currentDeleteId;

const EmptyArr = function () {
  const AddImg = document.querySelector(".wrapper");
  if (TASKLIST.length === 0 && !document.querySelector(".wrapper img")) {
    const imgEle = document.createElement("img");
    imgEle.src =
      "https://www.simplinamdharis.com/assets/animation_nofound-b0584b837b2c320b19b87eaa0ee18fb427a627ee601bc5472eeb13463fde3c32.gif";
    imgEle.alt = "No Result Found";
    imgEle.style.display = "flex";
    imgEle.style.width = "90%";
    AddImg.appendChild(imgEle);
  }
};

const renderTask = function () {
  const taskContainer = document.getElementById("taskContainer");
  taskContainer.innerHTML = "";

  if (TASKLIST.length === 0) {
    EmptyArr();
    return;
  } 
  else {
    const imgElement = document.querySelector(".wrapper img");
    if (imgElement){   
     imgElement.remove();
    }
  }

  TASKLIST.forEach(function (task) {
    const taskDiv = document.createElement("div");
    taskDiv.className = "taskItem";

    const statusText = task.taskStatus ? "Completed" : "Pending";

    const taskParagraph = document.createElement("span");
    taskParagraph.textContent = `${task.taskDescription} - ${statusText} - Priority: ${task.taskPriority}`;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");

    const icon = document.createElement("div");
    icon.classList.add("sign");
    icon.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    deleteButton.appendChild(icon);

    const textContent = document.createElement("div");
    textContent.classList.add("textClass");
    textContent.textContent = "Delete";
    deleteButton.appendChild(textContent);

    deleteButton.onclick = function () {
      currentDeleteId = task.taskId;
      document.getElementById("confirmationPopup").classList.add("show");
    };

    const editButton = document.createElement("button");
    editButton.classList.add("editButton");

    const icon2 = document.createElement("div");
    icon2.classList.add("sign2");
    icon2.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    editButton.appendChild(icon2);

    const editTextContent = document.createElement("div");
    editTextContent.classList.add("textClass2");
    editTextContent.textContent = "Edit";
    editButton.appendChild(editTextContent);

    editButton.style.cursor = "pointer";
    editButton.style.padding = "15px 30px";
    editButton.onclick = function () {
      openEditForm(taskDiv, task);
    };

    const completeButton = document.createElement("button");
    completeButton.classList.add("completeButton");

    const icon3 = document.createElement("div");
    icon3.classList.add("sign3");
    icon3.innerHTML = `<i class="fa-solid fa-check"></i>`;
    completeButton.appendChild(icon3);

    const CompletedTextContent = document.createElement("div");
    CompletedTextContent.classList.add("textClass3");
    CompletedTextContent.textContent = "Completed";
    completeButton.appendChild(CompletedTextContent);

    completeButton.style.cursor = "pointer";

    completeButton.onclick = function () {
      editTask(task.taskId, "status", true);
    };

    document.body.appendChild(completeButton);

    taskDiv.appendChild(taskParagraph);
    taskDiv.appendChild(editButton);
    taskDiv.appendChild(deleteButton);
    taskDiv.appendChild(completeButton);
    taskContainer.appendChild(taskDiv);
  });

  const openEditForm = function (taskDiv, task) {
    let editContainer = document.createElement("div");
    editContainer.className = "editContainer";
    editContainer.style.display = "flex";
    editContainer.style.flexDirection = "column";
    editContainer.style.gap = "10px";

    let descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.style.width = "500px";
    descriptionInput.style.padding = "1em";
    descriptionInput.value = task.taskDescription;
    descriptionInput.placeholder = "Edit description";
    editContainer.appendChild(descriptionInput);

    const prioritySelect = document.createElement("select");
    ["Low", "Medium", "High"].forEach((priority) => {
      let option = document.createElement("option");
      option.value = priority;
      option.textContent = priority;
      if (priority === task.taskPriority) {
        option.selected = true;
      }
      prioritySelect.appendChild(option);
    });
    editContainer.appendChild(prioritySelect);

    const statusCheckbox = document.createElement("input");
    statusCheckbox.type = "checkbox";
    statusCheckbox.checked = task.taskStatus;
    let statusLabel = document.createElement("label");
    statusLabel.textContent = "Completed";
    editContainer.appendChild(statusCheckbox);
    editContainer.appendChild(statusLabel);

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.style.backgroundColor = "red";
    saveButton.style.width = "500px";
    saveButton.style.padding = "10px";
    saveButton.style.color = "white";
    saveButton.onclick = function () {
      editTask(task.taskId, "description", descriptionInput.value);
      editTask(task.taskId, "priority", prioritySelect.value);
      editTask(task.taskId, "status", statusCheckbox.checked);
      renderTask();
    };
    editContainer.appendChild(saveButton);

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.style.backgroundColor = "green";
    cancelButton.style.color = "white";
    cancelButton.style.padding = "10px";
    cancelButton.style.width = "500px";
    cancelButton.onclick = function () {
      renderTask();
    };
    editContainer.appendChild(cancelButton);

    taskDiv.innerHTML = "";
    taskDiv.appendChild(editContainer);
  };
};

const addNewTask = function () {
  const taskDescription = document.getElementById("taskDescription").value;
  const taskPriority = document.getElementById("taskPriority").value;

  if (taskDescription) {
    let taskId = TASKLIST.length ? TASKLIST[TASKLIST.length - 1].taskId + 1 : 1;

    let newTask = {
      taskDescription: taskDescription,
      taskStatus: false,
      taskPriority: taskPriority || "Low",
      taskId: taskId,
    };

    TASKLIST.push(newTask);
    renderTask();
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskPriority").value = "Low";
  }
   else {
    alert("Please enter a task description.");
  }
};

const deleteTask = function (id) {
  const index = TASKLIST.findIndex(function (task) {
    return task.taskId === id;
  });

  if (index !== -1) {
    TASKLIST.splice(index, 1);
    renderTask();
  }
};

const editTask = function (id, action, actionValue) {
  let task = TASKLIST.find(function (task) {
    return task.taskId === id;
  });

  if (task) {
    switch (action) {
      case "description":
        task.taskDescription = actionValue;
        break;
      case "status":
        task.taskStatus = actionValue;
        break;
      case "priority":
        task.taskPriority = actionValue;
        break;
    }
    renderTask();
  }
};

document.getElementById("addTaskButton").addEventListener("click", addNewTask);

document
  .getElementById("confirmDeleteButton")
  .addEventListener("click", function () {
    deleteTask(currentDeleteId);
    document.getElementById("confirmationPopup").classList.remove("show");
  });

document
  .getElementById("cancelDeleteButton")
  .addEventListener("click", function () {
    document.getElementById("confirmationPopup").classList.remove("show");
  });

renderTask();


