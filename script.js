document.getElementById('startGame').addEventListener('click', startGame);

function startGame() {
    const numPlayers = 5; // Número de jugadores (2 impostores + 3 civiles)
    const players = Array.from({ length: numPlayers }, (_, i) => ({
        id: i,
        isImpostor: i < 2, // Los primeros dos son impostores
        status: 'alive'
    }));

    const playersContainer = document.getElementById('players');
    players.forEach(player => {
        const playerElement = document.createElement('div');
        playerElement.classList.add('player');
        playerElement.textContent = `Jugador ${player.id + 1} - ${player.isImpostor ? 'Impostor' : 'Civil'} - Estado: ${player.status}`;
        playersContainer.appendChild(playerElement);
    });

    // Simulación de la elección del impostor
    setInterval(() => {
        const alivePlayers = players.filter(p => p.status === 'alive');
        if (alivePlayers.length > 0) {
            const randomPlayer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
            if (randomPlayer.isImpostor) {
                randomPlayer.status = 'exposed';
                updatePlayerStatus(randomPlayer);
            } else {
                randomPlayer.status = 'dead';
                updatePlayerStatus(randomPlayer);
            }
        }
    }, 5000); // Cada 5 segundos se realiza una elección
}

function updatePlayerStatus(player) {
    const playersContainer = document.getElementById('players');
    const playerElement = playersContainer.querySelector(`.player[data-id="${player.id}"]`);
    if (playerElement) {
        playerElement.textContent = `Jugador ${player.id + 1} - ${player.isImpostor ? 'Impostor' : 'Civil'} - Estado: ${player.status}`;
    }
}
