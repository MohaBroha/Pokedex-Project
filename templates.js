function pokemonCard(pokemon) {
    return `
        <div class="pokemon-card" onclick="showModalWithStats('${pokemon.name}', '${pokemon.image}', '${pokemon.url}')">
            <img src="${pokemon.image}" alt="${pokemon.name}" />
            <div class="pokemon-info">
                <p class="pokemon-name">${pokemon.name.toUpperCase()}</p>
                <p class="pokemon-types">${pokemon.type}</p>
                <p class="pokemon-id">#${pokemon.id}</p>
            </div>
        </div>
    `;
}

function pokemonCardTemplate(pokemon) {
    return `
        <div class="pokemon-card" onclick="showModalWithStats('${pokemon.name}', '${pokemon.image}', '${pokemon.url}')">
            <img src="${pokemon.image}" alt="${pokemon.name}" />
            <div class="pokemon-info">
                <div class="pokemon-types">${pokemon.type}</div>
                <div class="pokemon-id">#${pokemon.id}</div>
                <div class="pokemon-name">${pokemon.name}</div>
            </div>
        </div>
    `;
}

function modalTemplate(name, img) {
    return `
        <div class="modal-backdrop" onclick="closeModal()">
            <div class="modal-content">
                <button class="close-btn" onclick="closeModal()">✖</button>
                <h2>${name.toUpperCase()}</h2>
                <img src="${img}" alt="${name}" />
                <canvas id="pokemonChart"></canvas>
                <div class="nav-btns">
                    <button onclick="prevPokemon()">⬅</button>
                    <button onclick="nextPokemon()">➡</button>
                </div>
            </div>
        </div>
    `;
}
function loadMoreButtonTemplate() {
    return `<button id="load-more-btn" class="load-more-btn" onclick="loadPokemon()">Load More</button>`;
}

function backButtonTemplate() {
    return `<button id="back-btn" class="load-more-btn" onclick="resetSearch()">Back</button>`;
}

function spinnerTemplate() {
    return `
        <img src="./img/ChatGPT Image 5. Nov. 2025, 11_17_15.png" class="spinner" alt="Lädt...">
    `;
}

function renderStatsChart(canvasId, stats) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    return new Chart(ctx, {
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
                },
                x: {
                    ticks: {
                        callback: function (val) {
                            return window.innerWidth < 410 ? '' : this.getLabelForValue(val);
                        }
                    }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}


