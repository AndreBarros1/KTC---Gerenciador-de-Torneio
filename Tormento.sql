create schema torneio;

-- Tabela de Usuários
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    nickname VARCHAR(50) NOT NULL,
    profile_picture VARCHAR(255)
);

-- Tabela de Organizadores
CREATE TABLE organizers (
    organizer_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id)
);

-- Tabela de Equipes
CREATE TABLE teams (
    team_id SERIAL PRIMARY KEY,
    team_name VARCHAR(100) NOT NULL,
    created_by INT REFERENCES users(user_id)
);

-- Tabela de Jogadores
CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id)
);

-- Tabela de Torneios
CREATE TABLE tournaments (
    tournament_id SERIAL PRIMARY KEY,
    organizer_id INT REFERENCES organizers(organizer_id),
    game VARCHAR(100) NOT NULL,
    mode VARCHAR(50) NOT NULL,
    format VARCHAR(50) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    prize VARCHAR(255)
);

-- Tabela de Inscrições
CREATE TABLE registrations (
    registration_id SERIAL PRIMARY KEY,
    tournament_id INT REFERENCES tournaments(tournament_id),
    team_id INT REFERENCES teams(team_id),
    player_id INT REFERENCES players(player_id),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Chaves de Confrontos
CREATE TABLE brackets (
    bracket_id SERIAL PRIMARY KEY,
    tournament_id INT REFERENCES tournaments(tournament_id),
    match_number INT NOT NULL,
    team1_id INT REFERENCES teams(team_id),
    team2_id INT REFERENCES teams(team_id),
    winner_team_id INT REFERENCES teams(team_id),
    match_date TIMESTAMP NOT NULL
);

-- Tabela de Partidas
CREATE TABLE matches (
    match_id SERIAL PRIMARY KEY,
    bracket_id INT REFERENCES brackets(bracket_id),
    team1_score INT,
    team2_score INT,
    match_status VARCHAR(50) NOT NULL
);

-- Tabela de Feedback e Avaliação
CREATE TABLE feedback (
    feedback_id SERIAL PRIMARY KEY,
    tournament_id INT REFERENCES tournaments(tournament_id),
    user_id INT REFERENCES users(user_id),
    rating INT NOT NULL,
    comments TEXT
);

-- Índices e Restrições adicionais
CREATE UNIQUE INDEX idx_users_email ON users(email);
CREATE INDEX idx_registrations_tournament ON registrations(tournament_id);
CREATE INDEX idx_brackets_tournament ON brackets(tournament_id);
