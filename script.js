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
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`
    };
}

async function renderPokemon(pokemonList) {
    let html = '';
    for (let i = 0; i < pokemonList.length; i++) {
        const details = await getPokemonDetails(pokemonList[i]);
        html += `
            <div class="pokemon-card" onclick="showModalWithStats('${details.name}', '${details.img}', '${pokemonList[i].url}')">
                <img src="${details.img}" alt="${details.name}" />
                <div class="pokemon-info">
                    <p class="pokemon-name">${details.name.toUpperCase()}</p>
                    <p class="pokemon-types">${details.types.join(', ')}</p>
                    <p class="pokemon-id">ID: ${details.id}</p>
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
    modalContainer.innerHTML = `
        <div class="modal-backdrop" onclick="closeModal()">
            <div class="modal-content">
                <h2>${name.toUpperCase()}</h2>
                <img src="${img}" alt="${name}" />
                 <p class="pokemon-types">${details.types.join(', ')}</p>
                    <p class="pokemon-id">ID: ${details.id}</p>
                <button onclick="closeModal()">Schließen</button>
            </div>
        </div>
    `;

}

async function showModalWithStats(name, img, url) {
    // Details inkl. Stats von der API laden
    const response = await fetch(url);
    const data = await response.json();
    const stats = data.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat
    }));

    // Modal-Inhalt mit Chart
    modalContainer.innerHTML = `
        <div class="modal-backdrop" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <h2>${name.toUpperCase()}</h2>
                <img src="${img}" alt="${name}" />
                

                <canvas id="pokemonChart" width="300" height="200"></canvas>

                <button onclick="closeModal()">Schließen</button>
            </div>
        </div>
    `;
    document.body.classList.add('modal-open');

    // Chart erstellen
    const ctx = document.getElementById('pokemonChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: stats.map(s => s.name.toUpperCase()),
            datasets: [{
                label: 'Base Stats',
                data: stats.map(s => s.value),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },

        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 10 }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

}




function closeModal() {
    modalContainer.innerHTML = '';
    modalContainer.className = '';

}



init();
