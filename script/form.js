import { opinions } from "../data/data.js";
import { printCards } from "../modules/printCards.js";

const form = document.getElementById('registration-form');
const names = document.getElementById('name');
const comment= document.getElementById('comment');
const date = document.getElementById('date');





const container = document.querySelector('.testimonial-list');
const title = document.querySelector('.form-title');
const submitBtn = document.querySelector('.submit');

const valuesForm = Object.values(form);

  const editFormStr = sessionStorage.getItem("editItem")
  ? JSON.parse(sessionStorage.getItem("editItem"))
  : "";

  const editForm = editFormStr ? parseInt(editFormStr) : null;

  let comments = sessionStorage.getItem('comments')
  ? JSON.parse(sessionStorage.getItem('comments'))
  : [];

  const editComment = editForm
  ? comments.find((comment) => comment.id === editForm)
  : null;

  title.innerText = editForm
  ? `Update comment of ${editComment.name}`
  : "Add new comment";

  submitBtn.innerHTML = editForm ? "Save message" : "Create message";

  if (editForm && editComment) {
    
    valuesForm.forEach((valueInput) => {
      if (valueInput.id) {
        valueInput.value = editComment[valueInput.id];
      }
    });
  }



  
form.addEventListener('submit', (e) => {
	e.preventDefault();

	const newComment ={
		name:names.value !== '' ? names.value : errorFunc('name', 'Please, Enter your name.'),
		comment:comment.value !== '' ? comment.value : errorFunc('comment', 'Please, Enter your comment.'),
		date:date.value !== '' ? date.value : errorFunc('date', 'Please, Enter a date.'),
	}

	if (!document.querySelectorAll('.invalid').length) {
        Swal.fire(
            "Excellent!",
            `Has been successfully saved with next data: ${JSON.stringify(newComment)}`,
            "success"
          )	
		form.reset();
	}

    
  if (editForm) {

    const commentIndex = comments.findIndex(
      (comment) => comment.id === editForm
    );

    console.log(commentIndex);


    comments[commentIndex] = newComment;

    // console.log(comments);
  } else {

    comments.push(newComment);

    // console.log(comments);
  }


  sessionStorage.setItem("comments", JSON.stringify(comments));
   
});

form.addEventListener('change', (e) => {

	const newComment ={
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


  document.addEventListener("DOMContentLoaded", () => {
    sessionStorage.removeItem("editComment");
    if(comments.length === 0) {
        sessionStorage.setItem("comments",JSON.stringify(opinions));
        comments = JSON.parse(sessionStorage.getItem("comments"));
        console.log(comments);
    }
    console.log(comments);
    printCards(comments, container);



});

document.addEventListener("click", (event) => {

  
    //Destructuración de un objeto
  
    const { target } = event;

          //---------------delete conditional---------------
  if (target.classList.contains("testimonial-item_delete")) {

    Swal.fire({
      title: "Are you sure to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");

        //Find the position of the element that we want to delete within the array
        const idCommentDelete = parseInt(target.name);
        console.log(idCommentDelete);
        console.log(typeof idCommentDelete);

        const commentPosition = comments.findIndex(
          (comment) => comment.id === idCommentDelete
        );
        console.log(commentPosition);

        //Delete the comment
        comments.splice(commentPosition, 1);
        console.log(comments);

        //Update comments array in sessionStorage
        sessionStorage.setItem("comments", JSON.stringify(comments));

        //Print the cards again
        printCards(comments, container);
      }
    });
  }

  //--------------------update conditional--------------------------------
  if (target.classList.contains("testimonial-item_edit")) {
    console.log(target.name);
    sessionStorage.setItem("editComment", JSON.stringify(target.name));
  }
});