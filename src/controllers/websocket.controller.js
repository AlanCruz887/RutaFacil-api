import { updateVehicleLocationById } from "../DAO/vehicle_locations.DAO.js";

const pendingUpdates = new Map(); // Almacén temporal de actualizaciones por vehículo

export const handleWebSocketConnection = (ws, wss) => {
  ws.on("message", async (message) => {
    try {
      const data = JSON.parse(message);


      // Validar datos recibidos
      if (!data.vehicle_id || !data.lat || !data.lon || !data.event_type || !data.direction) {
        ws.send(
          JSON.stringify({
            success: false,
            message: "Datos incompletos. Asegúrate de enviar vehicle_id, lat, lon, event_type y direction.",
          })
        );
        return;
      }

      // Almacenar en el registro temporal
      pendingUpdates.set(data.vehicle_id, {
        ...data,
        timestamp: Date.now(), // Agregar un timestamp
      });

      // Retransmitir el mensaje a los clientes suscritos
      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(
            JSON.stringify({
              success: true,
              message: "Nueva ubicación recibida.",
              data,
            })
          );
        }
      });

      ws.send(
        JSON.stringify({
          success: true,
          message: "Ubicación recibida y pendiente de guardar.",
        })
      );
    } catch (error) {
      console.error("Error al manejar el mensaje del WebSocket:", error);

      ws.send(
        JSON.stringify({
          success: false,
          message: "Hubo un error al procesar la solicitud.",
          error: error.message,
        })
      );
    }
  });

  // Manejar la desconexión del cliente
  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
};

// Temporizador para guardar en la base de datos cada minuto
setInterval(async () => {
  try {
    for (const [vehicle_id, data] of pendingUpdates) {
      // Guardar en la base de datos
      await updateVehicleLocationById(vehicle_id, {
        lat: data.lat,
        lon: data.lon,
        event_type: data.event_type,
        direction: data.direction,
      });

      console.log(`Ubicación del vehículo ${vehicle_id} guardada en la base de datos.`);
      pendingUpdates.delete(vehicle_id); // Eliminar después de guardar
    }
  } catch (error) {
    console.error("Error al guardar ubicaciones en la base de datos:", error);
  }
}, 60000); // 60,000 ms = 1 minuto
