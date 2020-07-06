let data = [
  {id: 1, taskName: 'Task1', taskDescription: 'Task1 Description', status: 'Открыта'},
  {id: 2, taskName: 'Task2', taskDescription: 'Task2 Description', status: 'Решена'},
  {id: 3, taskName: 'Task3', taskDescription: 'Task3 Description', status: 'В работе'},
  {id: 4, taskName: 'Task4', taskDescription: 'Task4 Description', status: 'Открыта'},
];

let addTaskButton = document.querySelector('.addTaskButton'),
    modalButton = document.querySelector('.modalButton'),
    modalWrapper = document.querySelector('.modalWrapper'),
    modal = document.querySelector('.modal'),
    table = document.querySelector('table'),
    statusFilterElement = document.querySelector('#statusfilter')
    ;


statusFilterElement.addEventListener('change', onStatusFilter);

addTaskButton.addEventListener('click', () => {
  modalWrapper.classList.remove('hide');
});

modalButton.addEventListener('click', () => {
  modalWrapper.classList.add('hide');
});

modal.addEventListener('submit', (e) => {
  e.preventDefault();

  let userData = new FormData(e.target);
  let newTask = {
    id: data[data.length - 1].id + 1,
    taskName: userData.get("taskName"),
    taskDescription: userData.get("taskDescription"),
    status: translate(userData.get("status")),
  };

  data.push(newTask);
  modal.reset();
  createTasks(data);
})

createTasks(data);

function createTasks(data) {
  document.querySelector("table tbody").remove();

  let tbody = document.createElement("tbody");
  let result = "";
  data.forEach((item) => {
    result += `<tr>
    <td><p class="taskName">${item.taskName}</p></td>
    <td><p class="taskDescription">${item.taskDescription}</p></td>
    <td>${item.status}</td>
    <td><button onclick='onDelete(${item.id})'>Удалить</button></td>
  </tr>`;
  });

  result += "";

  tbody.innerHTML = result;
  table.appendChild(tbody);
}

function translate(str) {
  switch(str) {
    case 'opened':
      return "Открыта"
    case 'solved':
      return "Решена"
    case 'process':
      return "В работе"
    default: str;
  }
}

function onDelete(id) {
  data = data.filter((item) => item.id != id);
  createTasks(data);
}

function statusFilter(data, status) {
  if (!status) return data;
  return data.filter(d => d.status === status);
} 

function onStatusFilter(e) {
  let filteredData = statusFilter(data, translate(e.target.value));
  createTasks(filteredData);
}