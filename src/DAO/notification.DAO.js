import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Obtener tokens de notificaciones (sin cambios)
export const getNotificationsToken = async () => {
    const notification = await prisma.notifications.findMany({
        select: {
            user_id: true, // Asegúrate de incluir `true` para seleccionar campos
        },
    });
    return notification;
};

export const getNotificationsByVehicleIDDAO = async (vehicle_id) => {
    const notification = await prisma.notifications.findMany({
        where: {
            vehicle_id: vehicle_id,
            status_active: "yes"
        },
    });
    return notification;
}

// Crear una nueva notificación
export const createNotificationDAO = async (data, user_id) => {
    const notificationCreated = await prisma.notifications.create({
        data: {
            user_id: user_id,
            vehicle_id: data.vehicle_id,
            push_token: data.push_token,
        },
    });
    return notificationCreated;
};

// Verificar si ya existe una notificación para este usuario y vehículo
export const checkNotificationExistsDAO = async (user_id, vehicle_id) => {
    const notification = await prisma.notifications.findFirst({
        where: {
            user_id: user_id,
            vehicle_id: vehicle_id,
        },
    });
    return notification !== null; // Retorna `true` si existe, `false` si no
};

// Actualizar el estado de una notificación
export const updateNotificationStatusDAO = async (user_id, vehicle_id, notification_active) => {
    const updatedNotification = await prisma.notifications.updateMany({
        where: {
            user_id: user_id,
            vehicle_id: vehicle_id,
        },
        data: {
            status_active: notification_active,
        },
    });
    return updatedNotification;
};
