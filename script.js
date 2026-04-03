// EMAIL JS CONFIGURATION VARIABLES
// Reemplaza estos valores con lo que te proporcione EmailJS
const EMAILJS_SERVICE_ID = "service_5e3385s";
const EMAILJS_TEMPLATE_ID = "template_ycqqlms";
const EMAILJS_PUBLIC_KEY = "Ts3FWmePfYoCL7j_B";

(function() {
    if(EMAILJS_PUBLIC_KEY !== "public_XXX") {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

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
        { word: "Egipto", taboos: ["Pirámides", "África", "Faraón", "Desierto"] },
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
        { word: "Marruecos", taboos: ["Desierto", "Cuscús", "África", "Abajo"] },
        { word: "Turquía", taboos: ["Estambul", "Kebab", "Pelo", "Mezquita"] },
        { word: "Tailandia", taboos: ["Asia", "Playa", "Buda", "Picante"] },
        { word: "Vietnam", taboos: ["Asia", "Guerra", "Sombrero", "Moto"] },
        { word: "Sudáfrica", taboos: ["Mandela", "Animales", "Abajo", "Safaris"] },
        { word: "Madagascar", taboos: ["Isla", "Película", "África", "Lémur"] },
        { word: "Kenia", taboos: ["Correr", "Safaris", "Leones", "África"] },
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

function initializeWordBank(reset = false) {
    unusedWords = [];
    let playedWords = [];
    
    if (!reset) {
        try {
            playedWords = JSON.parse(localStorage.getItem('impostor_played_words')) || [];
        } catch(e) {}
    } else {
        localStorage.removeItem('impostor_played_words');
    }

    for (const [category, words] of Object.entries(WORD_BANK)) {
        words.forEach(item => {
            if (!playedWords.includes(item.word)) {
                unusedWords.push({ 
                    category: category, 
                    word: item.word, 
                    taboos: item.taboos 
                });
            }
        });
    }
    
    if (unusedWords.length === 0 && !reset) {
        // Se jugaron todas las palabras, reiniciar el ciclo.
        initializeWordBank(true);
    }
}
initializeWordBank();

// UI Elements
const playersContainer = document.getElementById('players-container');
const addPlayerBtn = document.getElementById('add-player-btn');
const startBtn = document.getElementById('start-btn');
const hintLevelSelect = document.getElementById('hint-level');
const jesterToggle = document.getElementById('jester-toggle');
const twinsToggle = document.getElementById('twins-toggle');
const tabooToggle = document.getElementById('taboo-toggle');

const screens = {
    setup: document.getElementById('setup-screen'),
    sending: document.getElementById('sending-screen'),
    game: document.getElementById('game-screen'),
    results: document.getElementById('results-screen')
};

function showScreen(name) {
    for (const key in screens) screens[key].classList.add('hidden');
    screens[name].classList.remove('hidden');
}

// Player Management
let playerCount = 0;
let MAX_PLAYERS = 12;

function addPlayerField(nameVal = '', emailVal = '') {
    if (playerCount >= MAX_PLAYERS) {
        alert("Máximo 12 jugadores.");
        return;
    }
    playerCount++;
    const id = `player-${playerCount}`;

    const div = document.createElement('div');
    div.className = "flex space-x-2 w-full";
    div.id = id;
    
    div.innerHTML = `
        <div class="flex flex-col flex-1">
            <input type="text" class="player-name bg-gray-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-3 focus:ring-blue-500 mb-2" placeholder="Nombre" value="${nameVal}" required>
            <input type="email" class="player-email bg-gray-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-3 focus:ring-blue-500" placeholder="Su Correo Electrónico" value="${emailVal}" required>
        </div>
        ${playerCount > 3 ? `<button type="button" onclick="removePlayer('${id}')" class="bg-red-600 hover:bg-red-500 text-white rounded-lg px-4 flex items-center h-12 self-end mb-1"><i class="fas fa-trash"></i></button>` : `<div class="w-[50px]"></div>`}
    `;
    playersContainer.appendChild(div);
}

window.removePlayer = function(id) {
    const el = document.getElementById(id);
    if(el) { el.remove(); playerCount--; }
}

// Initial default players (minimum 3)
addPlayerField('', '');
addPlayerField('', '');
addPlayerField('', '');

addPlayerBtn.addEventListener('click', () => addPlayerField());

// Game State
let playersList = [];
let impostorIndices = [];
let jesterIndex = null;
let twinIndices = [];
let pickedWord = null;
let timerInterval = null;
let secondsRemaining = 300;

startBtn.addEventListener('click', async () => {
    // Validate Emails
    const nameInputs = document.querySelectorAll('.player-name');
    const emailInputs = document.querySelectorAll('.player-email');
    playersList = [];
    
    let hasError = false;
    
    for (let i = 0; i < nameInputs.length; i++) {
        const name = nameInputs[i].value.trim();
        const email = emailInputs[i].value.trim();
        
        if (!name || !email) {
            hasError = true;
            break;
        }
        playersList.push({ name, email });
    }

    if (hasError) {
        alert("Por favor, llena todos los nombres y correos de cada jugador.");
        return;
    }

    if (playersList.length < 3) {
        alert("Mínimo 3 jugadores requeridos.");
        return;
    }

    if (EMAILJS_TEMPLATE_ID === "template_XXX" || EMAILJS_PUBLIC_KEY === "public_XXX") {
        alert("Falta configurar tu TEMPLATE_ID y PUBLIC_KEY en script.js. He dejado un Walkthrough a la derecha en el editor explicándote cómo sacar esos 2 códigos de EmailJS.");
        return;
    }

    showScreen('sending');

    // Pick a word
    if (unusedWords.length === 0) initializeWordBank();
    const randomIdx = Math.floor(Math.random() * unusedWords.length);
    pickedWord = unusedWords.splice(randomIdx, 1)[0];
    
    // Save to localStorage so it doesn't repeat across page reloads
    try {
        let played = JSON.parse(localStorage.getItem('impostor_played_words')) || [];
        played.push(pickedWord.word);
        localStorage.setItem('impostor_played_words', JSON.stringify(played));
    } catch(e) {}
    
    // Asignar los múltiples impostores
    const numImpostors = parseInt(document.getElementById('num-impostors').value) || 1;
    const hasJester = jesterToggle.checked;
    const hasTwins = twinsToggle.checked;
    
    const requiredPlayers = numImpostors + (hasJester ? 1 : 0) + (hasTwins ? 2 : 0);

    if (requiredPlayers > playersList.length) {
        alert("¡No hay suficientes jugadores para repartir todos los roles activos!");
        showScreen('setup');
        return;
    }

    impostorIndices = [];
    jesterIndex = null;
    twinIndices = [];

    let availableIndices = playersList.map((_, i) => i);
    
    for(let i=0; i < numImpostors; i++) {
        const r = Math.floor(Math.random() * availableIndices.length);
        impostorIndices.push(availableIndices.splice(r, 1)[0]);
    }

    if (hasJester) {
        const r = Math.floor(Math.random() * availableIndices.length);
        jesterIndex = availableIndices.splice(r, 1)[0];
    }

    if (hasTwins) {
        for(let i=0; i < 2; i++) {
            const r = Math.floor(Math.random() * availableIndices.length);
            twinIndices.push(availableIndices.splice(r, 1)[0]);
        }
    }

    const hintLevel = hintLevelSelect.value;
    const isTabooMode = tabooToggle.checked;

    let emailPromises = [];

    try {
        emailPromises = playersList.map((player, index) => {
            const isImpostor = impostorIndices.includes(index);
            const isJester = (index === jesterIndex);
            const isTwin = twinIndices.includes(index);
            
            let roleMessage = "";
            let wordMessage = "";
            
            const tabooListStr = pickedWord.taboos.join(", ");
            
            if (isImpostor) {
                roleMessage = "¡ERES EL IMPOSTOR! 🕵️";
                if (hintLevel === "easy") {
                    const firstLetter = pickedWord.word.charAt(0).toUpperCase();
                    const wordLength = pickedWord.word.replace(/\s/g, "").length;
                    wordMessage = `Pista fácil: La secreta pertenece a la categoría '${pickedWord.category}', empieza por '${firstLetter}' y tiene ${wordLength} letras.`;
                } else if (hintLevel === "medium") {
                    wordMessage = `Pista normal: La categoría que están jugando es '${pickedWord.category}'.`;
                } else {
                    wordMessage = `MODO DIFICIL: ¡No tienes NINGUNA pista! A disimular a ciegas y poner póker face.`;
                }
                
                if (isTabooMode) {
                    if (hintLevel !== "hard") {
                        wordMessage += `\n\n🤫 VENTAJA TABÚ: El resto tiene prohibido decir: [${tabooListStr}].\n¡Puedes decirlas tú para parecer inocente!`;
                    } else {
                        wordMessage += `\n\n💣 MODO TABÚ ACTIVO: Hay palabras prohibidas para el resto pero no sabes cuáles son. Estás a ciegas total.`;
                    }
                }
            } else if (isJester) {
                roleMessage = "¡ERES EL BUFÓN! 🃏";
                wordMessage = `La palabra secreta real es: ${pickedWord.word}\n\nREGLA ESPECIAL: Tu objetivo es que todos sospechen de ti y te voten pensando que eres el Impostor. Si te echan a ti, ¡GANAS TÚ SOLO!`;
                if (isTabooMode) {
                    wordMessage += `\n\n💣 MODO TABÚ (Restricción Bufón): Las palabras minadas son: [${tabooListStr}].\nTip criminal: ¡Di alguna palabra intencionalmente en tu turno para que todos sospechen rapidísimo de ti!`;
                }
            } else if (isTwin) {
                roleMessage = "¡ERES UN GEMELO! 👯";
                const otherTwinIndex = twinIndices.find(idx => idx !== index);
                const otherTwinName = playersList[otherTwinIndex].name;
                wordMessage = `La palabra secreta es: ${pickedWord.word}\n\nREGLA ESPECIAL: Sabes al 100% que ${otherTwinName} también es inocente. Sois gemelos confirmados, ¡defendeos el uno al otro a muerte en la votación!`;
                if (isTabooMode) {
                    wordMessage += `\n\n🚫 CAMPOS MINADOS: Está totalmente PROHIBIDO decir: [${tabooListStr}].`;
                }
            } else {
                roleMessage = "ERES CIUDADANO 👨‍🌾";
                wordMessage = `La palabra secreta es: ${pickedWord.word}\n\nCategoría general: ${pickedWord.category}`;
                if (isTabooMode) {
                    wordMessage += `\n\n🚫 CAMPOS MINADOS: Está totalmente PROHIBIDO decir o dar a entender las palabras: [${tabooListStr}].`;
                }
            }

            wordMessage += `\n\n-------------------------\n🛡️ REGLA DE ORO DE SEGURIDAD: Lee esto, memorízalo y APAGA LA PANTALLA de tu teléfono inmediatamente.`;

            const templateParams = {
                to_name: player.name,
                to_email: player.email,
                role: roleMessage,
                word: wordMessage
            };

            return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        });

        await Promise.all(emailPromises);
        startGameView();
    } catch (error) {
        console.error("Error enviando emails:", error);
        alert("Hubo un error enviando los correos. ¿Pusiste bien la Public Key y el Template Id?");
        showScreen('setup');
    }
});

function startGameView() {
    showScreen('game');
    document.getElementById('category-display').innerHTML = `<i class="fas fa-tag mr-2 text-gray-500"></i><span class="text-white">Fase de Discusión:</span> ${pickedWord.category}`;
    
    secondsRemaining = 300; // 5 minutos
    updateTimer();
    
    if(timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        secondsRemaining--;
        updateTimer();
        if(secondsRemaining <= 0) {
            endGame();
        }
    }, 1000);
}

function updateTimer() {
    const mins = Math.floor(secondsRemaining / 60);
    const secs = secondsRemaining % 60;
    const displayElement = document.getElementById('timer-display');
    displayElement.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    if (secondsRemaining <= 60 && secondsRemaining > 0) {
        displayElement.classList.add('text-red-500');
        displayElement.classList.remove('text-white');
    } else {
        displayElement.classList.remove('text-red-500');
        displayElement.classList.add('text-white');
    }
}

document.getElementById('end-game-btn').addEventListener('click', () => endGame(true));

function endGame(votarAnticipado = false) {
    if(timerInterval) clearInterval(timerInterval);
    document.getElementById('results-title').textContent = votarAnticipado ? "Votación Anticipada" : "¡Se acabó el tiempo!";
    showScreen('results');
}

document.getElementById('reveal-btn').addEventListener('click', () => {
    const impostorsNames = impostorIndices.map(idx => playersList[idx].name).join(', y ');
    const titleText = impostorIndices.length > 1 ? "Los Impostores eran:" : "El Impostor era:";
    const details = document.getElementById('reveal-details');
    
    let specialRolesHtml = '';
    
    if (jesterIndex !== null) {
        specialRolesHtml += `
            <div class="mt-4 p-3 bg-purple-900 border border-purple-500 rounded-lg">
                <p class="text-purple-300 font-bold mb-1">🃏 El Bufón era:</p>
                <p class="text-xl font-bold text-white">${playersList[jesterIndex].name}</p>
            </div>
        `;
    }

    if (twinIndices.length === 2) {
        specialRolesHtml += `
            <div class="mt-4 p-3 bg-pink-900 border border-pink-500 rounded-lg">
                <p class="text-pink-300 font-bold mb-1">👯 Los Gemelos eran:</p>
                <p class="text-xl font-bold text-white">${playersList[twinIndices[0]].name} y ${playersList[twinIndices[1]].name}</p>
            </div>
        `;
    }

    let tabooRolesHtml = '';
    if (tabooToggle.checked) {
        tabooRolesHtml = `
            <div class="mt-4 p-3 bg-red-900 border border-red-500 rounded-lg">
                <p class="text-red-300 font-bold mb-1">💣 Palabras Tabú (Prohibidas):</p>
                <p class="text-xl font-bold text-white">${pickedWord.taboos.join(", ")}</p>
                <p class="text-xs text-red-200 mt-2">¿Alguien dijo alguna e hizo trampa?</p>
            </div>
        `;
    }

    details.innerHTML = `
        <h3 class="text-2xl font-black text-white mb-2">${titleText}</h3>
        <p class="text-3xl font-black text-red-500 mb-6 drop-shadow-md bg-gray-800 py-3 px-2 rounded-lg border border-red-600 block leading-tight break-words">${impostorsNames}</p>
        <div class="border-t border-gray-600 mb-4"></div>
        <p class="text-gray-400 font-bold mb-1">Palabra Oculta:</p>
        <p class="text-2xl font-bold text-yellow-400 bg-gray-800 p-2 rounded block border border-gray-600 mb-2">${pickedWord.word}</p>
        ${tabooRolesHtml}
        ${specialRolesHtml}
    `;
    
    details.classList.remove('hidden');
    details.classList.remove('scale-95');
    document.getElementById('reveal-btn').classList.add('hidden');
    document.getElementById('restart-btn').classList.remove('hidden');
});

document.getElementById('restart-btn').addEventListener('click', () => {
    document.getElementById('reveal-details').classList.add('hidden');
    document.getElementById('reveal-details').classList.add('scale-95');
    document.getElementById('reveal-btn').classList.remove('hidden');
    document.getElementById('restart-btn').classList.add('hidden');
    showScreen('setup');
});
