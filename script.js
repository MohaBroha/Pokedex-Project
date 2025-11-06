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

async function getPokemonDetails(pokemon) {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    return {
        name: pokemon.name,
        id: data.id,
        types: data.types.map(t => t.type.name),
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
    };
}

async function renderPokemon(pokemonList) {
    let html = '';
    for (let i = 0; i < pokemonList.length; i++) {
        const details = await getPokemonDetails(pokemonList[i]);
        html += `
          <div class="pokemon-card" onclick="showModal('${details.name}', '${details.img}')">
    <img src="${details.img}" alt="${details.name}" />
    <div class="pokemon-info">
        <div class="pokemon-top">
            <span class="pokemon-types">${details.types.join(', ')}</span>
            <span class="pokemon-id">ID: ${details.id}</span>
        </div>
        <p class="pokemon-name">${details.name.toUpperCase()}</p>
    </div>
</div>
        `;
    }
    pokemonContainer.innerHTML = html;
}


function filterPokemon() {
    const query = document.getElementById('search-input').value.toLowerCase().slice(0, 3);
    let filtered = [];
    for (let i = 0; i < results.length; i++) {
        if (results[i].name.toLowerCase().startsWith(query)) {
            filtered.push(results[i]);
        }
    }
    renderPokemon(filtered);
}


function showModal(name, img) {

}

function closeModal() {
    modalContainer.innerHTML = '';
    modalContainer.className = '';
}



init();
