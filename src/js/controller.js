import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
import { MODAL_CLOSE_SEC } from "./config.js";

import "core-js/stable";
import "regenerator-runtime";

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    //get id dynamically from url
    const id = window.location.hash.slice(1);

    if (!id) {
      return;
    }

    //update result view to mark selected result
    resultsView.update(model.getSearchResultsPage());

    //updating bookmark view
    bookmarksView.update(model.state.bookmarks);

    //render spinner from recipeView
    recipeView.renderSpinner();

    //loading recipe from load recipe (model.js)
    await model.loadRecipe(id);

    //rendering recipe fom recipeView from STATE (model.js)
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //get query from searView.js
    const query = searchView.getQuery();
    if (!query) {
      return;
    }

    //call loadSearchResults from model.js
    //pass query from searchVIEW.js
    await model.loadSearchResults(query);

    //render some results from model.js
    resultsView.render(model.getSearchResultsPage());

    //render the initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  //render new results from model.js
  resultsView.render(model.getSearchResultsPage(goToPage));

  //render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe servings (in the state) from model.js
  model.updateServings(newServings);

  //update the recipeView
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

//control bookmarks
const controlAddBookmark = function () {
  //add/remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  //update recipe View
  recipeView.update(model.state.recipe);

  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

//render bookmarks
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

//upload recipe controller
const controlAddRecipe = async function (newRecipe) {
  try {
    //render spinner
    // addRecipeView.renderSpinner();

    //upload new recipe
    await model.uploadRecipe(newRecipe);

    //render recipe
    recipeView.render(model.state.recipe);

    //display success message
    addRecipeView.renderMessage();

    //render bookmarks view
    bookmarksView.render(model.state.bookmarks);

    //change id in the URL
    //history: state, title, URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    //close form window
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
};

//this handles all functions in this app
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};
init();
