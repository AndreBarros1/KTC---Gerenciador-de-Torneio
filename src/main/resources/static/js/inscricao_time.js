document.getElementById('team-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const teamName = document.getElementById('team-name').value;

    // Carrega equipes existentes do LocalStorage
    let teams = JSON.parse(localStorage.getItem('teams')) || [];

    if (teams.length < 16) {
        teams.push({ team_name: teamName });
        localStorage.setItem('teams', JSON.stringify(teams));
        alert('Time cadastrado com sucesso!');
        document.getElementById('team-form').reset(); // Limpa o formulário
        window.location.href = 'chaves.html'; // Redireciona para chaves.html
    } else {
        alert('Número máximo de times cadastrados atingido.');
    }
});
