import { WebSocketServer } from 'ws'; // Librería para WebSockets
import { handleWebSocketConnection } from '../controllers/websocket.controller.js'; // Controlador WebSocket

let wss; // Variable para mantener una referencia al WebSocket Server

// Inicializa el servidor WebSocket
export const initWebSocket = (server) => {
  wss = new WebSocketServer({ server }); // Conecta el servidor HTTP con WebSocket

  wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    handleWebSocketConnection(ws, wss); // Maneja la conexión usando el controlador
  });

  console.log('Servidor WebSocket inicializado');
};

export { wss }; // Exporta el WebSocket Server si necesitas usarlo en otro lugar
