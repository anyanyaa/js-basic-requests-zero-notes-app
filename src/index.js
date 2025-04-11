const form = document.querySelector('form');
const textarea = document.querySelector('textarea');
const errorMessage = document.querySelector('#textValidationMessage');
const cardContainer = document.querySelector('.col-8.offset-2');

const route = 'http://localhost:4400';

/**
 *
 * @param {string} url
 * @param {Function} callback
 * @param {string|undefined} method
 * @param {any} body
 */

function sendRequest(url, callback, method = 'GET', body = null) {
  const request = new XMLHttpRequest();
  request.open(method, url);
  request.send(body);
  request.onload = function () {
    const response = JSON.parse(request.response);

    callback(response);
  };
}

function validation(textarea, errorMessage) {
  const minLength = 6;
  const maxLength = 300;

  if (textarea.value.length < minLength) {
    textarea.classList.add('is-invalid');
    errorMessage.innerText = `Note text must be more than ${minLength} letters`;

    return false;
  } else if (textarea.value.length > maxLength) {
    errorMessage.innerText = `Note text must be less than ${maxLength} letters`;

    return false;
  } else {
    textarea.classList.remove('is-invalid');
    return true;
  }
}

function deleteItem(item) {
  const elToDel = document.querySelector(`[data-id="${item.id}"]`);
  elToDel.remove();
}

function deleteNote(callback, id) {
  sendRequest(`${route}/api/v1/notes/${id}`, callback, 'DELETE');
}

function renderItem(item) {
  const noteEl = document.createElement('div');
  noteEl.classList.add('card', 'mb-4');
  noteEl.dataset.id = item.id;

  noteEl.innerHTML = `
          <h5 class="card-header">${item.text}</h5>
          <div class="card-body">
            <button class="btn btn-danger">Delete</button>
          </div>
      `;

  const deleteButton = noteEl.querySelector('.btn-danger');
  deleteButton.onclick = function () {
    const { id } = deleteButton.closest('.card').dataset;

    deleteNote(deleteItem, id);
  };

  cardContainer.append(noteEl);
}

function renderList(list) {
  cardContainer.innerHTML = '';

  list.forEach(function (note) {
    renderItem(note);
  });
}

function getNotes(callback) {
  sendRequest(`${route}/api/v1/notes`, callback);
}

getNotes(renderList);

function createNote(callback, body) {
  sendRequest(`${route}/api/v1/notes`, callback, 'POST', body);
}

form.onsubmit = function (event) {
  event.preventDefault();

  if (validation(textarea, errorMessage)) {
    const formData = new FormData(form);

    createNote(renderItem, formData);

    textarea.value = '';
  }
};
