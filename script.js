const recipes = window.RECIPES || [];
const grid = document.getElementById('recipeGrid');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('recipeModal');
const modalContent = document.getElementById('modalContent');

function recipeCard(recipe) {
  const article = document.createElement('article');
  article.className = 'recipe-card';
  article.innerHTML = `
    <div class="recipe-top">
      <div class="recipe-thumb">
        <img src="${recipe.image}" alt="${recipe.title}" style="object-position:${recipe.imagePosition || '50% 18%'};" />
      </div>
      <div class="recipe-meta">
        <div class="category">${recipe.category}</div>
        <h3>${recipe.title}</h3>
      </div>
    </div>
    <p class="description">${recipe.blurb}</p>
    <div class="recipe-stats">
      <span>${recipe.ingredients.length} ingredients</span>
      <span>${recipe.method.length} steps</span>
    </div>
    <button class="button">View Recipe</button>
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
            <img src="${recipe.image}" alt="${recipe.title}" style="object-position:${recipe.imagePosition || '50% 18%'};" />
          </div>
          <p class="modal-note">A cropped handwritten note sits beside the cleaned recipe so the notebook stays visible without overpowering the typed version.</p>
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

function render(list) {
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

searchInput.addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = recipes.filter(recipe =>
    [recipe.title, recipe.category, recipe.blurb, ...recipe.ingredients].join(' ').toLowerCase().includes(term)
  );
  render(filtered);
});

modal.addEventListener('click', (e) => {
  const target = e.target;
  if (target instanceof HTMLElement && target.dataset.close === 'true') closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

render(recipes);
