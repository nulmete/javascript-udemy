import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';

import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

// =============================================================================
// GLOBAL STATE
// * Search object (search query & search results)
// * Current recipe object
// * Shopping list object
// * Liked recipes
// =============================================================================

const state = {};
// window.state = state;

// =============================================================================
// SEARCH CONTROLLER
// =============================================================================

const controlSearch = async () => {
    // Get query string from input field
    const query = searchView.getInput();

    if (query) {
        // New search object & add it to state
        state.search = new Search(query);

        // Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // Only render the result if everything goes right
        try {
            // Search for recipes and wait for results before rendering them
            await state.search.getResults();

            // Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert('Something went wrong with the search');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// Pagination
elements.searchResPages.addEventListener('click', e => {
    const button = e.target.closest('.btn-inline');
    
    if (button) {
        const goToPage = parseInt(button.dataset.goto);
        searchView.clearResults(); // clear list of previous results and pagination buttons before rendering new ones
        searchView.renderResults(state.search.result, goToPage); // // Render pagination buttons
    }
});

// =============================================================================
// RECIPE CONTROLLER
// =============================================================================

const controlRecipe = async () => {
    // Get recipe ID from url
    const id = window.location.hash.replace('#', '');
    
    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item (if a search was made)
        if (state.search) searchView.highlightSelected(id);

        // Create new recipe object & add it to state
        state.recipe = new Recipe(id);

        // Only render the result if everything goes right
        try {
            // Get recipe data and parse ingredients
            // getRecipe() returns a promise because it is an async function
            // then, we can use await to wait for the promise to get back with the result
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate time and servings
            state.recipe.calculateTime();
            state.recipe.calculateServings();

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id) // there is no 'likes' when page is reloaded -> added new Likes() on page load
            );
        } catch (error) {
            alert('Error processing recipe!');
        }
    }
}


// If a url like http://localhost:8080/#46956 is saved as bookmark and the user
// accesses it directly, there isn't a hashchange event, so we need to run the
// controlRecipe function when the page loads also.
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


// =============================================================================
// LIST CONTROLLER
// =============================================================================

const controlList = () => {
    // Create a new list if there is none yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

// Handle delete and update list item
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state 
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);

    // Handle count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);
    }
});

// =============================================================================
// LIKES CONTROLLER
// =============================================================================

const controlLike = () => {
    // ID of recipe currently selected
    const currentID = state.recipe.id;

    if (!state.likes) state.likes = new Likes();

    // If recipe hasn't been liked
    if (!state.likes.isLiked(currentID)) {
        // Add like to state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        likesView.renderLike(newLike);

    // Recipe has been liked
    } else {
        // Remove like from state
        state.likes.deleteLike(currentID);

        // Toggle the like button
        likesView.toggleLikeBtn(false);

        // Remove like from UI list
        likesView.deleteLike(currentID);
    }

    likesView.toggleLikeMenu(state.likes.getNumLikes()); // also we don't want the heart to be displayed on load (add it outside of controller)
}

window.addEventListener('load', () => {
    // Needed for renderRecipe function to work
    state.likes = new Likes();

    // Retrieve liked items from localStorage
    state.likes.readStorage();

    // Toggle like menu (show it if there are liked items)
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
});

// Handle recipe button clicks
elements.recipe.addEventListener('click', e => {
    // btn-decrease or any child
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }

    // btn-increase or any child
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);

    // Shopping list
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // List controller
        controlList();

    // Likes list
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Likes controller
        controlLike();
    }

});
