function runFilter() {


    const result = document.querySelector('#resultado');

    const categorySelect = document.querySelector('#categorias');
    if(categorySelect) {
        categorySelect.addEventListener('change', selectCategory)
        getCategory();
    }

    const modal = new bootstrap.Modal('#modal', {});

    

    function getCategory() {
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
        fetch(url)
            .then(response => response.json())
            .then( result => printCategories(result.categories))
    }

    function printCategories(categories = []) {
        categories.forEach( category => {
            const { strCategory } = category;
            const option = document.createElement('OPTION');
            option.value = strCategory;
            option.textContent = strCategory;
            categorySelect.appendChild(option);     
        })
    }

    function selectCategory(e) {
        const category = e.target.value;
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
        fetch(url)
            .then(response => response.json())
            .then(result => printMeals(result.meals))
    }

    function printMeals(meals = []) {

        limpiarHtml(result);

        const heading = document.createElement('H2');
        heading.classList.add('text-center', 'text-black', 'my-5');
        heading.textContent = meals.length ? 'Results': 'No Results';
        result.appendChild(heading);
        
        // Iterar en los resultados
        meals.forEach(meal => {
            const { idMeal, strMeal, strMealThumb } = meal;

            const mealContainer = document.createElement('DIV');
            mealContainer.classList.add('col-md-4');

            const mealCard = document.createElement('DIV');
            mealCard.classList.add('card', 'mb-4');

            const mealImage = document.createElement('IMG');
            mealImage.classList.add('card-img-top');
            mealImage.alt = `Imagen de la receta ${strMeal ?? meal.titulo}`;
            mealImage.src = strMealThumb ?? meal.img;

            const mealCardBody = document.createElement('DIV');
            mealCardBody.classList.add('card-body');

            const mealHeading = document.createElement('H4');
            mealHeading.classList.add('card-title', 'mb-3');
            mealHeading.textContent = strMeal ?? meal.titulo;

            const mealButton = document.createElement('BUTTON');
            mealButton.classList.add('btn', 'btn-danger', 'w-100');
            mealButton.textContent = 'show recipe';

            mealButton.onclick = function() {
                selectMeal(idMeal ?? meal.id);
            }


            // Inyectar en el código HTML
            mealCardBody.appendChild(mealHeading);
            mealCardBody.appendChild(mealButton);

            mealCard.appendChild(mealImage);
            mealCard.appendChild(mealCardBody)

            mealContainer.appendChild(mealCard);

            result.appendChild(mealContainer);
        })

    }

    function selectMeal(id) {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        fetch(url)
            .then(response => response.json())
            .then(result => printModal(result.meals[0]))
    }

    function printModal(meal) {
        const { idMeal, strInstructions, strMeal, strMealThumb } = meal;
        
        // Añadir contenido al modal
        const modalTitle = document.querySelector('.modal .modal-title');
        const modalBody = document.querySelector('.modal .modal-body');

        modalTitle.textContent = strMeal;
        modalBody.innerHTML = `
            <img class="img-fluid" src="${strMealThumb}" alt="receta ${strMeal}" />
            <h3 class="my-3">Instrucciones</h3>
            <p>${strInstructions}</p>
            <h3 class="my-3">Ingredientes y Cantidades</h3>
        `;

        const listGroup = document.createElement('UL');
        listGroup.classList.add('list-group');
        // Mostrar cantidades e ingredientes
        for(let i = 1; i <= 20; i++ ) {
            if(meal[`strIngredient${i}`]) {
                const ingredient = meal[`strIngredient${i}`];
                const quantity = meal[`strMeasure${i}`];

                const ingredientLi = document.createElement('LI');
                ingredientLi.classList.add('list-group-item');
                ingredientLi.textContent = `${ingredient} - ${quantity}`

                listGroup.appendChild(ingredienteLi);
            }
        }

        modalBody.appendChild(listGroup);


        // Muestra el modal
        modal.show();
    }



    function limpiarHtml(selector) {
        while(selector.firstChild) {
            selector.removeChild(selector.firstChild);
        }
    }
}

document.addEventListener('DOMContentLoaded', runFilter);