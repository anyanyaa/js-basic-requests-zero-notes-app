const form = document.querySelector('form')
const textarea = document.querySelector('textarea')
const errorMessage = document.querySelector('#textValidationMessage')
const cardContainer = document.querySelector('.col-8.offset-2')


const route = "http://localhost:4400"

//method GET
function getList(){
  console.log('get list func')

  cardContainer.innerHTML = ''

  let request = new XMLHttpRequest();
  request.open('GET', `${route}/api/v1/notes`);
  request.send()
  request.onload = function(){

      JSON.parse(request.response).forEach(function(note){

      let noteEl = document.createElement('div')
        noteEl.classList.add('card', 'mb-4')
        noteEl.dataset.id = note.id

      noteEl.innerHTML = `
          <h5 class="card-header">${note.text}</h5>
          <div class="card-body">
            <button class="btn btn-danger">Delete</button>
          </div>
      `

        const deleteButton = noteEl.querySelector('.btn-danger')
        deleteButton.onclick = function(){
        console.log('delete')

          let id = deleteButton.closest('.card').dataset.id

          deleteCard(id)
        }



      cardContainer.append(noteEl)
    })

  }
}

getList();



//method POST

form.onsubmit = function (event){
  event.preventDefault()

  if(validation(textarea, errorMessage)){

    const formData = new FormData(form)
    const request = new XMLHttpRequest();
    request.open("POST", `${route}/api/v1/notes`);


    request.send(formData)

    textarea.value = ''

    getList();
  }

}

//method DELETE

function deleteCard(id){
  const request = new XMLHttpRequest();
  request.open("DELETE", `${route}/api/v1/notes/${id}`);
  request.send()

  request.onload = function(){
    getList();
  }


}



//validation
function validation(textarea, errorMessage){

  let minLength = 6;
  let maxLength = 300;

  if(textarea.value.length < minLength){

    textarea.classList.add('is-invalid')
    errorMessage.innerText = `Note text must be more than ${minLength} letters`

    return false

  } else if(textarea.value.length > maxLength){

    errorMessage.innerText = `Note text must be less than ${maxLength} letters`

    return false

  } else {

    textarea.classList.remove('is-invalid')
    return true
  }

}

