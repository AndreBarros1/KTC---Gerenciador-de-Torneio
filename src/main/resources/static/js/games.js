document.getElementById('game-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const gameName = document.getElementById('game-name').value;
    
    const apiKey = '0f080d1fe3204e8787ce0bfacd91a23a';
    const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${gameName}`);
    
    if (response.ok) {
        const data = await response.json();
        displayResults(data.results);
    } else {
        console.error('Erro ao buscar jogos:', response.statusText);
    }
});

function displayResults(games) {
    const resultsContainer = document.getElementById('game-results');
    resultsContainer.innerHTML = '';

    games.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.className = 'game-card';

        const gameTitle = document.createElement('h2');
        gameTitle.textContent = game.name;

        const gameImage = document.createElement('img');
        gameImage.src = game.background_image;
        gameImage.alt = game.name;

        const gameRelease = document.createElement('p');
        gameRelease.textContent = `Data de Lançamento: ${game.released}`;

        gameElement.appendChild(gameTitle);
        gameElement.appendChild(gameImage);
        gameElement.appendChild(gameRelease);
        resultsContainer.appendChild(gameElement);
    });
}
