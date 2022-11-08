const host = "http://localhost:5500/task";

let allTasks = [];

window.onload = () => {
  loadTasks()
};

const loadTasks = async () => {
  try {
    const response = await fetch(host, {
      method: 'GET'
    });
    const result = await response.json();
    allTasks = result;

  } catch (error) {
    alert("Ошибка получения задач");
  }
  render();
}

const addNewTask = async () => {
  const input = document.getElementById("add-task");
  if (input === null) {
    return;
  }
  try {
    const response = await fetch(host, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ text: input.value }),
    });
    const result = await response.json();
    allTasks.push(result);
    input.value="";
    render();
  } catch (error) {
    alert("Ошибка добавления задач");
  }
};
 
const onDeleteTask = async(_id) => {
  try {
    const response = await fetch(`${host}/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      }
    });

  
    const result = await response.json();
    if (result.deletedCount !== 1) {
      alert('Ошибка удаления');
      return;
    }
    allTasks = allTasks.filter((item) => _id !== item._id);
    render();
  } catch(error) {
    alert('Ошибка удаления')
  }
}

const doneEditTask = async (_id,textTask) => {
  try {
    const response = await (fetch(`${host}/${text}`), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        text: textTask,
      }),
    });
    const result = await response.json();
    allTasks.forEach((elem) => {
      if (result._id === elem._id) {
        elem.text = result.text;
      }
    });
    render();
  } catch (error) {
    alert('Ошибка изменения текста')
  }
};
const editTask = (_id) => {
  const editedTask = document.getElementById(`textTask-${_id}`);
  console.log(editedTask);

  if (!editedTask) {
    return;
  }
  while (editedTask.firstChild) {
    editedTask.removeChild(editedTask.firstChild);
  }

  const editInput = document.createElement('input')
  editInput.className = 'editedText';
  editInput.type = 'text';
  editInput.value = allTasks.find(item => item._id === _id);
  editedTask.appendChild(editInput);

  const buttonApprove = document.createElement('button');
  buttonApprove.className = 'button'
  buttonApprove.onclick = () => {
    approveChange(_id, editInput.value.text);
  }   
  const buttonCancel = document.createElement('button');
  buttonCancel.className = 'button'
  buttonCancel.onclick = () => {
    showError('');
    render();
  }

  const imgApprove = document.createElement('img');
  imgApprove.className = 'task_icon';
  imgApprove.src = 'icons/approve.svg';
  imgApprove.alt = 'Approve'
  buttonApprove.appendChild(imgApprove);
  editedTask.appendChild(buttonApprove);

  const imgCancel = document.createElement('img');
  imgCancel.className = 'tasks_icon';
  imgCancel.src = 'icons/cancel.svg';
  imgCancel.alt = 'Cancel'
  buttonCancel.appendChild(imgCancel);
  editedTask.appendChild(buttonCancel);
  
}

const render = () => {
  const content = document.getElementById('content');
  while(content.firstChild) {
    content.removeChild(content.firstChild);
  }

  allTasks.sort((a, b) => a.isCheck > b.isCheck ? 1 : a.isCheck < b.isCheck ? -1 : 0);
  allTasks.map(item => {
    const {_id, text, isCheck } = item;
    const task = document.createElement("div")
    task.id = `textTask-${_id}`;
    content.appendChild(task);

    const textTask = document.createElement("p");
    textTask.id = `textTask-${_id}`;
    textTask.className = 'p'; 
    textTask.innerText = text;

    task.appendChild(textTask);

    // const input = document.createElement(input);
    // input.className = 'input';
    // input.type = 'text';
    // input.value = item.text;
    // li.appendChild(input);

    const checkbox = document.createElement('input');
   
    checkbox.type = 'checkbox';
    checkbox.checked = isCheck;
    checkbox.onchange = () => {
      onChangeCheckbox(_id);
    };

    task.appendChild(checkbox);

    const buttonEdit = document.createElement('button');
    const imageEdit = document.createElement('img');
    imageEdit.src = 'icons/pen.svg';
    imageEdit.alt = 'редактировать';
    buttonEdit.onclick = () => {
      editTask(_id);
      // render(); 
    };
    task.appendChild(buttonEdit);
    buttonEdit.appendChild(imageEdit);

    const buttonDelete = document.createElement('button');
    const imageDelete = document.createElement('img');
    imageDelete.src = 'icons/cancel.svg';
    imageDelete.alt = 'удалить';
    buttonDelete.onclick = () => {
      onDeleteTask(_id); 
    }
    task.appendChild(buttonDelete);
    buttonDelete.appendChild(imageDelete);

    const id = task._id;
    
    if (_id === id) {
      const inputEditTask = document.createElement('input');
      inputEditTask.type = 'text';
      inputEditTask.value = textTask;

      content.appendChild(inputEditTask);

      const buttonDone = document.createElement('button');
      const imageDone = document.createElement('img');
      imageDone.src = './icons/.svg';
      buttonDone.onclick = () => {
        id = null;
        doneEditTask(_id, inputEditTask.value);
      };

     content.appendChild(buttonDone);
     buttonDone.appendChild(imageDone);

    } else {

      // const text = document.createElement('p');
      // text.id = `text-${_id}`;
      // text.innerText = textTask;
      // text.className = isCheck ? "text-task done" : "text-task";
      // content.appendChild(text);
    }
    


  })
}
const onChangeCheckbox = async (_id) => {
  const task = allTasks.find((index) => index._id === _id);
  if (task === null) {
    return;
  }
}
