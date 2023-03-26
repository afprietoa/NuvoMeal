import { comments } from "../data/data.js";
class Comment{
    #user;
    #comment;
    #date;
    constructor(user, comment, date){
        this.user = user;
        this.comment = comment;
        this.date = (new Date()).toJSON().toString();
    }
    set user(user){
        this.#user = user;
    }
    get user(){
        return this.#user;
    }
    set comment(comment){
        this.#comment = comment;
    }
    get comment(){
        return this.#comment;
    }
    set date(date){
        this.#date = date;
    }
    get date(){
        return this.#date;
    }
}

const form = document.getElementById('registration-form');
const names = document.getElementById('name');
const comment= document.getElementById('comment');
const date = document.getElementById('date');

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const dataUser ={
		name:names.value !== '' ? names.value : errorFunc('name', 'Please, Enter your name.'),
		comment:comment.value !== '' ? comment.value : errorFunc('comment', 'Please, Enter your comment.'),
		date:date.value !== '' ? date.value : errorFunc('date', 'Please, Enter a date.'),
	}

	if (!document.querySelectorAll('.invalid').length) {
		alert('El formulario ha sido enviado con estos datos: '+ JSON.stringify(dataUser));		
		form.reset();
	}
});

form.addEventListener('change', (e) => {

	const dataUser ={
		name:names.value !== '' ?  noError('name') : errorFunc('name', 'Please, Enter your name.'),
		comment:comment.value !== '' ? noError('comment') : errorFunc('comment', 'Please, Enter your comment.'),
		date:date.value !== '' ? noError('date') : errorFunc('date', 'Please, Enter a date.'),
	}
});

function errorFunc(tagName, message) {
    document.getElementById(tagName).classList.add('invalid');
    document.getElementById(tagName + '-error').innerHTML = message;
}

function noError(tagName) {
    document.getElementById(tagName).classList.remove('invalid');
    document.getElementById(tagName + '-error').innerHTML = '';	
	return document.getElementById(tagName).value;
}
const container = document.querySelector('.testimonial-list');

const printComments = (commentList, container) => {
    //1. Vaciemos el contenido del contenedor
    container.innerHTML = "";
  
    //2. recorrer el array commentList y por cada elemento nos debe pintar un card.
    commentList.forEach((user) => {
      container.innerHTML += `

        <div class="testimonial-item">
            <p>${user.comment}</p>

            <p class="author">- ${user.name}</p>
        </div>
          `;
  
    });
  };
  document.addEventListener("DOMContentLoaded", () => {
    console.log(comments);
    printComments(comments, container);
});