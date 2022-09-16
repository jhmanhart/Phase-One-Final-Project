// GLOBALS
const baseURL = 'http://localhost:3000';
let recipes = [];

// NODE GETTERS

const mainDiv = () => document.getElementById("main");
const homePageLink = () => document.getElementById("home-page-link");
const recipeListLink = () => document.getElementById("recipe-list-link");
const recipeAddLink = () => document.getElementById("recipe-add-link");

// TEMPLATES

const homePageTemplate = () => {
    return `
    <h1 class="center-align"> Welcome to your Personal Recipe Book</h1>
    <h4 class="center-align"> This personal recipe book can contain any recipe that the user wants it to. It has an option to include a title, a description of the recipe, and a URL link to the website that the recipe is found on. The user is also able to delete any recipes that they want.</h2>
    `
}

const recipeListTemplate = () => {
    return `
    <h1>Recipe List</h1>
        <table class="highlight">
          <thead>
            <tr>
                <th>Recipe Name</th>
                <th>Description</th>
                <th>URL</th>
            </tr>
          </thead>
  
          <tbody>
           ${ renderRecipes() }
          </tbody>
        </table> `
}

const recipeTemplate = (recipe) => {
    return `
    <tr>
              <td>${ recipe.name }</td>
              <td>${ recipe.description }</td>
              <td>${ recipe.URL }</td>
            </tr>
    `
}

const recipeAddTemplate = () => {

}

// RENDERERS

const renderHomePage = () => {
    mainDiv().innerHTML = homePageTemplate();
}

const renderRecipeListPage = () => {
    mainDiv().innerHTML = recipeListTemplate();
}

const renderRecipes = () => {
    return recipes.map(recipe => recipeTemplate(recipe));
}

const renderRecipeAddPage = () => {
    mainDiv().innerHTML = recipeAddTemplate();
}
// EVENTS

const loadRecipes = async () => {
    const resp = await fetch(baseURL + "/recipes")
    const data = await resp.json();
    recipes = data;
}

const homePageClickEvent = () => {
    homePageLink().addEventListener("click", (e) => {
        e.preventDefault();
        renderHomePage();
    })
}

const recipeListClickEvent = () => {
    recipeListLink().addEventListener("click", async (e) => {
        e.preventDefault();
        await loadRecipes();
        renderRecipeListPage();
    })
}

const recipeAddClickEvent = () => {
    recipeAddLink().addEventListener("click", (e) => {
        e.preventDefault();
        renderRecipeAddPage();
    })
}


// WHEN THE DOM LOADS

document.addEventListener("DOMContentLoaded", () => {
    renderHomePage();
    homePageClickEvent();
    recipeListClickEvent();
    recipeAddClickEvent();
})