const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const os = require('os');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Get local IP address to show to players
function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return '127.0.0.1';
}

const LOCAL_IP = getLocalIpAddress();

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Estado del juego
let roomState = {
    roomCode: '1234',
    hostSocketId: null,
    players: [], // { socketId, name, roleData }
    status: 'lobby', // lobby, playing, voting, results
    gameSettings: {
        giveHint: true
    },
    pickedWord: null,
    votes: {} // playerName -> votedName
};

// Banco de palabras Premium (250 palabras con Tabúes)
const WORD_BANK = {
    "Comida": [
        { word: "Pizza", taboos: ["Masa", "Italia", "Queso", "Domino's"] },
        { word: "Hamburguesa", taboos: ["Carne", "McDonald's", "Burguer King", "Pan"] },
        { word: "Sushi", taboos: ["Arroz", "Pescado", "Palillos", "Japón"] },
        { word: "Tacos", taboos: ["México", "Tortilla", "Picante", "Carne"] },
        { word: "Helado", taboos: ["Frío", "Cucurucho", "Postre", "Verano"] },
        { word: "Paella", taboos: ["Arroz", "España", "Valencia", "Domingo"] },
        { word: "Kebab", taboos: ["Carne", "Salsa", "Rollo", "Turquía"] },
        { word: "Donut", taboos: ["Agujero", "Dulce", "Chocolate", "Glaseado"] },
        { word: "Perrito Caliente", taboos: ["Salchicha", "Pan", "Mostaza", "Ketchup"] },
        { word: "Tortilla de Patatas", taboos: ["Huevo", "Cebolla", "España", "Sartén"] },
        { word: "Croquetas", taboos: ["Bechamel", "Abuela", "Frito", "Jamón"] },
        { word: "Nachos", taboos: ["Queso", "México", "Triángulo", "Guacamole"] },
        { word: "Ceviche", taboos: ["Pescado", "Limón", "Perú", "Crudo"] },
        { word: "Chocolate", taboos: ["Dulce", "Tableta", "Cacao", "Negro"] },
        { word: "Arepa", taboos: ["Maíz", "Venezuela", "Colombia", "Queso"] },
        { word: "Brownie", taboos: ["Chocolate", "Nueces", "Bizcocho", "Postre"] },
        { word: "Churros", taboos: ["Chocolate", "Desayuno", "Masa", "Fritos"] },
        { word: "Salmón", taboos: ["Pescado", "Naranja", "Noruega", "Sushi"] },
        { word: "Gazpacho", taboos: ["Tomate", "Frío", "Sopa", "Verano"] },
        { word: "Bocadillo", taboos: ["Pan", "Jamón", "Almuerzo", "Bocata"] }
    ],
    "Animales": [
        { word: "Perro", taboos: ["Ladrido", "Gato", "Mascota", "Hueso"] },
        { word: "Gato", taboos: ["Miau", "Ratón", "Bigotes", "Felino"] },
        { word: "León", taboos: ["Rey", "Selva", "Melena", "Rugido"] },
        { word: "Elefante", taboos: ["Trompa", "Grande", "Gris", "África"] },
        { word: "Jirafa", taboos: ["Cuello", "Largo", "Amarillo", "Manchas"] },
        { word: "Mono", taboos: ["Plátano", "Árbol", "Evolución", "Primate"] },
        { word: "Delfín", taboos: ["Agua", "Mar", "Inteligente", "Saltar"] },
        { word: "Serpiente", taboos: ["Veneno", "Reptil", "Larga", "Arrastrarse"] },
        { word: "Pingüino", taboos: ["Hielo", "Antártida", "Frío", "Pájaro"] },
        { word: "Tiburón", taboos: ["Dientes", "Aleta", "Miedo", "Mar"] },
        { word: "Oso Panda", taboos: ["Bambú", "China", "Blanco", "Negro"] },
        { word: "Canguro", taboos: ["Australia", "Saltar", "Bolsa", "Boxeo"] },
        { word: "Vaca", taboos: ["Leche", "Muu", "Queso", "Cuernos"] },
        { word: "Oveja", taboos: ["Lana", "Blanca", "Bee", "Rebaño"] },
        { word: "Araña", taboos: ["Ocho", "Patas", "Tela", "Picadura"] },
        { word: "Caballo", taboos: ["Montar", "Galope", "Relincho", "Carrera"] },
        { word: "Abeja", taboos: ["Miel", "Picar", "Amarillo", "Polen"] },
        { word: "Murciélago", taboos: ["Volar", "Vampiro", "Noche", "Cueva"] },
        { word: "Cocodrilo", taboos: ["Dientes", "Reptil", "Agua", "Verde"] }
    ],
    "Países": [
        { word: "España", taboos: ["Tapas", "Real Madrid", "Barça", "Siesta"] },
        { word: "México", taboos: ["Tacos", "Picante", "Mariachi", "Tequila"] },
        { word: "Argentina", taboos: ["Messi", "Asado", "Boludo", "Milei"] },
        { word: "Japón", taboos: ["Sushi", "Anime", "Tokio", "Samurái"] },
        { word: "Estados Unidos", taboos: ["Disney", "Dólar", "McDonald's", "Trump"] },
        { word: "Brasil", taboos: ["Carnaval", "Fútbol", "Río", "Amazonas"] },
        { word: "Francia", taboos: ["París", "Torre Eiffel", "Croissant", "Baggette"] },
        { word: "Italia", taboos: ["Pizza", "Pasta", "Roma", "Vaticano"] },
        { word: "China", taboos: ["Muralla", "Asia", "Comida", "Tienda"] },
        { word: "Reino Unido", taboos: ["Londres", "Té", "Rey", "Inglés"] },
        { word: "Alemania", taboos: ["Berlín", "Cerveza", "Salchicha", "Coche"] },
        { word: "Portugal", taboos: ["Cristiano Ronaldo", "Lisboa", "Vecino", "Vecinos"] },
        { word: "Rusia", taboos: ["Vodka", "Frío", "Putin", "Guerra"] },
        { word: "Australia", taboos: ["Canguro", "Koala", "Ila", "Inglés"] },
        { word: "Corea del Sur", taboos: ["K-pop", "Seúl", "Samsung", "Norte"] },
        { word: "Grecia", taboos: ["Yogur", "Dioses", "Islas", "Atenas"] },
        { word: "Andorra", taboos: ["Youtubers", "Impuestos", "Esquí", "Cerca"] },
        { word: "Marruecos", taboos: ["Cuscús", "Desierto", "Abajo", "Té"] }
    ],
    "Famosos": [
        { word: "Cristiano Ronaldo", taboos: ["Fútbol", "Portugal", "Bicho", "Siuuu"] },
        { word: "Lionel Messi", taboos: ["Fútbol", "Argentina", "Barça", "Balón de Oro"] },
        { word: "Shakira", taboos: ["Piqué", "Bizarrap", "Colombia", "Caderas"] },
        { word: "Bizarrap", taboos: ["Gorra", "Gafas", "Sesión", "Música"] },
        { word: "Quevedo", taboos: ["52", "Canarias", "Stay", "Verano"] },
        { word: "C. Tangana", taboos: ["Rosalía", "Yate", "Madrileño", "Música"] },
        { word: "Bad Bunny", taboos: ["Puerto Rico", "Trap", "Conejo", "Música"] },
        { word: "Zendaya", taboos: ["Euphoria", "Spider-man", "Dune", "Actriz"] },
        { word: "Tom Holland", taboos: ["Spider-man", "Zendaya", "Actor", "Marvel"] },
        { word: "Margot Robbie", taboos: ["Barbie", "Rubia", "Actor", "Lobo de Wall Street"] },
        { word: "Georgina Rodríguez", taboos: ["Cristiano", "Netflix", "Modelo", "Joyas"] },
        { word: "Elon Musk", taboos: ["Twitter", "Tesla", "X", "Rico"] },
        { word: "Ibai Llanos", taboos: ["Twitch", "Velada", "Gordo", "Kings League"] },
        { word: "Brad Pitt", taboos: ["Angelina", "Actor", "Guapo", "Hollywood"] },
        { word: "Leonardo DiCaprio", taboos: ["Titanic", "Oscar", "Novias", "Oso"] },
        { word: "Adolf Hitler", taboos: ["Alemania", "Guerra", "Bigote", "Nazismo"] },
        { word: "Cristóbal Colón", taboos: ["Descubrir", "Barcos", "América", "Indias"] }
    ],
    "Influencers": [
        { word: "Plex", taboos: ["Mundo", "Capibara", "YouTube", "Frank Cuesta"] },
        { word: "AuronPlay", taboos: ["Broma", "Zumos", "Twitch", "Abduzcan"] },
        { word: "TheGrefg", taboos: ["Contador", "Skin", "Fortnite", "Andorra"] },
        { word: "IlloJuan", taboos: ["Málaga", "Masi", "LMDShow", "Twitch"] },
        { word: "El Rubius", taboos: ["YouTube", "Gatos", "Minecraft", "Pionero"] },
        { word: "MrBeast", taboos: ["Dinero", "Retos", "Regalar", "YouTube"] },
        { word: "Hasbulla", taboos: ["Pequeño", "Ruso", "Pelea", "Niño"] },
        { word: "Khaby Lame", taboos: ["Manos", "Gesto", "TikTok", "Silencio"] },
        { word: "Xokas", taboos: ["Gritos", "Comida", "Twitter", "Twitch"] },
        { word: "Lola Lolita", taboos: ["TikTok", "Baile", "Hambre", "Influencer"] },
        { word: "Aitana", taboos: ["Cantante", "OT", "Alpha", "Sebastian Yatra"] }
    ],
    "Series y Películas": [
        { word: "Harry Potter", taboos: ["Magia", "Gafas", "Varita", "Cicatriz"] },
        { word: "La Casa de Papel", taboos: ["Atraco", "Máscara", "Dalí", "Netflix"] },
        { word: "Stranger Things", taboos: ["Once", "Niños", "Ochenta", "Demogorgon"] },
        { word: "Spider-Man", taboos: ["Araña", "Telaraña", "Peter Parker", "Marvel"] },
        { word: "Star Wars", taboos: ["Espada", "Láser", "Vader", "Fuerza"] },
        { word: "Titanic", taboos: ["Barco", "Hielo", "Jack", "Rose"] },
        { word: "Shrek", taboos: ["Burro", "Pantano", "Verde", "Ogro"] },
        { word: "Los Simpson", taboos: ["Amarillo", "Homer", "Tele", "Dibujos"] },
        { word: "Breaking Bad", taboos: ["Cristal", "Drogas", "Walter White", "Cáncer"] },
        { word: "El Juego del Calamar", taboos: ["Corea", "Netflix", "Rojo", "Juegos"] },
        { word: "Juego de Tronos", taboos: ["Dragones", "Trono", "Jon Nieve", "Serie"] },
        { word: "Toy Story", taboos: ["Juguetes", "Woody", "Buzz", "Amigo"] },
        { word: "Avengers", taboos: ["Marvel", "Héroes", "Thanos", "Vengadores"] },
        { word: "Avatar", taboos: ["Azul", "Planeta", "Pandora", "Cine"] }
    ],
    "Influenciadores Extra": [
        { word: "Agustin51", taboos: ["Fortnite", "Sevilla", "Gritos", "Grefg"] },
        { word: "Ampeter", taboos: ["Fortnite", "Casa", "Moto", "Grefg"] }
    ]
};

let unusedWords = [];

function initializeWordBank() {
    unusedWords = [];
    for (const [category, words] of Object.entries(WORD_BANK)) {
        words.forEach(item => {
            unusedWords.push({ 
                category: category, 
                word: item.word, 
                taboos: item.taboos 
            });
        });
    }
}
initializeWordBank();

io.on('connection', (socket) => {
    console.log('Nueva conexión:', socket.id);

    // Host reclama el rol de anfitrión
    socket.on('registerAsHost', () => {
        roomState.hostSocketId = socket.id;
        // Generar un nuevo código de sala 4 dígitos
        roomState.roomCode = Math.floor(1000 + Math.random() * 9000).toString();
        roomState.players = [];
        roomState.votes = {};
        roomState.status = 'lobby';
        socket.emit('hostRegistered', { roomCode: roomState.roomCode, ip: LOCAL_IP });
        console.log(`Host registrado. Código: ${roomState.roomCode}`);
    });

    // Jugador se une a la sala
    socket.on('joinRoom', (data, callback) => {
        const { playerName, roomCode } = data;
        
        if (roomCode !== roomState.roomCode) {
            return callback({ success: false, message: 'Código de sala incorrecto.' });
        }
        if (roomState.status !== 'lobby') {
            return callback({ success: false, message: 'La partida ya ha comenzado.' });
        }

        const newPlayer = { socketId: socket.id, name: playerName, roleData: null };
        roomState.players.push(newPlayer);
        console.log(`Jugador unido: ${playerName}`);

        // Notificar al host que alguien se unió
        if (roomState.hostSocketId) {
            io.to(roomState.hostSocketId).emit('playerJoined', { players: roomState.players.map(p => p.name) });
        }

        callback({ success: true });
    });

    // --- GAME LOGIC ---
    socket.on('startGame', (settings) => {
        if (socket.id !== roomState.hostSocketId) return;

        roomState.gameSettings = settings;
        roomState.status = 'playing';

        if (unusedWords.length === 0) initializeWordBank();
        
        const randomIdx = Math.floor(Math.random() * unusedWords.length);
        roomState.pickedWord = unusedWords.splice(randomIdx, 1)[0];

        // Inicializar jugadores como "vivos"
        roomState.players.forEach(p => { 
            p.eliminated = false; 
            p.pendingElimination = false; 
            p.disconnected = false; 
        });

        const activePlayers = roomState.players;
        const numPlayers = activePlayers.length;
        
        // Asignación de Roles
        let indices = activePlayers.map((_, i) => i);
        function pull() { return indices.splice(Math.floor(Math.random() * indices.length), 1)[0]; }

        const impostorIndices = [];
        for(let i=0; i < (settings.numImpostors || 1); i++) {
            if (indices.length > 0) impostorIndices.push(pull());
        }
        
        let jesterIndex = (settings.hasJester && indices.length > 0) ? pull() : null;
        let twinIndices = (settings.hasTwins && indices.length >= 2) ? [pull(), pull()] : [];

        // Primero notificamos que el juego empieza (players van a waiting)
        io.emit('gameStarted', { 
            category: roomState.pickedWord.category,
            players: roomState.players.map(p => ({ name: p.name, eliminated: false }))
        });

        // Después enviamos los roles individualmente (players transicionan a role screen)
        roomState.players.forEach((player, index) => {
            player.roleData = {
                isImpostor: impostorIndices.includes(index),
                isJester: index === jesterIndex,
                isTwin: twinIndices.includes(index),
                otherTwinName: twinIndices.includes(index) ? roomState.players[twinIndices.find(idx => idx !== index)].name : null,
                word: roomState.pickedWord.word,
                category: roomState.pickedWord.category,
                taboos: roomState.pickedWord.taboos,
                isTabooMode: settings.isTabooMode,
                hasHint: settings.giveHint
            };
            io.to(player.socketId).emit('receiveRole', player.roleData);
        });
    });

    socket.on('endGame', () => {
        if (socket.id !== roomState.hostSocketId) return;
        startVotingPhase();
    });

    function startVotingPhase() {
        roomState.status = 'voting';
        roomState.votes = {};
        const aliveNames = roomState.players.filter(p => !p.eliminated && !p.disconnected).map(p => p.name);
        
        roomState.players.forEach(p => {
            if (!p.disconnected) {
                io.to(p.socketId).emit('startVoting', { players: aliveNames, me: p.name });
            }
        });
        
        if(roomState.hostSocketId) {
            io.to(roomState.hostSocketId).emit('startVoting', { players: aliveNames });
        }
    }

    socket.on('submitVote', (votedName) => {
        const voter = roomState.players.find(p => p.socketId === socket.id);
        if (!voter || voter.eliminated || roomState.status !== 'voting') return;

        roomState.votes[voter.name] = votedName;
        const totalVotes = Object.keys(roomState.votes).length;
        const alivePlayers = roomState.players.filter(p => !p.eliminated && !p.disconnected);

        io.emit('voteReceived', { 
            totalVotes, 
            votedNames: Object.keys(roomState.votes) 
        });

        // REVELACIÓN AUTOMÁTICA si todos han votado
        if (totalVotes >= alivePlayers.length && alivePlayers.length > 0) {
            setTimeout(processElimination, 1500);
        }
    });

    function processElimination() {
        if (roomState.status !== 'voting') return;
        roomState.status = 'results';

        let tally = {};
        let maxVotes = 0;
        let highestVoted = [];

        Object.values(roomState.votes).forEach(v => {
            tally[v] = (tally[v] || 0) + 1;
            if (tally[v] > maxVotes) {
                maxVotes = tally[v];
                highestVoted = [v];
            } else if (tally[v] === maxVotes) {
                highestVoted.push(v);
            }
        });

        // En caso de empate, elegimos uno al azar de los más votados
        const expelledName = highestVoted[Math.floor(Math.random() * highestVoted.length)];
        const expelledPlayer = roomState.players.find(p => p.name === expelledName);
        
        if (expelledPlayer) expelledPlayer.eliminated = true;

        let gameEnded = false;
        let winnerRole = "";

        // 1. Victoria del Bufón
        if (expelledPlayer && expelledPlayer.roleData.isJester) {
            gameEnded = true;
            winnerRole = "jester";
        }

        // 2. Muerte por pena (Gemelos)
        if (expelledPlayer && expelledPlayer.roleData.isTwin) {
            const partner = roomState.players.find(p => p.roleData.isTwin && p.name !== expelledName);
            if (partner && !partner.eliminated) {
                partner.pendingElimination = true;
            }
        }

        // 3. Procesar muertes pendientes
        roomState.players.forEach(p => {
            if (p.pendingElimination) {
                p.eliminated = true;
                p.pendingElimination = false;
            }
        });

        // 4. Comprobar victorias estándar
        const aliveImpostors = roomState.players.filter(p => !p.eliminated && !p.disconnected && p.roleData.isImpostor);
        const aliveCitizens = roomState.players.filter(p => !p.eliminated && !p.disconnected && !p.roleData.isImpostor && !p.roleData.isJester);

        if (aliveImpostors.length === 0) {
            gameEnded = true;
            winnerRole = "citizens";
        } else if (aliveImpostors.length >= aliveCitizens.length) {
            gameEnded = true;
            winnerRole = "impostors";
        }

        const revealData = {
            eliminatedName: expelledName,
            isImpostor: expelledPlayer ? expelledPlayer.roleData.isImpostor : false,
            word: roomState.pickedWord.word,
            category: roomState.pickedWord.category,
            gameEnded,
            winnerRole,
            players: roomState.players.map(p => ({ name: p.name, eliminated: p.eliminated }))
        };

        io.emit('impostorRevealed', revealData);
    }

    socket.on('startNextRound', () => {
        if (socket.id !== roomState.hostSocketId) return;
        roomState.status = 'playing';
        roomState.votes = {};
        io.emit('gameStarted', { 
            category: roomState.pickedWord.category,
            players: roomState.players.map(p => ({ name: p.name, eliminated: p.eliminated }))
        });
    });

    socket.on('restartGame', () => {
        if (socket.id !== roomState.hostSocketId) return;
        
        // Reset individual player states but keep the list
        roomState.players.forEach(p => {
            p.eliminated = false;
            p.disconnected = false; // Reset disconnect status just in case
            p.roleData = null;
        });
        
        roomState.status = 'lobby';
        roomState.votes = {};
        
        // Notify both host and players to go back to lobby screens
        io.emit('returnToLobby');
        
        // Ensure host has the player list updated in its view
        if (roomState.hostSocketId) {
            io.to(roomState.hostSocketId).emit('playerJoined', { 
                players: roomState.players.map(p => p.name) 
            });
        }
        
        // Log it
        console.log(`Partida reiniciada. Jugadores mantenidos: ${roomState.players.length}`);
    });

    socket.on('checkStatus', (callback) => {
        const player = roomState.players.find(p => p.socketId === socket.id);
        if(player) callback({ eliminated: player.eliminated });
        else callback({ eliminated: true });
    });

    socket.on('disconnect', () => {
        const pIdx = roomState.players.findIndex(p => p.socketId === socket.id);
        if (pIdx !== -1) {
            if (roomState.status === 'lobby') {
                roomState.players.splice(pIdx, 1);
            } else {
                roomState.players[pIdx].disconnected = true;
                const activeCount = roomState.players.filter(p => !p.disconnected).length;
                const totalVotes = Object.keys(roomState.votes).length;
                io.to(roomState.hostSocketId).emit('playerDisconnectedMidgame', { activeCount, totalVotes });
            }
            io.emit('playerJoined', { players: roomState.players.filter(p => !p.disconnected).map(p => p.name) });
        }
        if (socket.id === roomState.hostSocketId) roomState.hostSocketId = null;
    });
});

server.listen(PORT, () => {
    console.log(`\\n==============================================`);
    console.log(` El Impostor Local Server en ejecución!`);
    console.log(` URL para el HOST: http://localhost:${PORT}/host.html`);
    console.log(` URL para los MOVILES: http://${LOCAL_IP}:${PORT}/player.html`);
    console.log(`==============================================\\n`);
});
