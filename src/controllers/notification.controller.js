import { CODES_HTTP } from "../constants/global.js";
import {
    getNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotificationById,
} from "../DAO/notification.DAO.js";

// Obtener todas las notificaciones
export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await getNotifications();
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Notificaciones obtenidas con éxito:",
            data: notifications,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al obtener las notificaciones.",
        });
    }
};

// Obtener una notificación por ID
export const getOneNotification = async (req, res) => {
    try {
        const notification = await getNotificationById(parseInt(req.params.id));

        if (notification == null) {
            return res.status(CODES_HTTP.NOT_FOUND).json({
                success: false,
                message: "Notificación no encontrada",
            });
        }

        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Petición exitosa:",
            data: notification,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al obtener la notificación.",
        });
    }
};

// Crear una nueva notificación
export const addNotification = async (req, res) => {
    try {
        const newNotification = await createNotification(req.body);
        res.status(CODES_HTTP.CREATED).json({
            success: true,
            message: "Notificación creada con éxito:",
            data: newNotification,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al crear la notificación.",
        });
    }
};

// Actualizar una notificación existente
export const updateNotificationController = async (req, res) => {
    try {
        const updatedNotification = await updateNotification(parseInt(req.params.id), req.body);
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Notificación actualizada con éxito:",
            data: updatedNotification,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al actualizar la notificación.",
        });
    }
};

// Eliminar una notificación por ID
export const deleteNotification = async (req, res) => {
    try {
        const deletedNotification = await deleteNotificationById(parseInt(req.params.id));
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Notificación eliminada con éxito:",
            data: deletedNotification,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al eliminar la notificación.",
        });
    }
};
