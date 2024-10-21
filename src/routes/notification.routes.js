import { Router } from "express";
import {
    getAllNotifications,
    getOneNotification,
    addNotification,
    updateNotificationController,
    deleteNotification,
} from "../controllers/notification.controller.js";
import { verifyToken } from "../config/jwt.js";
import { authenticateJWT } from "../middlewares/authenticateJWT.js";
import { checkRole } from "../middlewares/roleCheck.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API para la gestión de notificaciones
 */

/**
 * @swagger
 * /api/notifications/get-notifications:
 *   get:
 *     summary: Obtiene todas las notificaciones
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Lista de todas las notificaciones obtenidas con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Notificaciones obtenidas con éxito:"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       notification_id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       message:
 *                         type: string
 *                       status:
 *                         type: string
 *       500:
 *         description: Error al obtener las notificaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false  # Modificado a false en caso de error
 *                 message:
 *                   type: string
 *                   example: "Hubo un error al obtener las notificaciones."
 */
router.get("/get-notifications",authenticateJWT,checkRole('admin'), getAllNotifications);

/**
 * @swagger
 * /api/notifications/get-notification/{id}:
 *   get:
 *     summary: Obtiene una notificación por ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la notificación
 *     responses:
 *       200:
 *         description: Datos de la notificación obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Petición exitosa:"
 *                 data:
 *                   type: object
 *                   properties:
 *                     notification_id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     message:
 *                       type: string
 *                     status:
 *                       type: string
 *       404:
 *         description: Notificación no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false  # Modificado a false en caso de error
 *                 message:
 *                   type: string
 *                   example: "Notificación no encontrada."
 *       500:
 *         description: Error al obtener la notificación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false  # Modificado a false en caso de error
 *                 message:
 *                   type: string
 *                   example: "Hubo un error al obtener la notificación."
 */
router.get("/get-notification/:id", getOneNotification);

/**
 * @swagger
 * /api/notifications/create-notification:
 *   post:
 *     summary: Crea una nueva notificación
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Nueva notificación"
 *               message:
 *                 type: string
 *                 example: "Tienes una nueva notificación."
 *               status:
 *                 type: string
 *                 example: "active"
 *     responses:
 *       201:
 *         description: Notificación creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Notificación creada con éxito:"
 *                 data:
 *                   type: object
 *                   properties:
 *                     notification_id:
 *                       type: integer
 *       500:
 *         description: Error al crear la notificación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false  # Modificado a false en caso de error
 *                 message:
 *                   type: string
 *                   example: "Hubo un error al crear la notificación."
 */
router.post("/create-notification", addNotification);

/**
 * @swagger
 * /api/notifications/update-notification/{id}:
 *   put:
 *     summary: Actualiza una notificación existente
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la notificación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notificación actualizada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Notificación actualizada con éxito:"
 *       404:
 *         description: Notificación no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false  # Modificado a false en caso de error
 *                 message:
 *                   type: string
 *                   example: "Notificación no encontrada."
 *       500:
 *         description: Error al actualizar la notificación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false  # Modificado a false en caso de error
 *                 message:
 *                   type: string
 *                   example: "Hubo un error al actualizar la notificación."
 */
router.put("/update-notification/:id", updateNotificationController);

/**
 * @swagger
 * /api/notifications/delete-notification/{id}:
 *   delete:
 *     summary: Elimina una notificación por ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la notificación
 *     responses:
 *       200:
 *         description: Notificación eliminada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Notificación eliminada con éxito:"
 *       404:
 *         description: Notificación no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false  # Modificado a false en caso de error
 *                 message:
 *                   type: string
 *                   example: "Notificación no encontrada."
 *       500:
 *         description: Error al eliminar la notificación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false  # Modificado a false en caso de error
 *                 message:
 *                   type: string
 *                   example: "Hubo un error al eliminar la notificación."
 */
router.delete("/delete-notification/:id", deleteNotification);

export default router;
