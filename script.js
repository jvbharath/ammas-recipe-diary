const recipes = window.RECIPES || [];
const categoryNames = window.CATEGORY_NAMES || [];
const grid = document.getElementById('recipeGrid');
const notebookGrid = document.getElementById('notebookGrid');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('recipeModal');
const modalContent = document.getElementById('modalContent');
const categoryChips = document.getElementById('categoryChips');
const recipeCount = document.getElementById('recipeCount');

let activeCategory = 'All Recipes';
let activeSearch = '';

function thumbMarkup(recipe, className = 'recipe-thumb') {
  if (recipe.image) {
    return `<div class="${className}"><img src="${recipe.image}" alt="${recipe.title}" style="object-position:${recipe.imagePosition || '50% 18%'};" /></div>`;
  }
  return `<div class="${className} placeholder">Recipe diary image</div>`;
}

function recipeCard(recipe) {
  const article = document.createElement('article');
  article.className = 'recipe-card';
  article.innerHTML = `
    <div class="recipe-top">
      ${thumbMarkup(recipe)}
      <div class="recipe-meta">
        <div class="category">${recipe.category}</div>
        <h3>${recipe.title}</h3>
        <p class="description">${recipe.blurb}</p>
      </div>
    </div>
    <div class="recipe-stats">
      <span>${recipe.ingredients.length} ingredients</span>
      <span>${recipe.method.length} steps</span>
    </div>
    <button class="button">View Recipe</button>
  `;
  article.querySelector('button').addEventListener('click', () => openModal(recipe));
  return article;
}

function notebookCard(recipe) {
  const article = document.createElement('article');
  article.className = 'notebook-card';
  article.innerHTML = `
    <div class="notebook-inner">
      <div class="notebook-media">
        <div class="notebook-photo">
          <img src="${recipe.image}" alt="${recipe.title}" style="object-position:${recipe.imagePosition || '50% 18%'};" />
        </div>
      </div>
      <div class="notebook-copy">
        <div class="category">${recipe.category}</div>
        <h3>${recipe.title}</h3>
        <p>${recipe.blurb}</p>
        <button class="outline-button">View side-by-side recipe</button>
      </div>
    </div>
  `;
  article.querySelector('button').addEventListener('click', () => openModal(recipe));
  return article;
}

function openModal(recipe) {
  modalContent.innerHTML = `
    <div class="modal-content">
      <div class="category">${recipe.category}</div>
      <h2>${recipe.title}</h2>
      <div class="modal-grid">
        <div>
          <div class="modal-image-wrap">
            ${recipe.image
              ? `<img src="${recipe.image}" alt="${recipe.title}" style="object-position:${recipe.imagePosition || '50% 18%'};" />`
              : `<div class="recipe-thumb placeholder" style="width:100%;height:100%;border-radius:0;">Matching handwritten page can be added here in the published site.</div>`}
          </div>
          <p class="modal-note">A cropped handwritten note sits beside the cleaned recipe so the recipe diary stays visible without overpowering the typed version.</p>
        </div>
        <div>
          <p class="blurb">${recipe.blurb}</p>
          <div class="modal-columns">
            <div>
              <h3>Ingredients</h3>
              <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
            </div>
            <div>
              <h3>Method</h3>
              <ol>${recipe.method.map(s => `<li>${s}</li>`).join('')}</ol>
            </div>
          </div>
          ${recipe.note ? `<div class="recipe-note"><strong>Note:</strong> ${recipe.note}</div>` : ''}
        </div>
      </div>
    </div>
  `;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

function renderCategoryChips() {
  categoryChips.innerHTML = '';
  ['All Recipes', ...categoryNames].forEach((category) => {
    const button = document.createElement('button');
    button.className = `category-chip${activeCategory === category ? ' active' : ''}`;
    button.textContent = category;
    button.addEventListener('click', () => {
      activeCategory = category;
      renderCategoryChips();
      renderRecipes();
    });
    categoryChips.appendChild(button);
  });
}

function getFilteredRecipes() {
  return recipes.filter((recipe) => {
    const matchesCategory = activeCategory === 'All Recipes' || recipe.category === activeCategory;
    const haystack = [recipe.title, recipe.category, recipe.blurb, ...recipe.ingredients].join(' ').toLowerCase();
    return matchesCategory && haystack.includes(activeSearch);
  });
}

function renderRecipes() {
  const list = getFilteredRecipes();
  recipeCount.textContent = `${list.length} recipe${list.length === 1 ? '' : 's'} shown`;
  grid.innerHTML = '';
  if (!list.length) {
    const empty = document.createElement('div');
    empty.className = 'recipe-card';
    empty.innerHTML = '<p class="description">No recipes matched that search.</p>';
    grid.appendChild(empty);
    return;
  }
  list.forEach(recipe => grid.appendChild(recipeCard(recipe)));
}

function renderNotebook() {
  notebookGrid.innerHTML = '';
  recipes.filter(recipe => recipe.image).forEach(recipe => notebookGrid.appendChild(notebookCard(recipe)));
}

searchInput.addEventListener('input', (e) => {
  activeSearch = e.target.value.toLowerCase();
  renderRecipes();
});

modal.addEventListener('click', (e) => {
  const target = e.target;
  if (target instanceof HTMLElement && target.dataset.close === 'true') closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

renderCategoryChips();
renderRecipes();
renderNotebook();
