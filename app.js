// Minecraft Wiki - Main Application
(function() {
    'use strict';

    let currentTab = 'recipes';
    let selectedVersion = 'latest';
    let searchDebounce = null;
    let searchResultIndex = -1;
    let favorites = JSON.parse(localStorage.getItem('mcwiki_favorites') || '[]');

    // ===== INITIALIZATION =====
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initVersionSelector();
        initNavigation();
        initSearch();
        initKeyboardShortcuts();
        initThemeToggle();
        initFavorites();
        initCompare();
        initRandomItem();
        renderRecipes();
        renderItems();
        renderMobs();
        renderCommands();
        renderTools();
        renderReferences();
        renderChangelog();
        handleDeepLink();
    }

    // ===== VERSION SELECTOR =====
    function initVersionSelector() {
        const select = document.getElementById('version-select');
        populateVersionSelect(select);
        select.addEventListener('change', function() {
            selectedVersion = this.value;
            var v = getVersionById(this.value);
            showToast('Version changed to ' + (v ? v.version : this.value));
            renderCurrentTab();
        });
    }

    // ===== NAVIGATION =====
    function initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const panels = document.querySelectorAll('.tab-panel');
        const menuToggle = document.getElementById('menu-toggle');
        const mainNav = document.getElementById('main-nav');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const tab = this.dataset.tab;
                switchTab(tab);
                if (mainNav.classList.contains('open')) {
                    mainNav.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        menuToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            mainNav.classList.toggle('open');
        });
    }

    function switchTab(tab) {
        currentTab = tab;
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelector(`.nav-link[data-tab="${tab}"]`)?.classList.add('active');

        document.querySelectorAll('.tab-panel').forEach(p => {
            p.hidden = true;
            p.classList.remove('active');
        });

        const panel = document.getElementById(tab);
        if (panel) {
            panel.hidden = false;
            panel.classList.add('active');
        }

        updateUrl(tab);
        renderCurrentTab();
    }

    function renderCurrentTab() {
        switch(currentTab) {
            case 'recipes': renderRecipes(); break;
            case 'items': renderItems(); break;
            case 'mobs': renderMobs(); break;
            case 'commands': renderCommands(); break;
            case 'tools': renderTools(); break;
            case 'references': renderReferences(); break;
        }
    }

    // ===== SEARCH =====
    function initSearch() {
        const searchInput = document.getElementById('global-search');
        const resultsContainer = document.getElementById('search-results');

        searchInput.addEventListener('input', function() {
            clearTimeout(searchDebounce);
            searchDebounce = setTimeout(() => {
                const query = this.value.trim();
                if (query.length < 2) {
                    resultsContainer.hidden = true;
                    return;
                }
                performSearch(query);
            }, 200);
        });

        searchInput.addEventListener('keydown', function(e) {
            const items = resultsContainer.querySelectorAll('.search-result-item');
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                searchResultIndex = Math.min(searchResultIndex + 1, items.length - 1);
                updateSearchSelection(items);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                searchResultIndex = Math.max(searchResultIndex - 1, 0);
                updateSearchSelection(items);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (searchResultIndex >= 0 && items[searchResultIndex]) {
                    items[searchResultIndex]?.click();
                } else {
                    const query = this.value.trim();
                    if (query.length >= 2) {
                        showCompactResults(query);
                    }
                }
            } else if (e.key === 'Escape') {
                resultsContainer.hidden = true;
                searchResultIndex = -1;
            }
        });

        searchInput.addEventListener('blur', function() {
            setTimeout(() => {
                resultsContainer.hidden = true;
                searchResultIndex = -1;
            }, 200);
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-container')) {
                resultsContainer.hidden = true;
            }
        });
    }

    function performSearch(query) {
        const resultsContainer = document.getElementById('search-results');
        const recipeResults = searchRecipes(query).slice(0, 5);
        const mobResults = searchMobs(query).slice(0, 5);
        const commandResults = searchCommands(query).slice(0, 5);
        const itemResults = searchItems(query).slice(0, 5);

        let html = '';

        if (recipeResults.length) {
            html += '<div class="search-category-label">Recipes</div>';
            recipeResults.forEach(r => {
                html += `<div class="search-result-item" role="option" data-type="recipe" data-id="${r.id}" tabindex="0">
                    <svg class="search-result-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h18"/></svg>
                    <div class="search-result-info">
                        <span class="search-result-name">${highlightMatch(r.name, query)}</span>
                        <span class="search-result-type">Recipe — ${RECIPE_TYPES[r.type] || r.type}</span>
                    </div>
                </div>`;
            });
        }

        if (itemResults.length) {
            html += '<div class="search-category-label">Items</div>';
            itemResults.forEach(i => {
                html += `<div class="search-result-item" role="option" data-type="item" data-id="${i.id}" tabindex="0">
                    <svg class="search-result-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="12" cy="12" r="3"/></svg>
                    <div class="search-result-info">
                        <span class="search-result-name">${highlightMatch(i.name, query)}</span>
                        <span class="search-result-type">Item — ${i.category}</span>
                    </div>
                </div>`;
            });
        }

        if (mobResults.length) {
            html += '<div class="search-category-label">Mobs</div>';
            mobResults.forEach(m => {
                html += `<div class="search-result-item" role="option" data-type="mob" data-id="${m.id}" tabindex="0">
                    <svg class="search-result-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/><circle cx="9" cy="10" r="1.5"/><circle cx="15" cy="10" r="1.5"/></svg>
                    <div class="search-result-info">
                        <span class="search-result-name">${highlightMatch(m.name, query)}</span>
                        <span class="search-result-type">Mob — ${MOB_CATEGORIES[m.category] || m.category}</span>
                    </div>
                </div>`;
            });
        }

        if (commandResults.length) {
            html += '<div class="search-category-label">Commands</div>';
            commandResults.forEach(c => {
                html += `<div class="search-result-item" role="option" data-type="command" data-id="${c.id}" tabindex="0">
                    <svg class="search-result-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                    <div class="search-result-info">
                        <span class="search-result-name">${highlightMatch(c.name, query)}</span>
                        <span class="search-result-type">Command</span>
                    </div>
                </div>`;
            });
        }

        if (!html) {
            html = '<div class="search-result-item" style="justify-content:center;color:#616161;padding:16px;">No results found</div>';
        }

        resultsContainer.innerHTML = html;
        resultsContainer.hidden = false;
        searchResultIndex = -1;

        resultsContainer.querySelectorAll('.search-result-item[data-type]').forEach(item => {
            item.addEventListener('click', function() {
                const type = this.dataset.type;
                const id = this.dataset.id;
                resultsContainer.hidden = true;
                navigateToResult(type, id);
            });
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    const type = this.dataset.type;
                    const id = this.dataset.id;
                    resultsContainer.hidden = true;
                    navigateToResult(type, id);
                }
            });
        });
    }

    function navigateToResult(type, id) {
        const searchInput = document.getElementById('global-search');
        searchInput.value = '';

        switch(type) {
            case 'recipe':
                switchTab('recipes');
                setTimeout(() => { showRecipeDetail(id); updateUrl('recipes', id); }, 100);
                break;
            case 'item':
                switchTab('items');
                setTimeout(() => { showItemDetail(id); updateUrl('items', id); }, 100);
                break;
            case 'mob':
                switchTab('mobs');
                setTimeout(() => { showMobDetail(id); updateUrl('mobs', id); }, 100);
                break;
            case 'command':
                switchTab('commands');
                setTimeout(() => {
                    const el = document.querySelector(`[data-command-id="${id}"]`);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
                break;
        }
    }

    function showCompactResults(query) {
        const resultsContainer = document.getElementById('search-results');
        const recipeResults = searchRecipes(query);
        const mobResults = searchMobs(query);
        const commandResults = searchCommands(query);
        const itemResults = searchItems(query);

        const total = recipeResults.length + mobResults.length + commandResults.length + itemResults.length;

        if (total === 0) {
            resultsContainer.innerHTML = '<div class="search-result-item" style="justify-content:center;color:var(--color-text-secondary);padding:16px;">No results found</div>';
            resultsContainer.hidden = false;
            return;
        }

        const parts = [];
        if (recipeResults.length) parts.push(`${recipeResults.length} recipe${recipeResults.length !== 1 ? 's' : ''}`);
        if (itemResults.length) parts.push(`${itemResults.length} item${itemResults.length !== 1 ? 's' : ''}`);
        if (mobResults.length) parts.push(`${mobResults.length} mob${mobResults.length !== 1 ? 's' : ''}`);
        if (commandResults.length) parts.push(`${commandResults.length} command${commandResults.length !== 1 ? 's' : ''}`);

        let html = `<div class="search-compact-summary">
            <strong>${total} result${total !== 1 ? 's' : ''}</strong> found for "${query}"<br>
            <span class="search-compact-breakdown">${parts.join(' · ')}</span>
        </div>`;

        resultsContainer.innerHTML = html;
        resultsContainer.hidden = false;
        resultsContainer.querySelectorAll('.search-compact-summary')[0].addEventListener('click', function() {
            resultsContainer.hidden = true;
        });

        if (recipeResults.length >= itemResults.length && recipeResults.length >= mobResults.length && recipeResults.length >= commandResults.length) {
            switchTab('recipes');
        } else if (itemResults.length >= mobResults.length && itemResults.length >= commandResults.length) {
            switchTab('items');
        } else if (mobResults.length >= commandResults.length) {
            switchTab('mobs');
        } else {
            switchTab('commands');
        }

        const searchInput = document.getElementById('global-search');
        searchInput.value = '';
    }

    function updateSearchSelection(items) {
        items.forEach((item, i) => {
            item.setAttribute('aria-selected', i === searchResultIndex ? 'true' : 'false');
        });
        if (searchResultIndex >= 0 && items[searchResultIndex]) {
            items[searchResultIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    function highlightMatch(text, query) {
        const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
        return text.replace(regex, '<strong>$1</strong>');
    }

    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // ===== KEYBOARD SHORTCUTS =====
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                document.getElementById('global-search').focus();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('global-search').focus();
            }
            if (e.key === 'Escape') {
                closeAllModals();
                document.getElementById('search-results').hidden = true;
                document.getElementById('favorites-panel').hidden = true;
            }
            if (e.shiftKey && e.key === 'D') {
                e.preventDefault();
                toggleTheme();
            }
            if (e.shiftKey && e.key === 'R') {
                e.preventDefault();
                showRandomItem();
            }
            if (e.shiftKey && e.key === 'F') {
                e.preventDefault();
                document.getElementById('favorites-toggle').click();
            }
        });
    }

    function closeAllModals() {
        document.querySelectorAll('.recipe-detail, .item-detail, .mob-detail').forEach(el => {
            el.hidden = true;
        });
        var fp = document.getElementById('favorites-panel');
        if (fp) fp.hidden = true;
    }

    // ===== RECIPE FILTERING =====
    document.addEventListener('DOMContentLoaded', function() {
        const recipeCategory = document.getElementById('recipe-category');
        const recipeType = document.getElementById('recipe-type');
        if (recipeCategory) { populateRecipeCategories(recipeCategory); recipeCategory.addEventListener('change', renderRecipes); }
        if (recipeType) recipeType.addEventListener('change', renderRecipes);

        const mobCategory = document.getElementById('mob-category');
        if (mobCategory) { populateMobCategories(mobCategory); mobCategory.addEventListener('change', renderMobs); }

        const commandCategory = document.getElementById('command-category');
        if (commandCategory) { populateCommandCategories(commandCategory); commandCategory.addEventListener('change', renderCommands); }

        const itemCategory = document.getElementById('item-category');
        const itemRarity = document.getElementById('item-rarity');
        if (itemCategory) { populateItemCategories(itemCategory); itemCategory.addEventListener('change', renderItems); }
        if (itemRarity) itemRarity.addEventListener('change', renderItems);
    });

    // ===== RENDER RECIPES =====
    function renderRecipes() {
        const grid = document.getElementById('recipes-grid');
        const categoryFilter = document.getElementById('recipe-category').value;
        const typeFilter = document.getElementById('recipe-type').value;

        let recipes = getRecipes(selectedVersion);
        if (categoryFilter) recipes = recipes.filter(r => r.category === categoryFilter);
        if (typeFilter) recipes = recipes.filter(r => r.type === typeFilter);

        let html = '';
        recipes.forEach(recipe => {
            const ingredients = recipe.ingredients || [];
            const gridHtml = recipe.grid ? renderCraftingGrid(recipe.grid) : '';
            const typeClass = recipe.type.replace('_', '');
            const typeLabel = RECIPE_TYPES[recipe.type] || recipe.type;

            html += `<div class="recipe-card" role="listitem" data-recipe-id="${recipe.id}">
                <button class="card-header" onclick="window.showRecipeDetail('${recipe.id}')" aria-label="View ${recipe.name} recipe details" style="width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:0;">
                    <div class="card-icon">
                        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                            <rect x="2" y="2" width="28" height="28" rx="4"/>
                            <path d="M10 10h12M10 16h12M10 22h8"/>
                        </svg>
                    </div>
                    <div class="card-info">
                        <div class="card-name">${recipe.name}</div>
                        <div class="card-meta">
                            <span class="card-tag tag-${typeClass}">${typeLabel}</span>
                        </div>
                    </div>
                </button>
                ${gridHtml ? `<div style="padding:12px 0;">${gridHtml}</div>` : ''}
                <div class="card-result">
                    <div class="result-info">
                        <span style="font-size:0.875rem;color:#616161;">Yields:</span>
                        <span class="result-count">${recipe.resultCount || 1}</span>
                    </div>
                    ${renderFavoriteButton('recipe', recipe.id, recipe.name)}
                    <button class="btn btn-secondary btn-icon" onclick="copyText('${recipe.name} recipe: ${recipe.ingredients.join(', ')}')" aria-label="Copy ${recipe.name} recipe info">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                    </button>
                </div>
            </div>`;
        });

        grid.innerHTML = html || '<p style="grid-column:1/-1;text-align:center;padding:40px;color:#616161;">No recipes found.</p>';
    }

    function renderCraftingGrid(grid) {
        if (!grid) return '';
        var rowNames = ['Top row', 'Middle row', 'Bottom row'];
        var rows = [grid.slice(0, 3), grid.slice(3, 6), grid.slice(6, 9)];
        var html = '<div class="crafting-grid-text" role="img" aria-label="Crafting recipe layout">';
        rows.forEach(function(row, ri) {
            var slots = row.map(function(slot) {
                return (slot && slot !== null) ? formatItemId(slot) : 'empty';
            });
            html += '<div class="crafting-row"><span class="crafting-row-label">' + rowNames[ri] + ':</span> ' + slots.join(', ') + '</div>';
        });
        html += '</div>';
        return html;
    }

    function showRecipeDetail(id) {
        const recipe = getRecipeById(id);
        if (!recipe) return;

        const detail = document.getElementById('recipe-detail');
        const typeClass = recipe.type.replace('_', '');
        const typeLabel = RECIPE_TYPES[recipe.type] || recipe.type;

        let html = `<div class="detail-panel" role="document">
            <div class="detail-header">
                <h3 id="recipe-detail-title" class="detail-title">${recipe.name}</h3>
                <button class="detail-close" onclick="closeDetailModal()" aria-label="Close dialog">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
            </div>
            <div class="detail-content">
                <div class="detail-grid">
                    <div class="detail-field">
                        <span class="detail-label">Type</span>
                        <span class="detail-value"><span class="card-tag tag-${typeClass}">${typeLabel}</span></span>
                    </div>
                    <div class="detail-field">
                        <span class="detail-label">Result</span>
                        <span class="detail-value">${recipe.resultCount || 1}x ${formatItemId(recipe.result)}</span>
                    </div>
                    <div class="detail-field">
                        <span class="detail-label">Added in</span>
                        <span class="detail-value">${recipe.added}</span>
                    </div>
                    ${recipe.xp ? `<div class="detail-field">
                        <span class="detail-label">XP</span>
                        <span class="detail-value">${recipe.xp}</span>
                    </div>` : ''}
                    ${recipe.cookTime ? `<div class="detail-field">
                        <span class="detail-label">Cook Time</span>
                        <span class="detail-value">${recipe.cookTime / 20}s (${recipe.cookTime} ticks)</span>
                    </div>` : ''}
                </div>
                <h4 style="margin:16px 0 8px;font-size:0.875rem;color:var(--color-text-secondary);text-transform:uppercase;">Ingredients</h4>
                <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">
                    ${recipe.ingredients.map(i => `<span style="background:var(--color-surface-hover);padding:4px 12px;border-radius:8px;font-size:0.875rem;">${formatItemId(i)}</span>`).join('')}
                </div>
                ${recipe.grid ? `<h4 style="margin:16px 0 8px;font-size:0.875rem;color:#616161;text-transform:uppercase;">Crafting Layout</h4>
                ${renderCraftingGrid(recipe.grid)}` : ''}
                ${recipe.note ? `<p style="margin-top:16px;font-size:0.875rem;color:#616161;font-style:italic;">${recipe.note}</p>` : ''}
                <div style="margin-top:24px;display:flex;gap:8px;">
                    <button class="btn btn-primary" onclick="copyText('/give @s ${recipe.result} ${recipe.resultCount || 1}')">Copy /give Command</button>
                    <button class="btn btn-secondary" onclick="copyText('${recipe.name}: ${recipe.ingredients.join(' + ')} = ${recipe.resultCount || 1}x ${recipe.result}')">Copy Recipe</button>
                </div>
            </div>
        </div>`;

        detail.innerHTML = html;
        detail.hidden = false;
        detail.querySelector('.detail-close').focus();
    }

    // ===== RENDER ITEMS =====
    function renderItems() {
        const grid = document.getElementById('items-grid');
        const categoryFilter = document.getElementById('item-category').value;
        const rarityFilter = document.getElementById('item-rarity').value;

        let items = getItems();
        if (categoryFilter) items = items.filter(i => i.category === categoryFilter);
        if (rarityFilter) items = items.filter(i => i.rarity === rarityFilter);

        let html = '';
        items.forEach(item => {
            const rarityColor = ITEM_RARITIES[item.rarity]?.color || '#fff';
            html += `<div class="item-card" role="listitem">
                <button class="card-header" onclick="window.showItemDetail('${item.id}')" aria-label="View ${item.name} details" style="width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:0;">
                    <div class="card-icon">
                        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5">
                            <rect x="4" y="4" width="24" height="24" rx="4"/>
                            <circle cx="16" cy="16" r="6"/>
                        </svg>
                    </div>
                    <div class="card-info">
                        <div class="card-name">${item.name}</div>
                        <div class="card-meta">
                            <span class="card-tag" style="background:${rarityColor}20;color:${rarityColor};">${item.rarity}</span>
                            <span class="card-type">${ITEM_CATEGORIES[item.category] || item.category}</span>
                        </div>
                    </div>
                </button>
                <div class="card-result">
                    <div class="result-info">
                        <span style="font-size:0.8rem;color:#616161;">Stack: ${item.stackable}</span>
                    </div>
                    ${renderFavoriteButton('item', item.id, item.name)}
                    <button class="btn btn-secondary btn-icon" onclick="event.stopPropagation();copyText('/give @s ${item.id}')" aria-label="Copy give command for ${item.name}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                    </button>
                </div>
            </div>`;
        });

        grid.innerHTML = html || '<p style="grid-column:1/-1;text-align:center;padding:40px;color:#616161;">No items found.</p>';
    }

    function showItemDetail(id) {
        const item = getItemById(id);
        if (!item) return;

        const detail = document.getElementById('item-detail');
        const rarityColor = ITEM_RARITIES[item.rarity]?.color || '#fff';
        const recipes = RECIPES.filter(r => r.result === id || r.ingredients.includes(id));

        let html = `<div class="detail-panel" role="document">
            <div class="detail-header">
                <h3 id="item-detail-title" class="detail-title">${item.name}</h3>
                <button class="detail-close" onclick="closeDetailModal()" aria-label="Close dialog">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
            </div>
            <div class="detail-content">
                <div class="detail-grid">
                    <div class="detail-field">
                        <span class="detail-label">Rarity</span>
                        <span class="detail-value" style="color:${rarityColor};font-weight:700;">${ITEM_RARITIES[item.rarity]?.label || item.rarity}</span>
                    </div>
                    <div class="detail-field">
                        <span class="detail-label">Category</span>
                        <span class="detail-value">${ITEM_CATEGORIES[item.category] || item.category}</span>
                    </div>
                    <div class="detail-field">
                        <span class="detail-label">Stack Size</span>
                        <span class="detail-value">${item.stackable}</span>
                    </div>
                    <div class="detail-field">
                        <span class="detail-label">Added In</span>
                        <span class="detail-value">${item.added}</span>
                    </div>
                    ${item.hardness != null ? `<div class="detail-field">
                        <span class="detail-label">Hardness</span>
                        <span class="detail-value">${item.hardness}</span>
                    </div>` : ''}
                    ${item.durability ? `<div class="detail-field">
                        <span class="detail-label">Durability</span>
                        <span class="detail-value">${item.durability}</span>
                    </div>` : ''}
                    ${item.damage ? `<div class="detail-field">
                        <span class="detail-label">Damage</span>
                        <span class="detail-value">${item.damage}</span>
                    </div>` : ''}
                    ${item.defense ? `<div class="detail-field">
                        <span class="detail-label">Defense</span>
                        <span class="detail-value">${item.defense}</span>
                    </div>` : ''}
                    ${item.hunger ? `<div class="detail-field">
                        <span class="detail-label">Hunger</span>
                        <span class="detail-value">${item.hunger} Shanks</span>
                    </div>` : ''}
                </div>
                ${recipes.length ? `<h4 style="margin:24px 0 8px;font-size:0.875rem;color:#616161;text-transform:uppercase;">Related Recipes (${recipes.length})</h4>
                <div style="display:flex;flex-direction:column;gap:4px;">
                    ${recipes.slice(0, 5).map(r => `<button class="btn btn-secondary" onclick="closeDetailModal();window.showRecipeDetail('${r.id}')" style="justify-content:flex-start;text-align:left;">
                        <span>${r.name}</span> <span class="card-tag tag-${r.type.replace('_', '')}" style="font-size:0.6rem;">${RECIPE_TYPES[r.type] || r.type}</span>
                    </button>`).join('')}
                </div>` : ''}
                <div style="margin-top:24px;display:flex;gap:8px;">
                    <button class="btn btn-primary" onclick="copyText('/give @s ${item.id}')">Copy /give Command</button>
                </div>
            </div>
        </div>`;

        detail.innerHTML = html;
        detail.hidden = false;
        detail.querySelector('.detail-close').focus();
    }

    // ===== RENDER MOBS =====
    function renderMobs() {
        const grid = document.getElementById('mobs-grid');
        const categoryFilter = document.getElementById('mob-category').value;

        let mobs = getMobs();
        if (categoryFilter) mobs = mobs.filter(m => m.category === categoryFilter);

        let html = '';
        mobs.forEach(mob => {
            const catColor = {
                passive: '#4CAF50', neutral: '#FFB300', hostile: '#F44336',
                boss: '#9C27B0', water: '#2196F3', utility: '#00BCD4', npc: '#8BC34A'
            }[mob.category] || '#607D8B';

            html += `<div class="mob-card" role="listitem">
                <button class="card-header" onclick="window.showMobDetail('${mob.id}')" aria-label="View ${mob.name} drop chances" style="width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:0;">
                    <div class="card-icon" style="border:2px solid ${catColor}40;">
                        <svg viewBox="0 0 32 32" fill="none" stroke="${catColor}" stroke-width="1.5">
                            <circle cx="16" cy="12" r="8"/>
                            <path d="M8 28c0-4 4-7 8-7s8 3 8 7"/>
                            <circle cx="12" cy="11" r="1.5" fill="${catColor}"/>
                            <circle cx="20" cy="11" r="1.5" fill="${catColor}"/>
                        </svg>
                    </div>
                    <div class="card-info">
                        <div class="card-name">${mob.name}</div>
                        <div class="card-meta">
                            <span class="card-tag" style="background:${catColor}20;color:${catColor};">${MOB_CATEGORIES[mob.category] || mob.category}</span>
                            <span class="card-type">HP: ${mob.health}</span>
                        </div>
                    </div>
                </button>
                <div class="card-result">
                    <div class="result-info">
                        <span style="font-size:0.8rem;color:#616161;">${mob.drops.length} drops</span>
                    </div>
                    ${renderFavoriteButton('mob', mob.id, mob.name)}
                    <button class="btn btn-secondary btn-icon" onclick="event.stopPropagation();copyMobDrops('${mob.id}')" aria-label="Copy ${mob.name} drops">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                    </button>
                </div>
            </div>`;
        });

        grid.innerHTML = html || '<p style="grid-column:1/-1;text-align:center;padding:40px;color:#616161;">No mobs found.</p>';
    }

    function showMobDetail(id) {
        const mob = getMobById(id);
        if (!mob) return;

        const detail = document.getElementById('mob-detail');
        const catColor = {
            passive: '#4CAF50', neutral: '#FFB300', hostile: '#F44336',
            boss: '#9C27B0', water: '#2196F3', utility: '#00BCD4', npc: '#8BC34A'
        }[mob.category] || '#607D8B';

        let html = `<div class="detail-panel" role="document">
            <div class="detail-header">
                <h3 id="mob-detail-title" class="detail-title">${mob.name}</h3>
                <button class="detail-close" onclick="closeDetailModal()" aria-label="Close dialog">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
            </div>
            <div class="detail-content">
                <div class="detail-grid">
                    <div class="detail-field">
                        <span class="detail-label">Category</span>
                        <span class="detail-value" style="color:${catColor};font-weight:700;">${MOB_CATEGORIES[mob.category] || mob.category}</span>
                    </div>
                    <div class="detail-field">
                        <span class="detail-label">Health</span>
                        <span class="detail-value">${mob.health}</span>
                    </div>
                    <div class="detail-field">
                        <span class="detail-label">XP Drop</span>
                        <span class="detail-value">${mob.xp}</span>
                    </div>
                    <div class="detail-field">
                        <span class="detail-label">Added In</span>
                        <span class="detail-value">${mob.added}</span>
                    </div>
                </div>
                ${mob.spawns?.length ? `<div class="detail-field" style="margin-top:16px;">
                    <span class="detail-label">Spawns In</span>
                    <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px;">
                        ${mob.spawns.map(s => `<span style="background:#f5f5f5;padding:2px 8px;border-radius:4px;font-size:0.8rem;">${s.replace(/_/g, ' ')}</span>`).join('')}
                    </div>
                </div>` : ''}
                <h4 style="margin:24px 0 12px;font-size:0.875rem;color:#616161;text-transform:uppercase;">Drop Table</h4>
                <div class="table-responsive">
                    <table class="drop-table" aria-label="${mob.name} drops">
                        <thead>
                            <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Count</th>
                                <th scope="col">Chance</th>
                                <th scope="col">Condition</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${mob.drops.map(d => `<tr>
                                <td><strong>${formatItemId(d.item)}</strong></td>
                                <td>${d.count}</td>
                                <td><span class="drop-chance">${d.chance}</span></td>
                                <td><span class="drop-condition">${d.condition}</span></td>
                            </tr>`).join('')}
                        </tbody>
                    </table>
                </div>
                <div style="margin-top:24px;">
                    <button class="btn btn-primary" onclick="copyMobDrops('${mob.id}')">Copy All Drops</button>
                </div>
            </div>
        </div>`;

        detail.innerHTML = html;
        detail.hidden = false;
        detail.querySelector('.detail-close').focus();
    }

    // ===== RENDER COMMANDS =====
    function renderCommands() {
        const list = document.getElementById('commands-list');
        const categoryFilter = document.getElementById('command-category').value;

        let commands = getCommands();
        if (categoryFilter) commands = commands.filter(c => c.category === categoryFilter);

        let html = '';
        commands.forEach(cmd => {
            html += `<div class="command-card" data-command-id="${cmd.id}">
                <button class="command-header" onclick="toggleCommandDetail(this)" aria-expanded="false" aria-controls="cmd-detail-${cmd.id}">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <span class="command-name">${cmd.name}</span>
                        <span class="command-category">${COMMAND_CATEGORIES[cmd.category] || cmd.category}</span>
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                <div id="cmd-detail-${cmd.id}" class="command-detail-content" hidden>
                    <div class="command-description">${cmd.description}</div>
                    <div class="command-syntax">
                        <strong style="font-size:0.75rem;text-transform:uppercase;color:#616161;">Syntax</strong>
                        <code>${cmd.syntax}</code>
                    </div>
                    ${cmd.aliases?.length ? `<div style="padding:8px 16px;font-size:0.8rem;color:#616161;">
                        <strong>Aliases:</strong> ${cmd.aliases.join(', ')}
                    </div>` : ''}
                    <div class="command-examples">
                        <h5>Examples</h5>
                        ${cmd.examples.map(e => `<code>${e}</code>`).join('')}
                    </div>
                    ${cmd.params?.length ? `<div style="padding:8px 16px;">
                        <h5 style="font-size:0.75rem;font-weight:600;text-transform:uppercase;color:#616161;margin-bottom:8px;">Parameters</h5>
                        <div style="display:flex;flex-direction:column;gap:4px;">
                            ${cmd.params.map(p => `<div style="font-size:0.8rem;">
                                <code style="background:#e3f2fd;padding:1px 6px;border-radius:4px;">${p.name}</code>
                                ${p.required ? '<span style="color:#c62828;">*</span>' : ''}
                                <span style="color:#616161;">— ${p.description}</span>
                            </div>`).join('')}
                        </div>
                    </div>` : ''}
                    <div class="command-footer">
                        <button class="btn btn-primary" onclick="copyText('${cmd.syntax.replace(/'/g, "\\'")}')">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                            Copy Command
                        </button>
                    </div>
                </div>
            </div>`;
        });

        list.innerHTML = html || '<p style="text-align:center;padding:40px;color:#616161;">No commands found.</p>';
    }

    function toggleCommandDetail(btn) {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        const detail = btn.nextElementSibling;
        btn.setAttribute('aria-expanded', !expanded);
        detail.hidden = expanded;

        if (!expanded) {
            btn.querySelector('svg').style.transform = 'rotate(180deg)';
        } else {
            btn.querySelector('svg').style.transform = '';
        }
    }

    // ===== RENDER REFERENCES =====
    function renderReferences() {
        renderEnchantments();
        renderPotions();
        renderBiomes();
        renderAdvancements();
        initReferenceTabs();
    }

    function initReferenceTabs() {
        document.querySelectorAll('.ref-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.ref-tab').forEach(t => {
                    t.setAttribute('aria-selected', 'false');
                    t.classList.remove('active');
                });
                document.querySelectorAll('.ref-panel').forEach(p => {
                    p.hidden = true;
                    p.classList.remove('active');
                });
                this.setAttribute('aria-selected', 'true');
                this.classList.add('active');
                const panel = document.getElementById(this.getAttribute('aria-controls'));
                if (panel) {
                    panel.hidden = false;
                    panel.classList.add('active');
                }
            });
        });
    }

    function renderEnchantments() {
        const panel = document.getElementById('ref-enchantments');
        const enchants = getEnchantments();
        let html = '<div class="table-responsive"><table class="reference-table" aria-label="Enchantments"><thead><tr><th scope="col">Enchantment</th><th scope="col">Type</th><th scope="col">Max Level</th><th scope="col">Weight</th><th scope="col">Description</th></tr></thead><tbody>';
        enchants.forEach(e => {
            html += `<tr>
                <td><strong>${e.name}</strong></td>
                <td><code>${e.type}</code></td>
                <td>${e.maxLevel}</td>
                <td>${e.weight}</td>
                <td>${e.description}</td>
            </tr>`;
        });
        html += '</tbody></table></div>';
        panel.innerHTML = html;
    }

    function renderPotions() {
        const panel = document.getElementById('ref-potions');
        const potions = getPotions();
        let html = '<div class="table-responsive"><table class="reference-table" aria-label="Potions"><thead><tr><th scope="col">Potion</th><th scope="col">Effect</th><th scope="col">Duration</th><th scope="col">Ingredients</th></tr></thead><tbody>';
        potions.forEach(p => {
            html += `<tr>
                <td><strong>${p.name}</strong></td>
                <td>${p.effect || '—'}</td>
                <td>${p.duration || '—'}</td>
                <td><code>${p.ingredients.join(' + ')}</code></td>
            </tr>`;
        });
        html += '</tbody></table></div>';
        panel.innerHTML = html;
    }

    function renderBiomes() {
        const panel = document.getElementById('ref-biomes');
        const biomes = getBiomes();
        let html = '<div class="table-responsive"><table class="reference-table" aria-label="Biomes"><thead><tr><th scope="col">Biome</th><th scope="col">Type</th><th scope="col">Temperature</th><th scope="col">Rainfall</th></tr></thead><tbody>';
        biomes.forEach(b => {
            html += `<tr>
                <td><strong>${b.name}</strong></td>
                <td>${b.biomeType}</td>
                <td>${b.temperature}</td>
                <td>${b.rainfall}</td>
            </tr>`;
        });
        html += '</tbody></table></div>';
        panel.innerHTML = html;
    }

    function renderAdvancements() {
        const panel = document.getElementById('ref-advancements');
        const advancements = getAdvancements();
        let html = '<div class="table-responsive"><table class="reference-table" aria-label="Advancements"><thead><tr><th scope="col">Name</th><th scope="col">Description</th><th scope="col">Category</th><th scope="col">ID</th></tr></thead><tbody>';
        advancements.forEach(a => {
            html += `<tr>
                <td><strong>${a.name || '—'}</strong></td>
                <td>${a.description}</td>
                <td>${a.category}</td>
                <td><code style="font-size:0.75rem;">${a.id}</code></td>
            </tr>`;
        });
        html += '</tbody></table></div>';
        panel.innerHTML = html;
    }

    // ===== TOOLS TAB =====
    function renderTools() {
        initToolsTabs();
        renderNetherCalculator();
        renderEnchantmentChecker();
        renderEnchantingTable();
        renderXPCalculator();
        renderArmorCalculator();
        renderFoodGuide();
        renderBrewingGuide();
        renderVillagerTrading();
        renderMobSpawning();
        renderBlockProperties();
        renderStructures();
        renderRedstoneGuide();
    }

    function initToolsTabs() {
        document.querySelectorAll('#tools .ref-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('#tools .ref-tab').forEach(t => {
                    t.setAttribute('aria-selected', 'false');
                    t.classList.remove('active');
                });
                document.querySelectorAll('#tools .ref-panel').forEach(p => {
                    p.hidden = true;
                    p.classList.remove('active');
                });
                this.setAttribute('aria-selected', 'true');
                this.classList.add('active');
                const panel = document.getElementById(this.getAttribute('aria-controls'));
                if (panel) {
                    panel.hidden = false;
                    panel.classList.add('active');
                }
            });
        });
    }

    // ===== NETHER CALCULATOR =====
    function renderNetherCalculator() {
        const panel = document.getElementById('tool-nether-calc');
        panel.innerHTML = `
            <h3 style="margin-bottom:16px;">Nether Portal Distance Calculator</h3>
            <p style="color:var(--color-text-secondary);margin-bottom:16px;font-size:0.9rem;">1 block in the Nether = 8 blocks in the Overworld. Enter either coordinate to see the equivalent.</p>
            <div class="calc-form">
                <div class="form-group">
                    <label for="nether-overworld">Overworld Distance (blocks)</label>
                    <input type="number" id="nether-overworld" min="0" placeholder="e.g. 800">
                </div>
                <div class="form-group">
                    <label for="nether-nether">Nether Distance (blocks)</label>
                    <input type="number" id="nether-nether" min="0" placeholder="e.g. 100">
                </div>
            </div>
            <div id="nether-result" class="calc-result">Enter a distance above</div>
            <div style="margin-top:16px;padding:16px;background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-md);">
                <h4 style="margin-bottom:8px;">Quick Reference</h4>
                <p style="font-size:0.85rem;color:var(--color-text-secondary);">Traveling <strong>1,000 blocks</strong> in the Overworld is just <strong>125 blocks</strong> in the Nether. Nether travel is the fastest way to cover large distances!</p>
            </div>
        `;
        const overworldInput = document.getElementById('nether-overworld');
        const netherInput = document.getElementById('nether-nether');
        const result = document.getElementById('nether-result');

        overworldInput.addEventListener('input', function() {
            const val = parseInt(this.value);
            if (!isNaN(val) && val >= 0) {
                const nether = Math.ceil(val / 8);
                netherInput.value = '';
                result.innerHTML = `${val.toLocaleString()} blocks Overworld<br><small>= ${nether.toLocaleString()} blocks in the Nether</small>`;
            } else {
                result.textContent = 'Enter a distance above';
            }
        });

        netherInput.addEventListener('input', function() {
            const val = parseInt(this.value);
            if (!isNaN(val) && val >= 0) {
                const overworld = val * 8;
                overworldInput.value = '';
                result.innerHTML = `${val.toLocaleString()} blocks in the Nether<br><small>= ${overworld.toLocaleString()} blocks Overworld</small>`;
            } else {
                result.textContent = 'Enter a distance above';
            }
        });
    }

    // ===== ENCHANTMENT CHECKER =====
    function renderEnchantmentChecker() {
        const panel = document.getElementById('tool-enchant-check');
        const compatData = typeof ENCHANTMENT_COMPATIBILITY !== 'undefined' ? ENCHANTMENT_COMPATIBILITY : {};
        const levelsData = typeof ENCHANTMENT_LEVELS !== 'undefined' ? ENCHANTMENT_LEVELS : {};
        const enchNames = typeof ENCHANTMENTS !== 'undefined' ? ENCHANTMENTS : [];

        function getEnchantName(id) {
            const e = enchNames.find(en => en.id === id);
            return e ? e.name : id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        }

        const enchantIds = Object.keys(compatData);
        let gridHtml = '';
        enchantIds.forEach(id => {
            const name = getEnchantName(id);
            gridHtml += `<button class="enchant-chip" data-enchant="${id}" role="checkbox" aria-checked="false" aria-label="${name}">${name}</button>`;
        });

        panel.innerHTML = `
            <h3 style="margin-bottom:16px;">Enchantment Compatibility Checker</h3>
            <p style="color:var(--color-text-secondary);margin-bottom:16px;font-size:0.9rem;">Select enchantments to check if they can be applied together. Conflicting enchantments are shown in red.</p>
            <div class="enchant-grid" role="group" aria-label="Enchantment selection">${gridHtml}</div>
            <div id="enchant-result" class="calc-result">Select enchantments to check compatibility</div>
            <div id="enchant-details" style="margin-top:16px;"></div>
        `;

        const chips = panel.querySelectorAll('.enchant-chip');
        const resultDiv = document.getElementById('enchant-result');
        const detailsDiv = document.getElementById('enchant-details');
        const selected = new Set();

        chips.forEach(chip => {
            chip.addEventListener('click', function() {
                const id = this.dataset.enchant;
                if (selected.has(id)) {
                    selected.delete(id);
                    this.classList.remove('selected');
                    this.setAttribute('aria-checked', 'false');
                } else {
                    selected.add(id);
                    this.classList.add('selected');
                    this.setAttribute('aria-checked', 'true');
                }
                checkEnchantCompatibility(selected, chips, resultDiv, detailsDiv, compatData, enchNames);
            });
        });
    }

    function checkEnchantCompatibility(selected, chips, resultDiv, detailsDiv, compatData, enchNames) {
        function getEnchantName(id) {
            const e = enchNames.find(en => en.id === id);
            return e ? e.name : id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        }

        if (selected.size === 0) {
            resultDiv.textContent = 'Select enchantments to check compatibility';
            detailsDiv.innerHTML = '';
            return;
        }

        const selectedArr = Array.from(selected);
        const conflicts = [];

        for (let i = 0; i < selectedArr.length; i++) {
            for (let j = i + 1; j < selectedArr.length; j++) {
                const a = compatData[selectedArr[i]];
                const b = compatData[selectedArr[j]];
                if (a && b) {
                    if ((a.conflicts && a.conflicts.includes(selectedArr[j])) || (b.conflicts && b.conflicts.includes(selectedArr[i]))) {
                        conflicts.push([getEnchantName(selectedArr[i]), getEnchantName(selectedArr[j])]);
                    }
                }
            }
        }

        chips.forEach(chip => {
            const id = chip.dataset.enchant;
            const info = compatData[id];
            const hasConflict = info && info.conflicts && info.conflicts.some(c => selected.has(c) && c !== id);
            if (hasConflict && !selected.has(id)) {
                chip.classList.add('conflict');
                chip.setAttribute('aria-disabled', 'true');
            } else {
                chip.classList.remove('conflict');
                chip.removeAttribute('aria-disabled');
            }
        });

        if (conflicts.length > 0) {
            resultDiv.innerHTML = `&#10060; ${conflicts.length} conflict(s) found`;
            resultDiv.style.background = 'var(--color-error)';
            detailsDiv.innerHTML = `<div style="padding:16px;background:var(--color-surface);border:1px solid var(--color-error);border-radius:var(--radius-md);">
                <h4 style="color:var(--color-error);margin-bottom:8px;">Conflicts:</h4>
                <ul style="list-style:disc;padding-left:20px;color:var(--color-text-secondary);">
                    ${conflicts.map(c => `<li>${c[0]} &lt;=&gt; ${c[1]}</li>`).join('')}
                </ul>
            </div>`;
        } else {
            resultDiv.innerHTML = `&#10004; All ${selectedArr.length} enchantments are compatible`;
            resultDiv.style.background = 'var(--color-success)';
            detailsDiv.innerHTML = '';
        }
    }

    // ===== ENCHANTING TABLE =====
    function renderEnchantingTable() {
        const panel = document.getElementById('tool-enchant-table');
        panel.innerHTML = `
            <h3 style="margin-bottom:16px;">Enchanting Table Simulator</h3>
            <p style="color:var(--color-text-secondary);margin-bottom:16px;font-size:0.9rem;">See what enchantments are possible based on bookshelves and lapis lazuli levels.</p>
            <div class="calc-form">
                <div class="form-group">
                    <label for="ench-shelves">Bookshelves (0-15)</label>
                    <input type="range" id="ench-shelves" min="0" max="15" value="15" aria-label="Number of bookshelves">
                    <output id="ench-shelves-val" for="ench-shelves">15</output>
                </div>
                <div class="form-group">
                    <label for="ench-slot">Enchantment Slot (Top/Middle/Bottom)</label>
                    <select id="ench-slot">
                        <option value="0">Slot 1 (1-10 levels)</option>
                        <option value="1">Slot 2 (8-20 levels)</option>
                        <option value="2" selected>Slot 3 (15-30 levels)</option>
                    </select>
                </div>
            </div>
            <div id="ench-table-result" class="calc-result" style="flex-direction:column;"></div>
            <div id="ench-table-details" style="margin-top:16px;"></div>
        `;

        const shelvesInput = document.getElementById('ench-shelves');
        const shelvesVal = document.getElementById('ench-shelves-val');
        const slotSelect = document.getElementById('ench-slot');
        const resultDiv = document.getElementById('ench-table-result');
        const detailsDiv = document.getElementById('ench-table-details');

        const update = () => {
            const shelves = parseInt(shelvesInput.value);
            shelvesVal.textContent = shelves;
            const slot = parseInt(slotSelect.value);
            const maxLevel = [10, 20, 30][slot];
            const minLevel = [1, 8, 15][slot];
            const enchantability = Math.floor(Math.random() * 6) + 3;

            const possibleEnchants = (typeof ENCHANTMENTS !== 'undefined' ? ENCHANTMENTS : []).filter(e => {
                const minTable = e.maxLevel >= 1 ? 1 : 0;
                return minTable > 0;
            });

            const slotHtml = [0, 1, 2].map((s, i) => `
                <div class="sim-slot ${s === slot ? 'filled' : ''}">${[10, 20, 30][s]}+</div>
            `).join('');

            resultDiv.innerHTML = `
                <div style="display:flex;gap:8px;margin-bottom:8px;">${slotHtml}</div>
                <span>Max Enchantment Level: ${maxLevel}</span>
                <small>With ${shelves} bookshelves</small>
            `;

            detailsDiv.innerHTML = `<div style="padding:16px;background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-md);">
                <h4 style="margin-bottom:8px;">Possible Enchantments (Slot ${slot + 1})</h4>
                <div style="display:flex;flex-wrap:wrap;gap:8px;">
                    ${possibleEnchants.slice(0, 15).map(e => `<span style="padding:4px 10px;background:var(--color-surface-hover);border-radius:var(--radius-sm);font-size:0.85rem;">${e.name} ${e.maxLevel > 1 ? `I-${'V'.repeat(e.maxLevel > 5 ? 1 : Math.min(e.maxLevel, 5))}` : 'I'}</span>`).join('')}
                </div>
                <p style="margin-top:12px;font-size:0.85rem;color:var(--color-text-secondary);">Need ${shelves < 15 ? `${15 - shelves} more bookshelves` : 'all 15 bookshelves!'} for best results.</p>
            </div>`;
        };

        shelvesInput.addEventListener('input', update);
        slotSelect.addEventListener('change', update);
        update();
    }

    // ===== XP CALCULATOR =====
    function renderXPCalculator() {
        const panel = document.getElementById('tool-xp-calc');
        panel.innerHTML = `
            <h3 style="margin-bottom:16px;">XP Level Calculator</h3>
            <p style="color:var(--color-text-secondary);margin-bottom:16px;font-size:0.9rem;">Calculate the total XP needed between levels for enchanting.</p>
            <div class="calc-form">
                <div class="form-group">
                    <label for="xp-from">From Level</label>
                    <input type="number" id="xp-from" min="0" max="100" value="0">
                </div>
                <div class="form-group">
                    <label for="xp-to">To Level</label>
                    <input type="number" id="xp-to" min="1" max="100" value="30">
                </div>
            </div>
            <div id="xp-result" class="calc-result"></div>
            <div id="xp-details" style="margin-top:16px;"></div>
        `;

        const fromInput = document.getElementById('xp-from');
        const toInput = document.getElementById('xp-to');
        const resultDiv = document.getElementById('xp-result');
        const detailsDiv = document.getElementById('xp-details');

        function xpForLevel(level) {
            if (level <= 16) return 2 * level + 7;
            if (level <= 31) return 5 * level - 38;
            return 9 * level - 158;
        }

        function totalXpForLevel(level) {
            let total = 0;
            for (let i = 1; i <= level; i++) {
                total += xpForLevel(i);
            }
            return total;
        }

        const update = () => {
            const from = parseInt(fromInput.value) || 0;
            const to = parseInt(toInput.value) || 1;
            const totalXp = totalXpForLevel(to) - totalXpForLevel(from);
            const levels = to - from;

            resultDiv.innerHTML = `${totalXp.toLocaleString()} XP<br><small>From level ${from} to ${to} (${levels} levels)</small>`;
        };

        fromInput.addEventListener('input', update);
        toInput.addEventListener('input', update);
        update();
    }

    // ===== ARMOR CALCULATOR =====
    function renderArmorCalculator() {
        const panel = document.getElementById('tool-armor-calc');
        const allItems = typeof ITEMS !== 'undefined' ? ITEMS : [];
        const armorData = allItems.filter(i => i.category === 'armor' && i.defense);

        if (armorData.length === 0) {
            panel.innerHTML = `<h3 style="margin-bottom:16px;">Armor Protection Calculator</h3>
            <p style="color:var(--color-text-secondary);margin-bottom:16px;">Armor data not available.</p>`;
            return;
        }

        const helmets = armorData.filter(a => a.id.includes('helmet') || a.id.includes('cap') || a.id === 'turtle_shell');
        const chests = armorData.filter(a => a.id.includes('chestplate') || a.id.includes('tunic'));
        const legs = armorData.filter(a => a.id.includes('leggings') || a.id.includes('pants'));
        const boots = armorData.filter(a => a.id.includes('boots'));

        function armorOptions(items) {
            return items.map(a => `<option value="${a.defense}">${a.name} (${a.defense})</option>`).join('');
        }

        panel.innerHTML = `
            <h3 style="margin-bottom:16px;">Armor Protection Calculator</h3>
            <p style="color:var(--color-text-secondary);margin-bottom:16px;font-size:0.9rem;">Select your armor pieces to calculate total damage reduction.</p>
            <div class="calc-form">
                <div class="form-group">
                    <label for="armor-helm">Helmet</label>
                    <select id="armor-helm"><option value="0">None</option>${armorOptions(helmets)}</select>
                </div>
                <div class="form-group">
                    <label for="armor-chest">Chestplate</label>
                    <select id="armor-chest"><option value="0">None</option>${armorOptions(chests)}</select>
                </div>
                <div class="form-group">
                    <label for="armor-legs">Leggings</label>
                    <select id="armor-legs"><option value="0">None</option>${armorOptions(legs)}</select>
                </div>
                <div class="form-group">
                    <label for="armor-boots">Boots</label>
                    <select id="armor-boots"><option value="0">None</option>${armorOptions(boots)}</select>
                </div>
            </div>
            <div id="armor-result" class="calc-result"></div>
        `;

        const helmInput = document.getElementById('armor-helm');
        const chestInput = document.getElementById('armor-chest');
        const legsInput = document.getElementById('armor-legs');
        const bootsInput = document.getElementById('armor-boots');
        const resultDiv = document.getElementById('armor-result');

        const update = () => {
            const total = parseInt(helmInput.value) + parseInt(chestInput.value) + parseInt(legsInput.value) + parseInt(bootsInput.value);
            const reduction = Math.min(20, Math.floor((total / 25) * 100));
            resultDiv.innerHTML = `${reduction}% Damage Reduction<br><small>Total armor points: ${total}</small>`;
        };

        [helmInput, chestInput, legsInput, bootsInput].forEach(el => el.addEventListener('change', update));
        update();
    }

    // ===== FOOD GUIDE =====
    function renderFoodGuide() {
        const panel = document.getElementById('tool-food-table');
        const foods = typeof FOODS !== 'undefined' ? FOODS : [];

        let html = '<h3 style="margin-bottom:16px;">Food & Saturation Guide</h3>';
        html += '<div class="food-table-wrapper"><table class="food-table" aria-label="Food comparison"><thead><tr><th>Food</th><th>Hunger</th><th>Saturation</th><th>Category</th><th>Effect</th></tr></thead><tbody>';
        foods.forEach(f => {
            html += `<tr>
                <td><strong>${f.name}</strong></td>
                <td>${f.hunger}</td>
                <td>${f.saturation}</td>
                <td>${f.category}</td>
                <td>${f.effect || '—'}</td>
            </tr>`;
        });
        html += '</tbody></table></div>';
        panel.innerHTML = html;
    }

    // ===== BREWING GUIDE =====
    function renderBrewingGuide() {
        const panel = document.getElementById('tool-brewing');
        const recipes = typeof BREWING_RECIPES !== 'undefined' ? BREWING_RECIPES : [];

        let html = '<h3 style="margin-bottom:16px;">Brewing Recipes</h3>';
        recipes.forEach(recipe => {
            const baseName = recipe.base.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            const ingredientName = recipe.ingredient.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            const resultName = recipe.result.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            html += `<div class="brewing-step">
                <div class="brewing-ingredient">
                    <span class="item-name">${baseName}</span>
                </div>
                <span class="brewing-arrow" aria-hidden="true">+</span>
                <div class="brewing-ingredient">
                    <span class="item-name">${ingredientName}</span>
                </div>
                <span class="brewing-arrow" aria-hidden="true">=</span>
                <div class="brewing-ingredient">
                    <span class="item-name">${resultName}</span>
                    <span>${recipe.effect || ''} ${recipe.duration || ''}</span>
                </div>
            </div>`;
        });
        panel.innerHTML = html || '<p style="color:var(--color-text-secondary);">No brewing recipes available.</p>';
    }

    // ===== VILLAGER TRADING =====
    function renderVillagerTrading() {
        const panel = document.getElementById('tool-villager');
        const professions = typeof VILLAGER_PROFESSIONS !== 'undefined' ? VILLAGER_PROFESSIONS : [];
        const trades = typeof VILLAGER_TRADES !== 'undefined' ? VILLAGER_TRADES : {};

        let html = '<h3 style="margin-bottom:16px;">Villager Trading Guide</h3>';
        professions.forEach(prof => {
            const profTrades = trades[prof.id] || {};
            const levels = ['novice', 'apprentice', 'journeyman', 'expert', 'master'];
            let tradeHtml = '';
            levels.forEach(level => {
                const levelTrades = profTrades[level] || [];
                if (levelTrades.length > 0) {
                    tradeHtml += `<div style="margin-bottom:8px;"><strong style="text-transform:capitalize;">${level}</strong></div>`;
                    levelTrades.forEach(t => {
                        tradeHtml += `<div class="trading-trade">
                            <span class="trade-give">${t.cost || t.item} ${t.count || ''}</span>
                            <span class="trade-arrow" aria-hidden="true">&rarr;</span>
                            <span class="trade-get">${t.reward || t.item} ${t.count || ''}</span>
                        </div>`;
                    });
                }
            });

            if (tradeHtml) {
                html += `<div class="trading-card">
                    <h3>${prof.icon} ${prof.name}</h3>
                    <p style="font-size:0.85rem;color:var(--color-text-secondary);margin-bottom:12px;">Workstation: ${prof.workstation}</p>
                    ${tradeHtml}
                </div>`;
            }
        });
        panel.innerHTML = html || '<p style="color:var(--color-text-secondary);">No trading data available.</p>';
    }

    // ===== MOB SPAWNING =====
    function renderMobSpawning() {
        const panel = document.getElementById('tool-spawning');
        const spawning = typeof MOB_SPAWNING !== 'undefined' ? MOB_SPAWNING : null;

        if (!spawning) {
            panel.innerHTML = '<p style="color:var(--color-text-secondary);">Spawning data not available.</p>';
            return;
        }

        let html = '<h3 style="margin-bottom:16px;">Mob Spawning Guide</h3>';

        if (spawning.general) {
            html += `<div class="spawn-card" style="margin-bottom:16px;"><h4>${spawning.general.description}</h4>`;
            (spawning.general.rules || []).forEach(r => {
                html += `<div class="spawn-rule"><strong>${r.rule}:</strong> ${r.value} <em style="font-size:0.8rem;color:var(--color-text-secondary);">(${r.detail})</em></div>`;
            });
            html += '</div>';
        }

        html += '<div class="spawn-grid">';
        if (spawning.hostile) {
            html += `<div class="spawn-card"><h4>Hostile Mobs</h4><p style="font-size:0.85rem;color:var(--color-text-secondary);margin-bottom:8px;">${spawning.hostile.description || ''}</p>`;
            (spawning.hostile.mobs || []).forEach(m => {
                html += `<div class="spawn-rule"><strong>${m.name}:</strong> Light: ${m.lightLevel}, Surface: ${m.spawnBlocks}, Biome: ${m.biome}. <em>${m.note}</em></div>`;
            });
            html += '</div>';
        }
        if (spawning.passive) {
            html += `<div class="spawn-card"><h4>Passive Mobs</h4><p style="font-size:0.85rem;color:var(--color-text-secondary);margin-bottom:8px;">${spawning.passive.description || ''}</p>`;
            (spawning.passive.mobs || []).forEach(m => {
                html += `<div class="spawn-rule"><strong>${m.name}:</strong> Light: ${m.lightLevel}, Surface: ${m.spawnBlocks}, Biome: ${m.biome}. <em>${m.note}</em></div>`;
            });
            html += '</div>';
        }
        html += '</div>';
        panel.innerHTML = html;
    }

    // ===== BLOCK PROPERTIES =====
    function renderBlockProperties() {
        const panel = document.getElementById('tool-blocks');
        const blocks = typeof BLOCKS !== 'undefined' ? BLOCKS : [];

        let html = '<h3 style="margin-bottom:16px;">Block Properties</h3><div class="block-grid">';
        blocks.forEach(b => {
            html += `<div class="block-card">
                <h4>${b.name}</h4>
                <div class="block-stat"><span class="label">Hardness</span><span class="value">${b.hardness ?? '—'}</span></div>
                <div class="block-stat"><span class="label">Blast Resistance</span><span class="value">${b.blastResistance ?? '—'}</span></div>
                <div class="block-stat"><span class="label">Light Level</span><span class="value">${b.lightLevel ?? 0}</span></div>
                <div class="block-stat"><span class="label">Tool</span><span class="value">${b.tool || '—'}</span></div>
                <div class="block-stat"><span class="label">Transparent</span><span class="value">${b.transparent ? 'Yes' : 'No'}</span></div>
                <div class="block-stat"><span class="label">Flammable</span><span class="value">${b.flammable ? 'Yes' : 'No'}</span></div>
            </div>`;
        });
        html += '</div>';
        panel.innerHTML = html || '<p style="color:var(--color-text-secondary);">No block data available.</p>';
    }

    // ===== STRUCTURES =====
    function renderStructures() {
        const panel = document.getElementById('tool-structures');
        const structures = typeof STRUCTURES !== 'undefined' ? STRUCTURES : [];

        let html = '<h3 style="margin-bottom:16px;">Structure Locator</h3><div class="structure-grid">';
        structures.forEach(s => {
            html += `<div class="structure-card">
                <h3>${s.name}</h3>
                <span class="dimension ${(s.dimension || '').toLowerCase()}">${s.dimension}</span>
                <p>${s.description || ''}</p>
                <div class="block-stat"><span class="label">Distance Range</span><span class="value">${s.minDistance || 0} - ${s.maxDistance || '?'} blocks</span></div>
                <div class="block-stat"><span class="label">Loot</span><span class="value">${(s.loot || []).slice(0, 3).map(l => l.replace(/_/g, ' ')).join(', ')}</span></div>
            </div>`;
        });
        html += '</div>';
        panel.innerHTML = html || '<p style="color:var(--color-text-secondary);">No structure data available.</p>';
    }

    // ===== REDSTONE GUIDE =====
    function renderRedstoneGuide() {
        const panel = document.getElementById('tool-redstone');
        const redstone = typeof REDSTONE_MECHANICS !== 'undefined' ? REDSTONE_MECHANICS : null;

        if (!redstone) {
            panel.innerHTML = '<p style="color:var(--color-text-secondary);">Redstone data not available.</p>';
            return;
        }

        let html = '<h3 style="margin-bottom:16px;">Redstone Mechanics Guide</h3><div class="redstone-grid">';

        Object.keys(redstone).forEach(key => {
            const section = redstone[key];
            html += `<div class="redstone-card"><h3>${section.title || key}</h3>`;
            if (section.topics) {
                html += '<ul>';
                section.topics.forEach(topic => {
                    html += `<li><strong>${topic.name}:</strong> ${topic.description}</li>`;
                });
                html += '</ul>';
            } else if (section.details) {
                html += '<ul>';
                section.details.forEach(d => {
                    html += `<li><strong>${d.property}:</strong> ${d.value} — ${d.description}</li>`;
                });
                html += '</ul>';
            } else if (section.rules) {
                html += '<ul>';
                section.rules.forEach(r => {
                    html += `<li><strong>${r.name}:</strong> ${r.value} — ${r.description}</li>`;
                });
                html += '</ul>';
            }
            html += '</div>';
        });

        html += '</div>';
        panel.innerHTML = html;
    }

    // ===== THEME TOGGLE =====
    function initThemeToggle() {
        const btn = document.getElementById('theme-toggle');
        if (!btn) return;
        const saved = localStorage.getItem('mcwiki_theme');
        if (saved) {
            document.documentElement.setAttribute('data-theme', saved);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        btn.addEventListener('click', toggleTheme);
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('mcwiki_theme', next);
    }

    // ===== FAVORITES =====
    function initFavorites() {
        const favBtn = document.getElementById('favorites-toggle');
        const favPanel = document.getElementById('favorites-panel');
        const favClose = document.getElementById('favorites-close');
        const exportBtn = document.getElementById('export-favorites');

        updateFavoritesCount();

        if (favBtn) favBtn.addEventListener('click', () => {
            renderFavoritesList();
            if (favPanel) { favPanel.hidden = false; favPanel.querySelector('.detail-close')?.focus(); }
        });

        if (favClose) favClose.addEventListener('click', () => { if (favPanel) favPanel.hidden = true; });
        if (favPanel) favPanel.addEventListener('click', (e) => {
            if (e.target === favPanel) favPanel.hidden = true;
        });

        if (exportBtn) exportBtn.addEventListener('click', () => {
            const data = favorites.map(f => f.type + ': ' + f.name + ' (' + f.id + ')').join('\n');
            copyText(data);
            showToast('Favorites exported to clipboard!');
        });
    }

    function toggleFavorite(type, id, name) {
        const idx = favorites.findIndex(f => f.type === type && f.id === id);
        if (idx >= 0) {
            favorites.splice(idx, 1);
            showToast('Removed from favorites');
        } else {
            favorites.push({ type: type, id: id, name: name || id });
            showToast('Added to favorites!');
        }
        localStorage.setItem('mcwiki_favorites', JSON.stringify(favorites));
        updateFavoritesCount();
    }

    function isFavorited(type, id) {
        return favorites.some(f => f.type === type && f.id === id);
    }

    function updateFavoritesCount() {
        const badge = document.getElementById('favorites-count');
        if (!badge) return;
        if (favorites.length > 0) {
            badge.textContent = favorites.length;
            badge.hidden = false;
        } else {
            badge.hidden = true;
        }
    }

    function renderFavoritesList() {
        const list = document.getElementById('favorites-list');
        if (!list) return;
        if (favorites.length === 0) {
            list.innerHTML = '';
            return;
        }
        list.innerHTML = favorites.map(f => `
            <div class="fav-item">
                <div class="fav-item-info" data-type="${f.type}" data-id="${f.id}">
                    <span class="fav-item-type">${f.type}</span>
                    <span>${f.name}</span>
                </div>
                <button class="fav-remove" data-type="${f.type}" data-id="${f.id}" aria-label="Remove ${f.name} from favorites">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
            </div>
        `).join('');

        list.querySelectorAll('.fav-item-info').forEach(el => {
            el.addEventListener('click', () => {
                const panel = document.getElementById('favorites-panel');
                if (panel) panel.hidden = true;
                navigateToResult(el.dataset.type, el.dataset.id);
            });
        });

        list.querySelectorAll('.fav-remove').forEach(el => {
            el.addEventListener('click', () => {
                toggleFavorite(el.dataset.type, el.dataset.id);
                renderFavoritesList();
            });
        });
    }

    function renderFavoriteButton(type, id, name) {
        const fav = isFavorited(type, id);
        return `<button class="btn btn-secondary btn-icon fav-btn ${fav ? 'fav-active' : ''}" onclick="event.stopPropagation();window.toggleFavorite('${type}','${id}','${name.replace(/'/g, "\\'")}')" aria-label="${fav ? 'Remove from favorites' : 'Add to favorites'}" title="${fav ? 'Remove from favorites' : 'Add to favorites'}">
            <svg viewBox="0 0 24 24" fill="${fav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        </button>`;
    }

    // ===== COMPARE ITEMS =====
    function initCompare() {
        const sel1 = document.getElementById('compare-item-1');
        const sel2 = document.getElementById('compare-item-2');
        if (!sel1 || !sel2) return;
        const allItems = typeof ITEMS !== 'undefined' ? ITEMS : [];
        const compareItems = allItems.filter(i => i.defense || i.damage || i.durability || i.hunger);

        const opts = compareItems.map(i => '<option value="' + i.id + '">' + i.name + '</option>').join('');
        sel1.innerHTML = '<option value="">Select item...</option>' + opts;
        sel2.innerHTML = '<option value="">Select item...</option>' + opts;

        sel1.addEventListener('change', updateCompare);
        sel2.addEventListener('change', updateCompare);
    }

    function updateCompare() {
        const result = document.getElementById('compare-result');
        const allItems = typeof ITEMS !== 'undefined' ? ITEMS : [];
        const id1 = document.getElementById('compare-item-1').value;
        const id2 = document.getElementById('compare-item-2').value;
        if (!id1 || !id2) {
            result.innerHTML = '<p style="color:var(--color-text-secondary);text-align:center;padding:32px;">Select two items to compare.</p>';
            return;
        }

        const item1 = allItems.find(i => i.id === id1);
        const item2 = allItems.find(i => i.id === id2);
        if (!item1 || !item2) return;

        const stats = [
            { label: 'Category', key: 'category' },
            { label: 'Rarity', key: 'rarity' },
            { label: 'Stack Size', key: 'stackable' },
            { label: 'Durability', key: 'durability' },
            { label: 'Defense', key: 'defense' },
            { label: 'Damage', key: 'damage' },
            { label: 'Hunger', key: 'hunger' },
        ];

        let html = `<table class="compare-table" aria-label="Comparing ${item1.name} and ${item2.name}"><thead><tr><th>Property</th><th>${item1.name}</th><th>${item2.name}</th></tr></thead><tbody>`;
        stats.forEach(s => {
            const v1 = item1[s.key] != null ? item1[s.key] : '—';
            const v2 = item2[s.key] != null ? item2[s.key] : '—';
            const n1 = typeof v1 === 'number' ? v1 : 0;
            const n2 = typeof v2 === 'number' ? v2 : 0;
            const w1 = n1 > n2 ? ' winner' : '';
            const w2 = n2 > n1 ? ' winner' : '';
            html += `<tr><td>${s.label}</td><td class="${w1}">${v1}</td><td class="${w2}">${v2}</td></tr>`;
        });
        html += '</tbody></table>';
        result.innerHTML = html;
    }

    // ===== RANDOM ITEM =====
    function initRandomItem() {
        const btn = document.getElementById('random-btn');
        if (btn) btn.addEventListener('click', showRandomItem);
    }

    function showRandomItem() {
        const allItems = typeof ITEMS !== 'undefined' ? ITEMS : [];
        if (allItems.length === 0) return;
        const item = allItems[Math.floor(Math.random() * allItems.length)];
        switchTab('items');
        setTimeout(() => showItemDetail(item.id), 100);
        showToast('Random item: ' + item.name);
    }

    // ===== DEEP LINKING =====
    function handleDeepLink() {
        const hash = window.location.hash.slice(1);
        if (!hash) return;
        const parts = hash.split('/');
        if (parts.length >= 2) {
            const tab = parts[0];
            const id = parts[1];
            switchTab(tab);
            setTimeout(() => {
                if (tab === 'recipes') showRecipeDetail(id);
                else if (tab === 'items') showItemDetail(id);
                else if (tab === 'mobs') showMobDetail(id);
            }, 150);
        } else if (parts[0]) {
            switchTab(parts[0]);
        }
    }

    function updateUrl(tab, id) {
        const url = id ? `#${tab}/${id}` : `#${tab}`;
        history.replaceState(null, '', url);
    }

    // ===== CHANGELOG =====
    function renderChangelog() {
        const el = document.getElementById('changelog');
        const entries = [
            { date: '2024-01-15', title: 'Full Redstone Guide', desc: 'Added redstone mechanics, components, circuits, and signal reference.' },
            { date: '2024-01-14', title: 'Structure Locator & Block Properties', desc: 'Added structure distance ranges, loot tables, and 80+ block properties.' },
            { date: '2024-01-13', title: 'Interactive Tools Expansion', desc: 'Added Nether calculator, enchantment checker, enchanting table simulator, XP calculator, armor calculator, food guide, brewing guide, villager trading, and mob spawning guide.' },
            { date: '2024-01-12', title: 'Commands & Mob Drops', desc: 'Added 50+ commands with syntax, examples, and parameters. Added 40+ mobs with exact drop chances.' },
            { date: '2024-01-11', title: 'Crafting Recipes & Items', desc: 'Added 120+ crafting recipes with visual grids and 250+ items across 14 categories.' },
            { date: '2024-01-10', title: 'Initial Release', desc: 'Minecraft Wiki launched with version selector, global search, and responsive design.' },
        ];
        el.innerHTML = entries.map(e => `
            <div class="changelog-entry">
                <div class="changelog-date">${e.date}</div>
                <div class="changelog-title">${e.title}</div>
                <div class="changelog-desc">${e.desc}</div>
            </div>
        `).join('');
    }

    // ===== HELPER FUNCTIONS =====
    function formatItemId(id) {
        return id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }

    function copyText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('Copied to clipboard!');
            }).catch(() => {
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
    }

    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showToast('Copied to clipboard!');
        } catch (e) {
            showToast('Failed to copy');
        }
        document.body.removeChild(textarea);
    }

    function copyMobDrops(mobId) {
        const mob = getMobById(mobId);
        if (!mob) return;
        let text = `${mob.name} Drops:\n`;
        mob.drops.forEach(d => {
            text += `  - ${d.item}: ${d.count} (${d.chance}) - ${d.condition}\n`;
        });
        copyText(text);
    }

    function showToast(message) {
        const toast = document.getElementById('copy-toast');
        toast.textContent = message;
        toast.hidden = false;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => { toast.hidden = true; }, 300);
        }, 2000);
    }

    function closeDetailModal() {
        closeAllModals();
    }

    // ===== GLOBAL EXPOSURE =====
    window.showRecipeDetail = showRecipeDetail;
    window.showItemDetail = showItemDetail;
    window.showMobDetail = showMobDetail;
    window.closeDetailModal = closeDetailModal;
    window.copyText = copyText;
    window.copyMobDrops = copyMobDrops;
    window.toggleCommandDetail = toggleCommandDetail;
    window.toggleFavorite = toggleFavorite;

})();