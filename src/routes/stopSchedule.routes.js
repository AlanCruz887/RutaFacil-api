import express from "express";
import {
    getAllStopSchedules,
    getOneStopSchedule,
    addStopSchedule,
    updateStopScheduleController,
    deleteStopSchedule,
} from "../controllers/stopSchedule.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: StopSchedules
 *   description: API para la gestión de horarios de paradas
 */

/**
 * @swagger
 * /api/stop-schedules/get-stop-schedules:
 *   get:
 *     summary: Obtiene todos los horarios de paradas
 *     tags: [StopSchedules]
 *     responses:
 *       200:
 *         description: Lista de todos los horarios de paradas obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Horarios de paradas obtenidos con éxito."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       schedule_id:
 *                         type: integer
 *                       stop_id:
 *                         type: integer
 *                       arrival_time:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Error al obtener los horarios de paradas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error al obtener los horarios de paradas."
 */
router.get("/get-stop-schedules", getAllStopSchedules);

/**
 * @swagger
 * /api/stop-schedules/get-stop-schedule/{id}:
 *   get:
 *     summary: Obtiene un horario de parada por ID
 *     tags: [StopSchedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del horario de parada
 *     responses:
 *       200:
 *         description: Datos del horario de parada obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Petición exitosa."
 *                 data:
 *                   type: object
 *                   properties:
 *                     schedule_id:
 *                       type: integer
 *                     stop_id:
 *                       type: integer
 *                     arrival_time:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Horario de parada no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Horario de parada no encontrado."
 *       500:
 *         description: Error al obtener el horario de parada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error al obtener el horario de parada."
 */
router.get("/get-stop-schedule/:id", getOneStopSchedule);

/**
 * @swagger
 * /api/stop-schedules/create-stop-schedule:
 *   post:
 *     summary: Crea un nuevo horario de parada
 *     tags: [StopSchedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stop_id:
 *                 type: integer
 *                 example: 1
 *               arrival_time:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-10-20T12:00:00Z"
 *     responses:
 *       201:
 *         description: Horario de parada creado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Horario de parada creado con éxito."
 *                 data:
 *                   type: object
 *                   properties:
 *                     schedule_id:
 *                       type: integer
 *       500:
 *         description: Error al crear el horario de parada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error al crear el horario de parada."
 */
router.post("/create-stop-schedule", addStopSchedule);

/**
 * @swagger
 * /api/stop-schedules/update-stop-schedule/{id}:
 *   put:
 *     summary: Actualiza un horario de parada existente
 *     tags: [StopSchedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del horario de parada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stop_id:
 *                 type: integer
 *               arrival_time:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Horario de parada actualizado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Horario de parada actualizado con éxito."
 *       404:
 *         description: Horario de parada no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Horario de parada no encontrado."
 *       500:
 *         description: Error al actualizar el horario de parada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error al actualizar el horario de parada."
 */
router.put("/update-stop-schedule/:id", updateStopScheduleController);

/**
 * @swagger
 * /api/stop-schedules/delete-stop-schedule/{id}:
 *   delete:
 *     summary: Elimina un horario de parada por ID
 *     tags: [StopSchedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del horario de parada
 *     responses:
 *       200:
 *         description: Horario de parada eliminado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Horario de parada eliminado con éxito."
 *       404:
 *         description: Horario de parada no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Horario de parada no encontrado."
 *       500:
 *         description: Error al eliminar el horario de parada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error al eliminar el horario de parada."
 */
router.delete("/delete-stop-schedule/:id", deleteStopSchedule);

export default router;
