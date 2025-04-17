import {createNote, deleteNote, getNotes} from "./requests.js";
import {validateInput} from "./validations.js";


const form = document.querySelector('form');
const textarea = document.querySelector('textarea');
const errorMessage = document.querySelector('#textValidationMessage');
const notesContainer = document.querySelector('.col-8.offset-2');


function deleteItemById(id) {
  const elToDel = document.querySelector(`[data-id="${id}"]`);
  elToDel.remove();
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
    const {id}  = deleteButton.closest('.card').dataset;

    deleteNote((note) => deleteItemById(note.id), id);
  };

  notesContainer.append(noteEl);
}

function renderList(list) {
  notesContainer.innerHTML = '';

  list.forEach(function (note) {
    renderItem(note);
  });
}

getNotes(renderList);

form.onsubmit = function (event) {
  event.preventDefault();

  if (validateInput(textarea, errorMessage)) {
    const formData = new FormData(form);

    createNote(renderItem, formData);

    textarea.value = '';
  }
};
