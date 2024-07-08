document.addEventListener('DOMContentLoaded', () => {
    const advanceButton = document.getElementById('advance-teams');

    advanceButton.addEventListener('click', () => {
        advanceAllTeams();
    });

    createInitialRound();

    function fetchTeams() {
        const teams = JSON.parse(localStorage.getItem('teams')) || [];
        return teams;
    }

    function createInitialRound() {
        const teams = fetchTeams();
        const round = document.querySelector('#eighthfinals .matchups');
        round.innerHTML = ''; 

        for (let i = 0; i < 16; i += 2) {
            const team1 = teams[i] ? teams[i].team_name : 'TBD';
            const team2 = teams[i + 1] ? teams[i + 1].team_name : 'TBD';

            const matchup = document.createElement('div');
            matchup.className = 'matchup';
            matchup.innerHTML = `
                <div>${team1}</div>
                <div>${team2}</div>
            `;
            round.appendChild(matchup);
        }
    }

    // Função para avançar a equipe vencedora
    let eighthfinalsWinners = [];
    let quarterfinalsWinners = [];
    let semifinalsWinners = [];
    let champion = "";

    function advanceTeam(round, index) {
        switch (round) {
            case 'eighthfinals':
                const teams = fetchTeams();
                const winner1 = teams[index * 2] ? teams[index * 2].team_name : 'TBD';
                eighthfinalsWinners.push(winner1);
                if (eighthfinalsWinners.length === 8) {
                    createNextRound('quarterfinals', eighthfinalsWinners);
                }
                break;
            case 'quarterfinals':
                const winner2 = eighthfinalsWinners[index * 2];
                quarterfinalsWinners.push(winner2);
                if (quarterfinalsWinners.length === 4) {
                    createNextRound('semifinals', quarterfinalsWinners);
                }
                break;
            case 'semifinals':
                const winner3 = quarterfinalsWinners[index * 2];
                semifinalsWinners.push(winner3);
                if (semifinalsWinners.length === 2) {
                    createNextRound('finals', semifinalsWinners);
                }
                break;
            case 'finals':
                const winner4 = semifinalsWinners[index * 2];
                champion = winner4;
                document.getElementById('champion').innerText = champion;
                break;
        }
    }

    function createNextRound(round, winners) {
        const nextRound = document.querySelector(`#${round} .matchups`);
        nextRound.innerHTML = ''; 
        for (let i = 0; i < winners.length; i += 2) {
            const team1 = winners[i] ? winners[i] : 'TBD';
            const team2 = winners[i + 1] ? winners[i + 1] : 'TBD';

            const matchup = document.createElement('div');
            matchup.className = 'matchup';
            matchup.innerHTML = `
                <div>${team1}</div>
                <div>${team2}</div>
            `;
            nextRound.appendChild(matchup);
        }
    }

    // Avança todos os times
    function advanceAllTeams() {
        advanceTeamsInRound('eighthfinals', 8, eighthfinalsWinners, 'quarterfinals');
        advanceTeamsInRound('quarterfinals', 4, quarterfinalsWinners, 'semifinals');
        advanceTeamsInRound('semifinals', 2, semifinalsWinners, 'finals');
        if (semifinalsWinners.length === 2) {
            advanceTeam('finals', 0);
        }
    }

    function advanceTeamsInRound(round, numWinners, winnersArray, nextRound) {
        for (let i = 0; i < numWinners; i++) {
            advanceTeam(round, i);
        }
        if (winnersArray.length === numWinners) {
            createNextRound(nextRound, winnersArray);
        }
    }
});
