let allTasks = [];

const form = document.querySelector("form");
form.addEventListener("submit", e => {
  addTask();
});

const loadTasks = () => {
  if (localStorage.getItem("tasks") == null) 
  return;
  
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  
  render = () => {
    const content = document.getElementById('');
    while(content.firstChild) {
      content.removeChild(content.firstChild);
    }
    allTasks.sort((a, b) => a.isCheck > b.isCheck ? 1 : a.isCheck < b.isCheck ? -1 : 0);
    allTasks.map((item, index) => {
      const ul = document.querySelector(ul);
      const li = document.createElement(li);
      li.id = `task-${ index }`;
      li.className = 'li';
      ul.appendChild(li);

      const input = document.createElement(input);
      input.className = 'input';
      input.type = 'text';
      input.value = item.text;
      li.appendChild(input);

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = item.isCheck;
      checkbox.onchange = function () {
        onChangeCheckBox(index);
      };

      li.appendChild(checkbox);

      button.appendChild(img);
      li.appendChild(button)
      
      if (index === activeEditTask) {
        const inputTask = document.createElement('input');
        inputTask.type = 'text';
        inputTask.value = item.text;
        inputTask.addEventListener('change', updateTaskText);
        inputTask.addEventListener('blur', doneEditTask);
        li.appendChild(inputTask);
      } else {
        const text = document.createElement('p');
        text.innerText = item.text;
        text.className = item.isCheck ? 'хзчтописать' : 'text-task';
        li.appendChild(text);
      }

      if(!item.isCheck) {
        if (index === activeEditTask) {
          const imageDone = document.createElement('img');
          imageDone.src = './icons/.svg';
          imageDone.onclick = function () {
            doneEditTask();
          };
         li.appendChild(imageDone);
        } else {
          const imageEdit = document.createElement('img');
          imageEdit.src = 'icons/edit.svg';
          imageEdit.onclick = function () {
            activeEditTask = index;
            render();
          };
          li.appendChild(imageEdit);
        }

        const imageDelete = document.createElement('img');
        imageDelete.src = 'icons/trash-alt.svg';
        imageDelete.onclick = function () {
          onDeleteTask(index); 
        }
        li.appendChild(imageDelete);
      }
    })
  }
}

/*   tasks.forEach(task => {
     const list = document.querySelector("ul");
     const li = document.createElement("li");
     li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
     <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
     <i class="fa_fa-trash" onclick="removeTask(this)">
      <img class="tasks__icon" src="./icons/trash-alt.svg" alt="Delete">
    </i>`;
     list.insertBefore(li, list.children[0]);
   });
 }*/
loadTasks();
window.onload = loadTasks;

function addTask() {
  const task = document.querySelector("form input");
  const ul = document.querySelector("ul");

  console.log(task.value);
  if (task.value === "") {
    alert("Please add some task!");
    return false;
  }
  
  if (document.querySelector(`input[value="${task.value}"]`)) {
    alert("Task already exist!");
    return false;
  }
  
  localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));
  
  render = () => {
    const content = document.getElementById('');
    while(content.firstChild) {
      content.removeChild(content.firstChild);
    }
    allTasks.sort((a, b) => a.isCheck > b.isCheck ? 1 : a.isCheck < b.isCheck ? -1 : 0);
    allTasks.map((item, index) => {
      const ul = document.querySelector(ul);
      const li = document.createElement(li);
      li.id = `task-${ index }`;
      li.className = 'li';
      ul.appendChild(li);

      const input = document.createElement(input);
      input.className = 'input';
      input.type = 'text';
      input.value = item.text;
      li.appendChild(input);

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = item.isCheck;
      checkbox.onchange = function () {
        onChangeCheckBox(index);
      };

      li.appendChild(checkbox);

      button.appendChild(img);
      li.appendChild(button)
      
      if (index === activeEditTask) {
        const inputTask = document.createElement('input');
        inputTask.type = 'text';
        inputTask.value = item.text;
        inputTask.addEventListener('change', updateTaskText);
        inputTask.addEventListener('blur', doneEditTask);
        li.appendChild(inputTask);
      } else {
        const text = document.createElement('p');
        text.innerText = item.text;
        text.className = item.isCheck ? 'хзчтописать' : 'text-task';
        li.appendChild(text);
      }

      if(!item.isCheck) {
        if (index === activeEditTask) {
          const imageDone = document.createElement('img');
          imageDone.src = './icons/.svg';
          imageDone.onclick = function () {
            doneEditTask();
          };
         li.appendChild(imageDone);
        } else {
          const imageEdit = document.createElement('img');
          imageEdit.src = 'icons/edit.svg';
          imageEdit.onclick = function () {
            activeEditTask = index;
            render();
          };
          li.appendChild(imageEdit);
        }

        const imageDelete = document.createElement('img');
        imageDelete.src = 'icons/trash-alt.svg';
        imageDelete.onclick = function () {
          onDeleteTask(index); 
        }
        li.appendChild(imageDelete);
      }
    })
  }
  /*const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
  <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
  <i class="fa_fa-trash" onclick="removeTask(this)">
  <img class="tasks__icon" src="./icons/trash-alt.svg" alt="Delete">
  </i>`;
  list.insertBefore(li, list.children[0]);
  task.value = "";*/
}

function taskComplete(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.task === event.nextElementSibling.value) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.nextElementSibling.classList.toggle("completed");
}

function removeTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.task === event.parentNode.children[1].value) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.parentElement.remove();
}
let currentTask = null;

function getCurrentTask(event) {
  currentTask = event.value;
}

function editTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  if (event.value === "") {
    alert("Task is empty!");
    event.value = currentTask;
    return;
  }
  tasks.forEach(task => {
    if (task.task === event.value) {
      alert("Task already exist!");
      event.value = currentTask;
      return;
    }
  });
  tasks.forEach(task => {
    if (task.task === currentTask) {
      task.task = event.value;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}