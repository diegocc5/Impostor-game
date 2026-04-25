# 👺 El Impostor — Multiplayer Game

¡Bienvenido a **El Impostor**! Un emocionante juego de mesa social llevado al entorno web, diseñado para jugarse en vivo con amigos. Un jugador actúa como **Host (Anfitrión)** proyectando la pantalla principal, mientras que el resto de los jugadores se unen desde sus **móviles** para descubrir quién es el infiltrado.

![Aesthetics](https://img.shields.io/badge/Aesthetics-Premium-gold)
![Version](https://img.shields.io/badge/Version-1.6.1-red)
![Stack](https://img.shields.io/badge/Stack-Node.js%20%7C%20Socket.io-blue)

## 🚀 Características Principales

*   **Multijugador en Tiempo Real**: Sincronización instantánea mediante WebSockets.
*   **Sistema de Roles Dinámico**:
    *   **Ciudadanos**: Conocen la palabra secreta. Deben debatir y cazar al impostor.
    *   **El Impostor**: No conoce la palabra. Debe fingir e integrarse para no ser descubierto.
    *   **El Bufón (Opcional)**: Su objetivo es que lo expulsen. Si lo logran, ¡gana solo!
    *   **Gemelos (Opcional)**: Dos jugadores que saben que son inocentes entre sí.
*   **Modos de Juego Personalizados**:
    *   **Modo Tabú**: Añade palabras prohibidas para los ciudadanos, dificultando las pistas.
    *   **Configuración de Impostores**: Elige entre 1-4 impostores o usa los modos **Aleatorio Total** o **Equilibrado**.
    *   **Selector de Temas**: Filtra por categorías (Comida, Redes Sociales, Jerga, etc.).
*   **Interfaz Premium**: Diseño oscuro y futurista con efectos de cristal (Glassmorphism) y animaciones fluidas.

## 🛠️ Stack Tecnológico

*   **Backend**: Node.js & Express.
*   **Comunicación**: Socket.io para eventos bidireccionales en tiempo real.
*   **Frontend**: HTML5, Vanilla JavaScript y Tailwind CSS para el diseño.
*   **APIs Externas**: Integración con la API de Wikipedia para mostrar imágenes automáticas de los temas.

## 📦 Instalación y Despliegue Local

Si quieres ejecutar el juego en tu propia máquina:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/diegocc5/Impostor-game.git
   cd Impostor-game
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Inicia el servidor**:
   ```bash
   npm start
   ```

4. **Accede al juego**:
   - Abre `http://localhost:3000` en tu navegador.
   - Selecciona **"Crear Sala"** para el PC (Host).
   - Escanea el QR con tu móvil para entrar como **Jugador**.

## 🎮 Cómo Jugar

1.  **Lobby**: El Host configura la partida (Número de impostores, categorías, roles extra).
2.  **Reparto de Roles**: Cada jugador ve su palabra o rol secreto en su móvil de forma privada (presionar para revelar).
3.  **Debate**: Los jugadores describen la palabra sin ser demasiado obvios (cuidado con los Tabús).
4.  **Votación**: Tras el debate, todos votan desde el móvil. El Host muestra el resultado y si el expulsado era o no el impostor.
5.  **Victoria**:
    *   **Ciudadanos**: Si eliminan a todos los impostores.
    *   **Impostores**: Si igualan en número a los ciudadanos o logran confundirlos en modos especiales.

## 📑 Historial de Versiones Recientes

*   **v1.6.1**: Unificación de categorías de Influencers y optimización de base de datos de palabras.
*   **v1.6.0**: Nuevo sistema de selección dinámica de categorías en el lobby.
*   **v1.5.4**: Botones de abortar partida y regreso al lobby sin pérdida de conexión.
*   **v1.5.0**: Mejoras críticas en la lógica de eliminación y sistema de privacidad de palabras.

---
Desarrollado con ❤️ por **Diego** y **Antigravity AI**.
