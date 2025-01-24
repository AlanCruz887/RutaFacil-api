import { CODES_HTTP } from "../constants/global.js";
import { 
  getNotificationsToken,
  createNotificationDAO, 
  updateNotificationStatusDAO, 
  checkNotificationExistsDAO, 
  getNotificationsByVehicleIDDAO 
} from "../DAO/notification.DAO.js";
import fetch from "node-fetch"; // Asegúrate de tener esta dependencia instalada

export const getNotifications = async (req, res) => {
  try {
    const notifications = await getNotificationsToken();
    res.status(CODES_HTTP.OK).json({
      success: true,
      message: "Notificaciones obtenidas con éxito.",
      data: notifications,
    });
  } catch (error) {
    res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error al obtener las notificaciones.",
      data: null,
    });
  }
};

export const getNotificationsByVehicleID = async (req, res) => {
  try {
    const vehicle_id = req.params.vehicle_id;
    const notifications = await getNotificationsByVehicleIDDAO(parseInt(vehicle_id));
    res.status(CODES_HTTP.OK).json({
      success: true,
      message: `Notificaciones obtenidas para el vehículo ${vehicle_id}.`,
      data: notifications,
    });
  } catch (error) {
    console.log(error);
    res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error al obtener las notificaciones del vehículo.",
      data: null,
    });
  }
};

export const createNotification = async (req, res) => {
  const user_id = req.user.id; // Obtener el ID del usuario autenticado
  try {
    const { vehicle_id, ...rest } = req.body;

    // Verificar si ya existe la notificación
    const exists = await checkNotificationExistsDAO(user_id, vehicle_id);

    if (exists) {
      // Actualizar la notificación si ya existe
      await updateNotificationStatusDAO(user_id, vehicle_id, "yes");
      return res.status(200).json({
        success: true,
        message: "Notificación actualizada con éxito.",
      });
    }

    // Crear la notificación si no existe
    await createNotificationDAO({ vehicle_id, ...rest }, user_id);

    res.status(201).json({
      success: true,
      message: "Notificación creada con éxito.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al procesar la notificación.",
    });
  }
};


export const updateNotificationStatus = async (req, res) => {
  const user_id = req.user.id;
  try {
    const { vehicle_id, status_active } = req.body;
    await updateNotificationStatusDAO(user_id, vehicle_id, status_active);
    res.status(CODES_HTTP.OK).json({
      success: true,
      message: "Notificación actualizada con éxito.",
    });
  } catch (error) {
    console.log(error);
    res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

// Nueva función para enviar notificaciones
export const sendPushNotifications = async (req, res) => {
  try {
    const { title, body } = req.body;

    // Obtener todos los tokens de notificación
    const notifications = await getNotificationsToken();
    const tokens = notifications.map((notif) => notif.push_token);

    if (tokens.length === 0) {
      return res.status(CODES_HTTP.BAD_REQUEST).json({
        success: false,
        message: "No hay tokens disponibles para enviar notificaciones.",
      });
    }

    // Enviar notificaciones a través de Expo Push Notifications
    const responses = await Promise.all(
      tokens.map((token) =>
        fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            to: token,
            title,
            body,
            sound: "default",
            data: { extraData: "Información adicional opcional" },
          }),
        })
      )
    );

    const successfulResponses = responses.filter((response) => response.ok).length;

    res.status(CODES_HTTP.OK).json({
      success: true,
      message: `Notificaciones enviadas con éxito a ${successfulResponses} destinatarios.`,
    });
  } catch (error) {
    console.log("hgola")

    console.error("Error al enviar notificaciones:", error);
    res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error al enviar notificaciones.",
    });
  }
};
