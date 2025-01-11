import { CODES_HTTP } from "../constants/global.js";
import { getNotificationsToken,createNotificationDAO, updateNotificationStatusDAO, checkNotificationExistsDAO,getNotificationsByVehicleIDDAO } from "../DAO/notification.DAO.js";


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
        console.log(error)
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
        const data = req.body;

        // Verificar si ya existe la notificación
        const exists = await checkNotificationExistsDAO(user_id, data.vehicle_id);

        if (exists) {
            return res.status(409).json({
                success: false,
                message: "La notificación ya está registrada para este usuario y vehículo.",
            });
        }

        // Crear la notificación si no existe
        await createNotificationDAO(data, user_id);

        res.status(201).json({
            success: true,
            message: "Notificación creada con éxito.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error al crear la notificación.",
        });
    }
};

export const updateNotificationStatus = async (req, res) => {
    const user_id = req.user.id
    try {
        const { vehicle_id, status_active} = req.body;
        await updateNotificationStatusDAO(user_id, vehicle_id, status_active);
        res.status(CODES_HTTP.OK).json(
            {
                success: true,
                message: "Notificación actualizada con éxito.",

            }
        );
    } catch (error) {
        console.log(error);
        res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            message: error.message
        });
    }
}

