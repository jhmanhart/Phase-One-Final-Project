// GLOBALS
const baseURL = 'http://localhost:3000';
let recipes = [];

// NODE GETTERS

const mainDiv = () => document.getElementById("main");
const homePageLink = () => document.getElementById("home-page-link");
const recipeListLink = () => document.getElementById("recipe-list-link");
const recipeAddLink = () => document.getElementById("recipe-add-link");
const nameInput = () => document.getElementById("name");
const descriptionInput = () => document.getElementById("description");
const urlInput = () => document.getElementById("url");

// TEMPLATES

const recipeTemplate = (recipe) => {
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdDescription = document.createElement('td');
    const tdUrl = document.createElement('td');
    tdName.innerText = recipe.name;
    tdDescription.innerText = recipe.description;
    tdUrl.innerText = recipe.URL;
    tr.appendChild(tdName)
    tr.appendChild(tdDescription)
    tr.appendChild(tdUrl)
    return tr;
}


// RENDERERS


const renderHomePage = () => {
    mainDiv().innerHTML = ''
    const h1 = document.createElement('h1');
    h1.classList.add('center-align');
    h1.innerText = 'Welcome to your Personal Recipe Book'
    const h4 = document.createElement('h4');
    h4.classList.add('center-align');
    h4.innerText = 'This application allows the user to create a personal recipe book where they can add the name of a recipe, the description, and the URL that links to a website with the recipe. It allows the user to organize recipes that they love in one place.'
    mainDiv().appendChild(h1);  
    mainDiv().appendChild(h4); 
}

const renderRecipeListPage = () => {
    mainDiv().innerHTML = ''
    const h1 = document.createElement('h1');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const thName = document.createElement('th');
    const thDescription = document.createElement('th');
    const thUrl = document.createElement('th');
    const tbody = document.createElement('tbody');
    h1.innerText = 'Recipe List'
    thName.innerText = 'Name';
    thDescription.innerText = 'Description';
    thUrl.innerText = 'URL';
    table.classList.add('highlight');
    tr.appendChild(thName);
    tr.appendChild(thDescription);
    tr.appendChild(thUrl);
    thead.appendChild(tr);
    table.appendChild(thead);
    recipes.forEach(recipe => tbody.appendChild(recipeTemplate(recipe)))
    table.appendChild(tbody);
    mainDiv().appendChild(h1);
    mainDiv().appendChild(table);
} 


const renderRecipeForm = () => {
    mainDiv().innerHTML = ''
    const h1 = document.createElement('h1');
    const form = document.createElement('form');
    const nameDiv = document.createElement('div');
    const nameInput = document.createElement('input');
    const nameLabel = document.createElement('label');
    const descriptionDiv = document.createElement('div');
    const descriptionInput = document.createElement('input');
    const descriptionLabel = document.createElement('label');
    const urlDiv = document.createElement('div');
    const urlInput = document.createElement('input');
    const urlLabel = document.createElement('label');
    const submitButton = document.createElement('input');
  
    h1.className = 'center-align';
    nameDiv.className = 'input-field';
    descriptionDiv.className = 'input-field';
    urlDiv.className = 'input-field';
    submitButton.className = 'waves-effect waves-light btn';
  
    nameInput.setAttribute('id', 'name');
    nameInput.setAttribute('type', 'text');
    nameLabel.setAttribute('for', 'name');
    descriptionInput.setAttribute('id', 'description');
    descriptionInput.setAttribute('type', 'text');
    descriptionLabel.setAttribute('for', 'description');
    urlInput.setAttribute('id', 'url');
    urlInput.setAttribute('type', 'text');
    urlLabel.setAttribute('for', 'url');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('value', 'Create Recipe');
  
    h1.innerText = 'Create Recipe';
    nameLabel.innerText = 'Name'
    descriptionLabel.innerText = 'Description'
    urlLabel.innerText = 'URL'
  
    nameDiv.appendChild(nameInput);
    nameDiv.appendChild(nameLabel);
    descriptionDiv.appendChild(descriptionInput);
    descriptionDiv.appendChild(descriptionLabel);
    urlDiv.appendChild(urlInput);
    urlDiv.appendChild(urlLabel);
  
  
    form.appendChild(nameDiv);
    form.appendChild(descriptionDiv);
    form.appendChild(urlDiv);
    form.appendChild(submitButton);
  
    form.addEventListener('submit', submitFormEvent);
  
    mainDiv().appendChild(h1);
    mainDiv().appendChild(form);
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
    recipeListLink().addEventListener("click", (e) => {
        e.preventDefault();
        renderRecipeListPage();
    })
}

const recipeAddClickEvent = () => {
    recipeAddLink().addEventListener("click", async (e) => {
        e.preventDefault();
        await loadRecipes();
        debugger;
        renderRecipeForm();
    })
}

const submitFormEvent = e => {
    e.preventDefault();
    console.log('name', nameInput().value)
    console.log('description', descriptionInput().value)
    console.log('url', urlInput().value)
    fetch('http://localhost:3000/recipes', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: nameInput().value,
        description: descriptionInput().value,
        url: urlInput().value,
      })
    })
    .then(resp => resp.json())
    .then(recipe => {
      renderRecipeListPage();
    })
  }
 
  

// WHEN THE DOM LOADS

document.addEventListener("DOMContentLoaded", () => {
    renderHomePage();
    homePageClickEvent();
    recipeListClickEvent();
    recipeAddClickEvent();
}) 


