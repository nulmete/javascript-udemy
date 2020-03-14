import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => { elements.searchInput.value = '' };

export const clearResults = () => {
    elements.searchResultsList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));

    resultsArr.forEach(res => res.classList.remove('results__link--active'));

    // Add active class to the result link whose href contains id
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
}

export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];

    // If title is too long
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            // If next word of the title + prev word doesn't exceed limit
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }

            return acc + cur.length; // new accumulator for next reduce iteration
        }, 0);

        return `${newTitle.join(' ')} ...`;
    }

    // If title is not long (no need to put this in else statement)
    return title;
}

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    elements.searchResultsList.insertAdjacentHTML('beforeEnd', markup);
}

// type: 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;

    if (page === 1 && pages > 1) { // first page
        // Next page button
        button = createButton(page, 'next');
    } else if (page < pages) {
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) { // last page
        // Prev page button
        button = createButton(page, 'prev');
    } 

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // Results per page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    // Render recipes
    // [start, end)
    recipes.slice(start, end).forEach(renderRecipe);

    // Render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
}