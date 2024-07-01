// Inicializa as equipes
const teams = [
    "Time 1", "Time 2", "Time 3", "Time 4", "Time 5",
    "Time 6", "Time 7", "Time 8", "Time 9", "Time 10",
    "Time 11", "Time 12", "Time 13", "Time 14", "Time 15", "Time 16"
];

let eighthfinalsWinners = [];
let quarterfinalsWinners = [];
let semifinalsWinners = [];
let champion = "";

// Função para criar a fase inicial (oitavas de final)
function createInitialRound() {
    const round = document.getElementById('eighthfinals');
    teams.forEach((team, index) => {
        if (index % 2 === 0) {
            const matchup = document.createElement('div');
            matchup.className = 'matchup';
            matchup.innerHTML = `
                <div>${team}</div>
                <div>${teams[index + 1]}</div>
                <button onclick="advanceTeam('eighthfinals', ${index / 2})">Avançar</button>
            `;
            round.appendChild(matchup);
        }
    });
}

// Função para avançar a equipe vencedora
function advanceTeam(round, index) {
    switch (round) {
        case 'eighthfinals':
            eighthfinalsWinners.push(teams[index * 2]);
            if (eighthfinalsWinners.length === 8) {
                createNextRound('quarterfinals', eighthfinalsWinners);
            }
            break;
        case 'quarterfinals':
            quarterfinalsWinners.push(eighthfinalsWinners[index * 2]);
            if (quarterfinalsWinners.length === 4) {
                createNextRound('semifinals', quarterfinalsWinners);
            }
            break;
        case 'semifinals':
            semifinalsWinners.push(quarterfinalsWinners[index * 2]);
            if (semifinalsWinners.length === 2) {
                createNextRound('finals', semifinalsWinners);
            }
            break;
        case 'finals':
            champion = semifinalsWinners[index * 2];
            document.getElementById('champion').innerText = champion;
            break;
    }
}

// Função para criar a próxima fase
function createNextRound(round, winners) {
    const nextRound = document.getElementById(round);
    winners.forEach((winner, index) => {
        if (index % 2 === 0) {
            const matchup = document.createElement('div');
            matchup.className = 'matchup';
            matchup.innerHTML = `
                <div>${winner}</div>
                <div>${winners[index + 1]}</div>
                <button onclick="advanceTeam('${round}', ${index / 2})">Avançar</button>
            `;
            nextRound.appendChild(matchup);
        }
    });
}

// Inicializa o torneio
createInitialRound();
