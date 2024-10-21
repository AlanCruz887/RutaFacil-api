import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Obtener todas las notificaciones
export async function getNotifications() {
    const notifications = await prisma.notifications.findMany();
    await prisma.$disconnect();
    return notifications;
}

// Obtener una notificación por ID
export async function getNotificationById(id) {
    const notification = await prisma.notifications.findUnique({
        where: {
            notification_id: id,
        }
    });
    await prisma.$disconnect();
    return notification;
}

// Crear una nueva notificación
export async function createNotification(data) {
    const newNotification = await prisma.notifications.create({
        data: {
            user_id: data.user_id,
            message: data.message,
            status: data.status,
        },
    });
    await prisma.$disconnect();
    return newNotification;
}

// Actualizar una notificación existente
export async function updateNotification(id, data) {
    const updatedNotification = await prisma.notifications.update({
        where: { notification_id: id },
        data: {
            user_id: data.user_id,
            message: data.message,
            status: data.status,
        },
    });
    await prisma.$disconnect();
    return updatedNotification;
}

// Eliminar una notificación por ID
export async function deleteNotificationById(id) {
    const deletedNotification = await prisma.notifications.delete({
        where: { notification_id: id },
    });
    await prisma.$disconnect();
    return deletedNotification;
}
