export const printCards = (commentList, container) => {
    //1. Vaciemos el contenido del contenedor
    container.innerHTML = "";
  
    //2. recorrer el array commentList y por cada elemento nos debe pintar un card.
    commentList.forEach((user) => {
      container.innerHTML += `

        <div class="testimonial-item">
          <div class="testimonial-item_card">
              <p>${user.comment}</p>

              <p class="author">- ${user.name}</p>
          </div>
          <button class="testimonial-item_delete" name='${user.id}'>
            <i class="fa fa-times-circle"></i>
          </button>
          <button class="testimonial-item_edit" name='${user.id}'>
            <i class="fa fa-pencil"></i>
          </button>
        </div>
          `;
  
    });
  };