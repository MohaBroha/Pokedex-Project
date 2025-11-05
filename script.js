const modalContainer = document.getElementById('modal-container');
const pokemonContainer = document.getElementById('pokemon-container');
let results = [];

function init() {
    loadPokemon();
}

async function loadPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
    results = (await response.json()).results;
    renderPokemon(results);
}

function renderPokemon(pokemonList) {
    let html = '';
    for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = pokemonList[i];
        const id = pokemon.url.split('/').filter(Boolean).pop();
        const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        html += `
            <div class="pokemon-card" onclick="showModal('${pokemon.name}', '${img}')">
                <img src="${img}" alt="${pokemon.name}" />
                <p>${pokemon.name}</p>
            </div>
        `;
    }
    pokemonContainer.innerHTML = html;
}


function filterPokemon() {

}


function showModal(name, img) {

}

function closeModal() {

}

init();
