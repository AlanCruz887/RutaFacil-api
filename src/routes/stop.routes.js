import { Router } from "express";
import {
    getAllStops,
    getOneStop,
    addStop,
    updateStopController,
    deleteStop,
} from "../controllers/stop.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Stops
 *   description: API para la gestión de paradas
 */

/**
 * @swagger
 * /api/stops/get-stops:
 *   get:
 *     summary: Obtiene todas las paradas
 *     tags: [Stops]
 *     responses:
 *       200:
 *         description: Lista de todas las paradas obtenidas con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Paradas obtenidas con éxito:"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       stop_id:
 *                         type: integer
 *                       route_id:
 *                         type: integer
 *                       stop_name:
 *                         type: string
 *                       sequence:
 *                         type: integer
 *       500:
 *         description: Error al obtener las paradas.
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
 *                   example: "Hubo un error al obtener las paradas."
 */
router.get("/get-stops", getAllStops);

/**
 * @swagger
 * /api/stops/get-stop/{id}:
 *   get:
 *     summary: Obtiene una parada por ID
 *     tags: [Stops]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la parada
 *     responses:
 *       200:
 *         description: Datos de la parada obtenidos con éxito.
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
 *                     stop_id:
 *                       type: integer
 *                     route_id:
 *                       type: integer
 *                     stop_name:
 *                       type: string
 *                     sequence:
 *                       type: integer
 *       404:
 *         description: Parada no encontrada.
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
 *                   example: "Parada no encontrada."
 *       500:
 *         description: Error al obtener la parada.
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
 *                   example: "Hubo un error al obtener la parada."
 */
router.get("/get-stop/:id", getOneStop);

/**
 * @swagger
 * /api/stops/create-stop:
 *   post:
 *     summary: Crea una nueva parada
 *     tags: [Stops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               route_id:
 *                 type: integer
 *                 example: 1
 *               stop_name:
 *                 type: string
 *                 example: "Parada Principal"
 *               sequence:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Parada creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Parada creada con éxito:"
 *                 data:
 *                   type: object
 *                   properties:
 *                     stop_id:
 *                       type: integer
 *       500:
 *         description: Error al crear la parada.
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
 *                   example: "Hubo un error al crear la parada."
 */
router.post("/create-stop", addStop);

/**
 * @swagger
 * /api/stops/update-stop/{id}:
 *   put:
 *     summary: Actualiza una parada existente
 *     tags: [Stops]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la parada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               route_id:
 *                 type: integer
 *               stop_name:
 *                 type: string
 *               sequence:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Parada actualizada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Parada actualizada con éxito:"
 *       404:
 *         description: Parada no encontrada.
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
 *                   example: "Parada no encontrada."
 *       500:
 *         description: Error al actualizar la parada.
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
 *                   example: "Hubo un error al actualizar la parada."
 */
router.put("/update-stop/:id", updateStopController);

/**
 * @swagger
 * /api/stops/delete-stop/{id}:
 *   delete:
 *     summary: Elimina una parada por ID
 *     tags: [Stops]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la parada
 *     responses:
 *       200:
 *         description: Parada eliminada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Parada eliminada con éxito:"
 *       404:
 *         description: Parada no encontrada.
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
 *                   example: "Parada no encontrada."
 *       500:
 *         description: Error al eliminar la parada.
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
 *                   example: "Hubo un error al eliminar la parada."
 */
router.delete("/delete-stop/:id", deleteStop);

export default router;
