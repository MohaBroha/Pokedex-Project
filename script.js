const modalContainer = document.getElementById('modal-container');
const pokemonContainer = document.getElementById('pokemon-container');
const loadMoreWrap = document.getElementById('load-more-wrap');
const searchInput = document.getElementById('search-input');

let results = [];
let allPokemon = [];
let currentIndex = 0;
let visibleCount = 20;

function init() {
    loadPokemon();
}

async function loadPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=200');
    const data = await response.json();
    results = data.results;

    for (let i = 0; i < results.length; i++) {
        const details = await getPokemonDetails(results[i]);
        allPokemon.push({
            id: details.id,
            name: details.name,
            type: details.types.join(', '),
            image: details.img,
            url: results[i].url
        });
    }

    displayPokemon();
}

async function getPokemonDetails(pokemon) {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    return {
        name: pokemon.name,
        id: data.id,
        types: data.types.map(t => t.type.name),
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`
    };
}

async function renderPokemon(pokemonList) {
    let html = '';
    for (let i = 0; i < pokemonList.length; i++) {
        html += pokemonCard(pokemonList[i]);
    }
    pokemonContainer.innerHTML = html;
}

function filterPokemon() {
    const query = searchInput.value.toLowerCase();

    if (query.length >= 3) {
        loadMoreWrap.innerHTML = backButtonTemplate();
    } else {
        loadMoreWrap.innerHTML = loadMoreButtonTemplate();
    }

    if (query.length < 3) return displayPokemon();

    setTimeout(() => {
        const filtered = allPokemon.filter(p => p.name.toLowerCase().startsWith(query));
        renderPokemon(filtered);
    }, 300);
}

function resetSearch() {
    searchInput.value = '';
    displayPokemon();
    loadMoreWrap.innerHTML = loadMoreButtonTemplate();
}

async function showModalWithStats(name, img, url) {
    const response = await fetch(url);
    const data = await response.json();
    const stats = data.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat
    }));

    modalContainer.innerHTML = modalTemplate(name, img);
    document.body.classList.add('modal-open');
    renderStatsChart('pokemonChart', stats);
    currentIndex = data.id - 1;
}

function displayPokemon() {
    setTimeout(() => {
        pokemonContainer.innerHTML = '';

        for (let i = 0; i < visibleCount && i < allPokemon.length; i++) {
            const p = allPokemon[i];
            pokemonContainer.innerHTML += pokemonCardTemplate(p);
        }

        if (!document.body.classList.contains('search-active')) {
            loadMoreWrap.style.display = 'flex';
        }
    }, 150);
}

function loadMorePokemon() {
    const btn = document.getElementById('load-more-btn');
    btn.innerHTML = spinnerTemplate();

    setTimeout(() => {
        visibleCount += 20;
        displayPokemon();
        btn.innerHTML = 'Load More';
    }, 1000);
}

function closeModal() {
    modalContainer.innerHTML = '';
    modalContainer.className = '';
}

function nextPokemon() {
    currentIndex++;
    if (currentIndex >= results.length) currentIndex = 0;
    const p = results[currentIndex];
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentIndex + 1}.png`;
    showModalWithStats(p.name, img, p.url);
}

function prevPokemon() {
    currentIndex--;
    if (currentIndex < 0) currentIndex = results.length - 1;
    const p = results[currentIndex];
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentIndex + 1}.png`;
    showModalWithStats(p.name, img, p.url);
}

function goHome() {
    document.body.classList.remove('search-active');
    loadMoreWrap.innerHTML = loadMoreButtonTemplate();
    loadMoreWrap.style.display = 'flex';
    displayPokemon();
}

function initKeyboardControls() {
    document.onkeydown = function (event) {
        if (event.key === 'ArrowLeft') prevPokemon();
        else if (event.key === 'ArrowRight') nextPokemon();
        else if (event.key === 'Escape') closeModal();
    };
}

init();
