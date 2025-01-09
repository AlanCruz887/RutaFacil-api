import http from 'http'; // Necesario para integrar WebSockets con Express
import app from './app.js'; // Tu configuración principal de Express
import { swaggerDocs } from './docs/swagger.js'; // Documentación de Swagger
import { initWebSocket } from './config/websocket.js'; // Configuración de WebSocket

// Puerto del servidor
const port = process.env.PORT || 3000;

// Crea un servidor HTTP envolviendo tu aplicación de Express
const server = http.createServer(app);

// Inicializa WebSocket
initWebSocket(server);

// Inicia el servidor HTTP
server.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
  swaggerDocs(app, port); // Swagger sigue funcionando
});
