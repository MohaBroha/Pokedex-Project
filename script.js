const modalContainer = document.getElementById('modal-container');
const pokemonContainer = document.getElementById('pokemon-container');
let results = [];

function init() {
    loadPokemon();
}
async function loadPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=6');
    results = (await response.json()).results;

    let html = '';
    for (let i = 0; i < results.length; i++) {
        const pokemon = results[i];
        html += `
            <div class="pokemon-card" onclick="showModal('${pokemon.name}')">
                <p>${pokemon.name}</p>
            </div>
        `;
    }
    pokemonContainer.innerHTML = html;
}


function showModal(name) {

}

function closeModal() {

}

init();
