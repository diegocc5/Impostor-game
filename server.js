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
        { word: "Pizza", taboos: ["Queso", "Italia", "Masa", "Redonda"] },
        { word: "Hamburguesa", taboos: ["Carne", "Pan", "McDonalds", "Ketchup"] },
        { word: "Sushi", taboos: ["Arroz", "Pescado", "Japón", "Palillos"] },
        { word: "Tacos", taboos: ["Tortilla", "México", "Picante", "Carne"] },
        { word: "Helado", taboos: ["Frío", "Postre", "Cono", "Verano"] },
        { word: "Paella", taboos: ["Arroz", "España", "Valencia", "Marisco"] },
        { word: "Lasagna", taboos: ["Pasta", "Queso", "Horno", "Capas"] },
        { word: "Empanada", taboos: ["Masa", "Relleno", "Horno", "Frita"] },
        { word: "Pollo Frito", taboos: ["KFC", "Aceite", "Crispy", "Crujiente"] },
        { word: "Papas Fritas", taboos: ["Aceite", "Sal", "Patata", "Ketchup"] },
        { word: "Arepa", taboos: ["Maíz", "Colombia", "Venezuela", "Queso"] },
        { word: "Churros", taboos: ["Chocolate", "Fritos", "Azúcar", "Masa"] },
        { word: "Ceviche", taboos: ["Pescado", "Limón", "Perú", "Crudo"] },
        { word: "Crepe", taboos: ["Francia", "Dulce", "Masa", "Nutella"] },
        { word: "Tortilla de Patatas", taboos: ["Huevo", "Cebolla", "España", "Sartén"] },
        { word: "Croquetas", taboos: ["Bechamel", "Jamón", "Fritas", "Abuela"] },
        { word: "Gazpacho", taboos: ["Tomate", "Frío", "Sopa", "Verano"] },
        { word: "Ensalada", taboos: ["Lechuga", "Tomate", "Sana", "Verde"] },
        { word: "Sopa", taboos: ["Cuchara", "Caldo", "Caliente", "Fideos"] },
        { word: "Espaguetis", taboos: ["Pasta", "Italia", "Largos", "Carbonara"] },
        { word: "Macarrones", taboos: ["Pasta", "Queso", "Cortos", "Tomate"] },
        { word: "Bocadillo", taboos: ["Pan", "Mitad", "Jamón", "Almuerzo"] },
        { word: "Nachos", taboos: ["Queso", "México", "Triángulos", "Guacamole"] },
        { word: "Burrito", taboos: ["Enrollado", "México", "Tortilla", "Frijoles"] },
        { word: "Fajitas", taboos: ["Pollo", "Tortilla", "Cebolla", "Pimientos"] },
        { word: "Perrito Caliente", taboos: ["Salchicha", "Pan", "Mustaza", "Cine"] },
        { word: "Donut", taboos: ["Agujero", "Hommer", "Azúcar", "Dulce"] },
        { word: "Galletas", taboos: ["Horno", "Chocolate", "María", "Leche"] },
        { word: "Brownie", taboos: ["Chocolate", "Cuadrado", "Nueces", "Bizcocho"] },
        { word: "Tarta", taboos: ["Cumpleaños", "Velas", "Cortar", "Dulce"] },
        { word: "Pastel", taboos: ["Boda", "Pisos", "Crema", "Dulce"] },
        { word: "Natillas", taboos: ["Canela", "Galleta", "Amarillo", "Postre"] },
        { word: "Flan", taboos: ["Caramelo", "Tembloroso", "Postre", "Huevo"] },
        { word: "Arroz con Leche", taboos: ["Canela", "Postre", "Blanco", "Cuchara"] },
        { word: "Macedonia", taboos: ["Fruta", "Mezcla", "Postre", "Tazón"] },
        { word: "Yogur", taboos: ["Leche", "Cuchara", "Danone", "Blanco"] },
        { word: "Queso", taboos: ["Leche", "Ratón", "Amarillo", "Fundir"] },
        { word: "Jamón", taboos: ["Cerdo", "Cortar", "Pata", "Serrano"] },
        { word: "Chorizo", taboos: ["Rojo", "Cerdo", "Pimentón", "Embutido"] },
        { word: "Salchichón", taboos: ["Blanco", "Pimienta", "Embutido", "Cerdo"] },
        { word: "Lentejas", taboos: ["Hierro", "Cuchara", "Plato", "Chorizo"] },
        { word: "Garbanzos", taboos: ["Cocido", "Hummus", "Legumbre", "Redondos"] },
        { word: "Alubias", taboos: ["Frijoles", "Blancas", "Legumbre", "Plato"] },
        { word: "Puré", taboos: ["Patata", "Aplastado", "Bebé", "Cuchara"] },
        { word: "Salmón", taboos: ["Naranja", "Pescado", "Noruega", "Crudo"] },
        { word: "Atún", taboos: ["Lata", "Pescado", "Gato", "Aceite"] },
        { word: "Pollo Asado", taboos: ["Horno", "Piel", "Domingo", "Pájaros"] },
        { word: "Costillas", taboos: ["Cerdo", "Huesos", "Barbacoa", "Chupar"] },
        { word: "Kebab", taboos: ["Rollo", "Carne", "Turquía", "Salsa"] },
        { word: "Guacamole", taboos: ["Aguacate", "Nachos", "Verde", "México"] }
    ],
    "Animales": [
        { word: "Perro", taboos: ["Ladrido", "Gato", "Mascota", "Hueso"] },
        { word: "Gato", taboos: ["Miau", "Ratón", "Bigotes", "Felino"] },
        { word: "Elefante", taboos: ["Trompa", "Grande", "Gris", "África"] },
        { word: "León", taboos: ["Rey", "Selva", "Melena", "Rugido"] },
        { word: "Jirafa", taboos: ["Cuello", "Largo", "Amarillo", "Manchas"] },
        { word: "Mono", taboos: ["Plátano", "Árbol", "Evolución", "Chimpancé"] },
        { word: "Delfín", taboos: ["Agua", "Mar", "Inteligente", "Saltar"] },
        { word: "Serpiente", taboos: ["Veneno", "Reptil", "Larga", "Arrastrarse"] },
        { word: "Caballo", taboos: ["Montar", "Relincho", "Carrera", "Galope"] },
        { word: "Pingüino", taboos: ["Hielo", "Polo", "Frío", "Pájaro"] },
        { word: "Tigre", taboos: ["Rayas", "Felino", "Gato", "Naranja"] },
        { word: "Oso", taboos: ["Miel", "Polar", "Grande", "Pardo"] },
        { word: "Lobo", taboos: ["Aullar", "Luna", "Perro", "Manada"] },
        { word: "Zorro", taboos: ["Naranja", "Astuto", "Cola", "Bosque"] },
        { word: "Conejo", taboos: ["Zanahoria", "Orejas", "Saltar", "Blanco"] },
        { word: "Ratón", taboos: ["Queso", "Gato", "Pequeño", "Roedor"] },
        { word: "Murciélago", taboos: ["Volar", "Vampiro", "Noche", "Ciego"] },
        { word: "Águila", taboos: ["Volar", "Pájaro", "Ojos", "Garras"] },
        { word: "Búho", taboos: ["Noche", "Ojos", "Pájaro", "Girar"] },
        { word: "Loro", taboos: ["Hablar", "Pájaro", "Colores", "Pirata"] },
        { word: "Pato", taboos: ["Cuac", "Agua", "Pájaro", "Amarillo"] },
        { word: "Cisne", taboos: ["Blanco", "Cuello", "Pájaro", "Feo"] },
        { word: "Vaca", taboos: ["Leche", "Muu", "Blanco", "Negro"] },
        { word: "Cerdito", taboos: ["Rosa", "Oink", "Barro", "Jamón"] },
        { word: "Oveja", taboos: ["Lana", "Bee", "Blanca", "Rebaño"] },
        { word: "Cabra", taboos: ["Cuernos", "Montaña", "Mee", "Queso"] },
        { word: "Gallina", taboos: ["Huevos", "Pico", "Granja", "Coro"] },
        { word: "Gallo", taboos: ["Kikiriki", "Mañana", "Despertador", "Granja"] },
        { word: "Cocodrilo", taboos: ["Dientes", "Reptil", "Agua", "Verde"] },
        { word: "Tortuga", taboos: ["Lenta", "Caparazón", "Reptil", "Verde"] },
        { word: "Rana", taboos: ["Saltar", "Croac", "Verde", "Verruga"] },
        { word: "Ballena", taboos: ["Mar", "Enorme", "Agua", "Gorda"] },
        { word: "Tiburón", taboos: ["Dientes", "Aleta", "Miedo", "Mar"] },
        { word: "Pulpo", taboos: ["Tentáculos", "Mar", "Ocho", "Tinta"] },
        { word: "Cangrejo", taboos: ["Pinzas", "Lado", "Rojo", "Mar"] },
        { word: "Estrella de mar", taboos: ["Cinco", "Puntas", "Mar", "Cielo"] },
        { word: "Araña", taboos: ["Ocho", "Patas", "Tela", "Miedo"] },
        { word: "Mosca", taboos: ["Volar", "Molesta", "Basura", "Negra"] },
        { word: "Mosquito", taboos: ["Picar", "Sangre", "Verano", "Zumbido"] },
        { word: "Abeja", taboos: ["Miel", "Picar", "Amarilla", "Negra"] },
        { word: "Mariposa", taboos: ["Volar", "Colores", "Oruga", "Cielo"] },
        { word: "Hormiga", taboos: ["Pequeña", "Trabajo", "Negra", "Fila"] },
        { word: "Gusano", taboos: ["Tierra", "Largo", "Arrastrar", "Pescar"] },
        { word: "Caracol", taboos: ["Lento", "Concha", "Cuernos", "Baboso"] },
        { word: "Camello", taboos: ["Joroba", "Desierto", "Reyes", "Agua"] },
        { word: "Cebra", taboos: ["Rayas", "Caballo", "Blanco", "Negro"] },
        { word: "Hipopótamo", taboos: ["Gordo", "Agua", "Boca", "Gris"] },
        { word: "Rinoceronte", taboos: ["Cuerno", "Gris", "Fuerte", "Frente"] },
        { word: "Panda", taboos: ["Bambú", "China", "Oso", "Blanco"] },
        { word: "Canguro", taboos: ["Australia", "Saltar", "Bolsa", "Boxeo"] }
    ],
    "Países": [
        { word: "España", taboos: ["Europa", "Madrid", "Tapas", "Paella"] },
        { word: "México", taboos: ["Tacos", "América", "Picante", "Mariachi"] },
        { word: "Argentina", taboos: ["Messi", "Tango", "Asado", "América"] },
        { word: "Japón", taboos: ["Asia", "Sushi", "Anime", "Tokio"] },
        { word: "Estados Unidos", taboos: ["América", "Inglés", "Washington", "Dólar"] },
        { word: "Brasil", taboos: ["Carnaval", "Fútbol", "Río", "Amazonas"] },
        { word: "Francia", taboos: ["París", "Europa", "Torre Eiffel", "Croissant"] },
        { word: "Italia", taboos: ["Pizza", "Pasta", "Roma", "Europa"] },
        { word: "China", taboos: ["Asia", "Muralla", "Población", "Mandarín"] },
        { word: "Reino Unido", taboos: ["Londres", "Inglés", "Té", "Rey"] },
        { word: "Alemania", taboos: ["Berlín", "Cerveza", "Europa", "Salchichas"] },
        { word: "Portugal", taboos: ["Lisboa", "Vecino", "Cristiano", "Cristiano Ronaldo"] },
        { word: "Rusia", taboos: ["Vodka", "Frío", "Grande", "Moscú"] },
        { word: "Australia", taboos: ["Canguros", "Koala", "Isla", "Abajo"] },
        { word: "Canadá", taboos: ["Nieve", "Hoja", "Arriba", "Estados Unidos"] },
        { word: "India", taboos: ["Asia", "Vacas", "Picante", "Gente"] },
        { word: "Colombia", taboos: ["Café", "América", "Arepas", "Shakira"] },
        { word: "Perú", taboos: ["Machu Picchu", "Ceviche", "Llama", "América"] },
        { word: "Chile", taboos: ["Largo", "Andes", "América", "Terremotos"] },
        { word: "Cuba", taboos: ["Isla", "Fidel", "Puros", "Coche"] },
        { word: "Corea del Sur", taboos: ["Kpop", "Seúl", "Norte", "Asia"] },
        { word: "Grecia", taboos: ["Dioses", "Ruinas", "Europa", "Blanco"] },
        { word: "Suiza", taboos: ["Relojes", "Chocolate", "Queso", "Montañas"] },
        { word: "Suecia", taboos: ["IKEA", "Rubios", "Frío", "Norte"] },
        { word: "Noruega", taboos: ["Fiordos", "Vikingos", "Frío", "Norte"] },
        { word: "Turquía", taboos: ["Estambul", "Kebab", "Pelo", "Mezquita"] },
        { word: "Tailandia", taboos: ["Asia", "Playa", "Buda", "Picante"] },
        { word: "Vietnam", taboos: ["Asia", "Guerra", "Sombrero", "Moto"] },
        { word: "Jamaica", taboos: ["Marley", "Fumar", "Correr", "Isla"] },
        { word: "Ecuador", taboos: ["Mitad", "América", "Galápagos", "Selva"] },
        { word: "Venezuela", taboos: ["Arepas", "Petróleo", "América", "Caracas"] },
        { word: "Bolivia", taboos: ["América", "Altura", "Mar", "Salar"] },
        { word: "Uruguay", taboos: ["Mate", "Pequeño", "América", "Fútbol"] },
        { word: "Irlanda", taboos: ["Verde", "Duendes", "Cerveza", "Europa"] },
        { word: "Escocia", taboos: ["Falda", "Gaita", "Monstruo", "Reino Unido"] },
        { word: "Polonia", taboos: ["Vodka", "Frío", "Europa", "Curie"] },
        { word: "Rumania", taboos: ["Drácula", "Castillo", "Europa", "Cárpatos"] },
        { word: "Nueva Zelanda", taboos: ["Canguros", "Anillos", "Isla", "Ovejas"] },
        { word: "Arabia Saudí", taboos: ["Petróleo", "Desierto", "Rico", "Cristiano"] },
        { word: "Emiratos Árabes", taboos: ["Dubái", "Rico", "Edificio", "Desierto"] },
        { word: "Filipinas", taboos: ["Islas", "Asia", "Inglés", "Tifón"] },
        { word: "Indonesia", taboos: ["Bali", "Islas", "Asia", "Volcanes"] },
        { word: "Islandia", taboos: ["Hielo", "Volcanes", "Isla", "Frío"] },
        { word: "Groenlandia", taboos: ["Blanco", "Isla", "Frío", "Norte"] },
        { word: "Ucrania", taboos: ["Europa", "Amarillo", "Azul", "Rusia"] }
    ],
    "Famosos Reales/Históricos": [
        { word: "Brad Pitt", taboos: ["Actor", "Hollywood", "Película", "Rubio"] },
        { word: "Michael Jackson", taboos: ["Cantante", "Pop", "Luna", "Baile"] },
        { word: "Leonardo DiCaprio", taboos: ["Titanic", "Actor", "Oscar", "Oso"] },
        { word: "Cristiano Ronaldo", taboos: ["Fútbol", "Portugal", "Deporte", "Bicho"] },
        { word: "Shakira", taboos: ["Cantante", "Colombia", "Piqué", "Caderas"] },
        { word: "Albert Einstein", taboos: ["Científico", "Física", "Relatividad", "Pelo"] },
        { word: "Marilyn Monroe", taboos: ["Actriz", "Rubia", "Vestido", "Hollywood"] },
        { word: "Elvis Presley", taboos: ["Rey", "Rock", "Cantante", "Guitarra"] },
        { word: "Will Smith", taboos: ["Actor", "Hombre", "Negro", "Bofetón"] },
        { word: "Lady Gaga", taboos: ["Cantante", "Extravagante", "Vestido", "Pop"] },
        { word: "Lionel Messi", taboos: ["Fútbol", "Argentino", "Balón", "Mundial"] },
        { word: "Diego Maradona", taboos: ["Fútbol", "Argentino", "Mano", "Dios"] },
        { word: "Rafa Nadal", taboos: ["Tenis", "Deporte", "Tierra", "Raqueta"] },
        { word: "Fernando Alonso", taboos: ["Coches", "Asturias", "Motor", "Conducir"] },
        { word: "Julio Iglesias", taboos: ["Cantante", "Padre", "Moreno", "España"] },
        { word: "Rosalía", taboos: ["Motomami", "Cantante", "Uñas", "España"] },
        { word: "Penélope Cruz", taboos: ["Actriz", "Oscar", "Javier", "Almodóvar"] },
        { word: "Antonio Banderas", taboos: ["Actor", "Málaga", "Zorro", "Gato"] },
        { word: "Adolf Hitler", taboos: ["Alemania", "Malo", "Guerra", "Bigote"] },
        { word: "Cristóbal Colón", taboos: ["Barcos", "América", "Descubrir", "Mundo"] },
        { word: "Cleopatra", taboos: ["Egipto", "Reina", "Pirámides", "Marco Antonio"] },
        { word: "Julio César", taboos: ["Roma", "Emperador", "Espada", "Asesinato"] },
        { word: "Leonardo da Vinci", taboos: ["Pintor", "Mona Lisa", "Inventos", "Renacimiento"] },
        { word: "Picasso", taboos: ["Pintor", "Cuadros", "Ojos", "España"] },
        { word: "Dalí", taboos: ["Pintor", "Relojes", "Bigote", "Loco"] },
        { word: "Steve Jobs", taboos: ["Apple", "iPhone", "Ordenador", "Negro"] },
        { word: "Bill Gates", taboos: ["Windows", "Microsoft", "Rico", "Ordenador"] },
        { word: "Elon Musk", taboos: ["Tesla", "Twitter", "Espacio", "Rico"] },
        { word: "Mark Zuckerberg", taboos: ["Facebook", "Meta", "Gafas", "Red"] },
        { word: "Donald Trump", taboos: ["Presidente", "América", "Pelo", "Rubio"] },
        { word: "Barack Obama", taboos: ["Presidente", "América", "Negro", "Blanca"] },
        { word: "Freddie Mercury", taboos: ["Queen", "Cantante", "Bigote", "Rock"] },
        { word: "John Lennon", taboos: ["Los Beatles", "Gafas", "Cantante", "Imagine"] },
        { word: "Tom Cruise", taboos: ["Actor", "Misión", "Película", "Correr"] },
        { word: "Johnny Depp", taboos: ["Actor", "Pirata", "Jack", "Película"] },
        { word: "Keanu Reeves", taboos: ["Actor", "Matrix", "John Wick", "Película"] },
        { word: "Vin Diesel", taboos: ["Actor", "Coches", "Calvo", "Familia"] },
        { word: "Dwayne Johnson (La Roca)", taboos: ["Actor", "Fuerte", "Calvo", "Lucha"] },
        { word: "Arnold Schwarzenegger", taboos: ["Terminator", "Músculos", "Gobernador", "Actor"] },
        { word: "Sylvester Stallone", taboos: ["Rocky", "Rambo", "Boxeo", "Actor"] },
        { word: "Jackie Chan", taboos: ["Actor", "China", "Karate", "Gracioso"] },
        { word: "Bruce Lee", taboos: ["Lucha", "Karate", "Rápido", "Amarillo"] },
        { word: "Eminem", taboos: ["Rap", "Cantante", "Blanco", "Rápido"] },
        { word: "Snoop Dogg", taboos: ["Rap", "Fumar", "Hierba", "Cantante"] },
        { word: "Justin Bieber", taboos: ["Cantante", "Peinado", "Niño", "Pop"] },
        { word: "Bad Bunny", taboos: ["Conejo", "Cantante", "Reggaeton", "Puerto Rico"] },
        { word: "Daddy Yankee", taboos: ["Gasolina", "Cantante", "Reggaeton", "Jefe"] },
        { word: "Taylor Swift", taboos: ["Cantante", "Rubia", "Guitara", "Exnovios"] },
        { word: "Beyoncé", taboos: ["Cantante", "Negra", "Rey", "Voz"] },
        { word: "Rihanna", taboos: ["Cantante", "Paraguas", "Maquillaje", "Frente"] }
    ],
    "Influencers (Mundial/España)": [
        { word: "Ibai Llanos", taboos: ["Twitch", "Eventos", "Velada", "Gordo"] },
        { word: "El Rubius", taboos: ["YouTube", "Noruega", "Gatos", "Juegos"] },
        { word: "AuronPlay", taboos: ["Twitch", "Broma", "Zumos", "Abduzcan"] },
        { word: "TheGrefg", taboos: ["Contador", "Skin", "Andorra", "Premios"] },
        { word: "IlloJuan", taboos: ["Málaga", "Andalucía", "Masi", "Twitch"] },
        { word: "Xokas", taboos: ["Basura", "Comida", "Cuentas", "WoW"] },
        { word: "Dulceida", taboos: ["Moda", "Instagram", "Ropa", "Festival"] },
        { word: "Lola Lolita", taboos: ["Cantar", "TikTok", "Baile", "Hermana"] },
        { word: "DjMaRiiO", taboos: ["Fútbol", "FIFA", "Madrid", "YouTube"] },
        { word: "Rivers", taboos: ["Amigas", "Velada", "México", "Pelea"] },
        { word: "MrBeast", taboos: ["Dinero", "Retos", "YouTube", "Regalar"] },
        { word: "Luisito Comunica", taboos: ["Viajes", "México", "Pelos", "YouTube"] },
        { word: "Vegetta777", taboos: ["Minecraft", "Morado", "Willyrex", "Cubo"] },
        { word: "Willyrex", taboos: ["Vegetta", "Ojos", "NFT", "YouTube"] },
        { word: "PewDiePie", taboos: ["Número", "Sueco", "YouTube", "Inglés"] },
        { word: "IShowSpeed", taboos: ["Loco", "Cristiano", "Ladrido", "Negro"] },
        { word: "Spreen", taboos: ["Argentina", "Oso", "Twitch", "Minecraft"] },
        { word: "Juan Guarnizo", taboos: ["Gafas", "Ari", "Cama", "México"] },
        { word: "AriGameplays", taboos: ["Juan", "Escote", "Jugar", "México"] },
        { word: "Biyin", taboos: ["Auron", "Rubia", "Nazi", "Twitch"] },
        { word: "Mister Jägger", taboos: ["Pelea", "Loco", "Caja", "Vídeos"] },
        { word: "Jordi Wild", taboos: ["Podcast", "Músculos", "Papá", "YouTube"] },
        { word: "Plex (YoSoyPlex)", taboos: ["Mundo", "Frank", "Viajes", "Alto"] },
        { word: "Frank Cuesta", taboos: ["Animales", "Serpientes", "Gorra", "Puta"] },
        { word: "Wismichu", taboos: ["Calvo", "Botella", "Película", "Polémica"] },
        { word: "Dalas Review", taboos: ["Juicios", "Polémica", "Pambisito", "Perro"] },
        { word: "Marina Rivers", taboos: ["TikTok", "Derecho", "Velada", "Lola"] },
        { word: "Marta Díaz", taboos: ["Lolita", "Novio", "Instagram", "Ropa"] },
        { word: "Laura Escanes", taboos: ["Risto", "Audio", "Instagram", "Hija"] },
        { word: "María Pombo", taboos: ["Pijas", "Castellano", "Instagram", "Hermanas"] },
        { word: "Iker Casillas", taboos: ["TikTok", "Fútbol", "Portero", "Pueblo"] },
        { word: "Piqué", taboos: ["Shakira", "Kings", "Fútbol", "Periscope"] },
        { word: "Komanche", taboos: ["México", "Eventos", "Gordo", "Caída"] },
        { word: "Gemita", taboos: ["Grefg", "Auron", "Presidenta", "Pádel"] },
        { word: "Nia", taboos: ["Canarias", "Rubius", "Disney", "Cantar"] },
        { word: "Nil Ojeda", taboos: ["Retos", "Pelo", "YouTube", "Calles"] },
        { word: "ByTarifa", taboos: ["Nil", "Risas", "Shooter", "Escuadrón"] },
        { word: "RickyEdit", taboos: ["Memes", "Gorras", "Reacciones", "YouTube"] },
        { word: "Papi Gavi", taboos: ["Fútbol", "Gritar", "Calvo", "Sano"] },
        { word: "Spursito", taboos: ["Andorra", "Gafas", "Fútbol", "Rayo"] },
        { word: "Geronimo Benavides (Momo)", taboos: ["Argentina", "Platense", "Boca", "Velada"] },
        { word: "Coscu", taboos: ["Argentina", "Cantar", "Baile", "Pelo"] },
        { word: "Karchez", taboos: ["Coche", "Auron", "Voces", "Twitch"] },
        { word: "Reborn", taboos: ["Auron", "Traje", "Gta", "Voz"] },
        { word: "Cristinini", taboos: ["Grand Prix", "Presentadora", "Rubia", "Ibai"] },
        { word: "Knekro", taboos: ["Viejo", "Ibai", "Lol", "Gatos"] },
        { word: "ElMillor", taboos: ["Lol", "Tóxico", "Calvo", "Twitch"] },
        { word: "Werlyb", taboos: ["Málaga", "Lol", "Ibai", "Gafas"] },
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

    // Iniciar juego desde el host
    socket.on('startGame', (settings) => {
        if (socket.id !== roomState.hostSocketId) return;

        roomState.gameSettings = settings; // giveHint, numImpostors, hasJester, hasTwins, isTabooMode
        roomState.status = 'playing';

        if (unusedWords.length === 0) {
            initializeWordBank();
        }
        
        const randomIdx = Math.floor(Math.random() * unusedWords.length);
        const pickedWord = unusedWords.splice(randomIdx, 1)[0];
        roomState.pickedWord = pickedWord;

        const numPlayers = roomState.players.length;
        
        // Calcular roles
        const numImpostors = settings.numImpostors || 1;
        const requiredPlayers = numImpostors + (settings.hasJester ? 1 : 0) + (settings.hasTwins ? 2 : 0);

        if (numPlayers < 3 || requiredPlayers > numPlayers) {
            io.to(socket.id).emit('errorMsg', 'No hay suficientes jugadores para los roles elegidos.');
            return;
        }

        let availableIndices = roomState.players.map((_, i) => i);
        let impostorIndices = [];
        let twinIndices = [];
        let jesterIndex = null;

        for(let i=0; i < numImpostors; i++) {
            const r = Math.floor(Math.random() * availableIndices.length);
            impostorIndices.push(availableIndices.splice(r, 1)[0]);
        }

        if (settings.hasJester) {
            const r = Math.floor(Math.random() * availableIndices.length);
            jesterIndex = availableIndices.splice(r, 1)[0];
        }

        if (settings.hasTwins) {
            for(let i=0; i < 2; i++) {
                const r = Math.floor(Math.random() * availableIndices.length);
                twinIndices.push(availableIndices.splice(r, 1)[0]);
            }
        }

        // Repartir roles a la roomState.players para el reveal final
        roomState.specialRoles = { impostorIndices, twinIndices, jesterIndex };

        roomState.players.forEach((player, index) => {
            const isImpostor = impostorIndices.includes(index);
            const isJester = (index === jesterIndex);
            const isTwin = twinIndices.includes(index);
            
            let otherTwinName = null;
            if (isTwin) {
                const otherTwinIndex = twinIndices.find(idx => idx !== index);
                otherTwinName = roomState.players[otherTwinIndex].name;
            }

            player.roleData = {
                isImpostor,
                isJester,
                isTwin,
                otherTwinName,
                hasHint: settings.giveHint,
                isTabooMode: settings.isTabooMode,
                taboos: pickedWord.taboos,
                category: pickedWord.category,
                word: pickedWord.word
            };

            // Enviar rol exclusivamente al socket del jugador
            io.to(player.socketId).emit('receiveRole', player.roleData);
        });

        // Notificar al host que el juego ha empezado
        io.to(roomState.hostSocketId).emit('gameStarted', { category: pickedWord.category });
    });

    // Finalizar juego y pasar a Votación
    socket.on('endGame', () => {
        if (socket.id !== roomState.hostSocketId) return;
        roomState.status = 'voting';
        roomState.votes = {}; // reiniciar votos
        
        const playerNames = roomState.players.map(p => p.name);
        roomState.players.forEach(p => {
            io.to(p.socketId).emit('startVoting', { players: playerNames, me: p.name });
        });
    });

    // Jugador envía su voto
    socket.on('submitVote', (votedName) => {
        const voter = roomState.players.find(p => p.socketId === socket.id);
        if(!voter) return;
        roomState.votes[voter.name] = votedName;
        
        // Notificar al host que llegó un voto
        if(roomState.hostSocketId) {
            io.to(roomState.hostSocketId).emit('voteReceived', { totalVotes: Object.keys(roomState.votes).length });
        }
    });

    // Revelar Impostor
    socket.on('revealImpostor', () => {
        if (socket.id !== roomState.hostSocketId) return;
        
        const { impostorIndices, twinIndices, jesterIndex } = roomState.specialRoles;
        const impostors = impostorIndices.map(idx => roomState.players[idx].name);
        
        let jester = null;
        if (jesterIndex !== null) {
            jester = roomState.players[jesterIndex].name;
        }

        let twins = null;
        if (twinIndices && twinIndices.length === 2) {
            twins = [roomState.players[twinIndices[0]].name, roomState.players[twinIndices[1]].name];
        }
        
        // Recuento de Votos
        let voteTally = {};
        let highestVoted = [];
        let maxVotes = 0;

        Object.values(roomState.votes).forEach(vote => {
            voteTally[vote] = (voteTally[vote] || 0) + 1;
            if(voteTally[vote] > maxVotes) {
                maxVotes = voteTally[vote];
                highestVoted = [vote];
            } else if (voteTally[vote] === maxVotes) {
                highestVoted.push(vote);
            }
        });

        const revealData = {
            impostors,
            jester,
            twins,
            word: roomState.pickedWord.word,
            category: roomState.pickedWord.category,
            taboos: roomState.pickedWord.taboos,
            isTabooMode: roomState.gameSettings.isTabooMode,
            votes: roomState.votes,
            highestVoted,
            maxVotes
        };

        io.to(roomState.hostSocketId).emit('impostorRevealed', revealData);
        
        roomState.players.forEach(p => {
            io.to(p.socketId).emit('impostorRevealed', revealData);
        });
    });

    // Volver a jugar
    socket.on('restartGame', () => {
        if (socket.id !== roomState.hostSocketId) return;
        roomState.status = 'lobby';
        roomState.votes = {};
        
        // Limpiar jugadores que se desconectaron durante la partida
        roomState.players = roomState.players.filter(p => !p.disconnected);

        // Mantener a los jugadores activos en la sala
        io.to(roomState.hostSocketId).emit('playerJoined', { players: roomState.players.map(p => p.name) });
        roomState.players.forEach(p => {
            io.to(p.socketId).emit('backToLobby');
        });
    });

    socket.on('disconnect', () => {
        // Manejar la desconexión del jugador de forma segura
        const playerIndex = roomState.players.findIndex(p => p.socketId === socket.id);
        if (playerIndex !== -1) {
            if (roomState.status === 'lobby') {
                // Si estamos en el lobby, podemos borrarlo sin afectar a los índices del juego
                roomState.players.splice(playerIndex, 1);
                if (roomState.hostSocketId) {
                    io.to(roomState.hostSocketId).emit('playerJoined', { players: roomState.players.map(p => p.name) });
                }
            } else {
                // Si la partida ha empezado, no borramos su índice, solo lo marcamos para no romper el array de Roles
                roomState.players[playerIndex].disconnected = true;
            }
        }
        if (socket.id === roomState.hostSocketId) {
            roomState.hostSocketId = null;
        }
    });
});

server.listen(PORT, () => {
    console.log(`\\n==============================================`);
    console.log(` El Impostor Local Server en ejecución!`);
    console.log(` URL para el HOST: http://localhost:${PORT}/host.html`);
    console.log(` URL para los MOVILES: http://${LOCAL_IP}:${PORT}/player.html`);
    console.log(`==============================================\\n`);
});
