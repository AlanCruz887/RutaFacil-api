import { Router } from "express";
import {
    getAllRatings,
    getOneRating,
    addRating,
    updateRatingController,
    deleteRating,
} from "../controllers/rating.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Ratings
 *   description: API para la gestión de calificaciones
 */

/**
 * @swagger
 * /api/ratings/get-ratings:
 *   get:
 *     summary: Obtiene todas las calificaciones
 *     tags: [Ratings]
 *     responses:
 *       200:
 *         description: Lista de todas las calificaciones obtenidas con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Calificaciones obtenidas con éxito:"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       rating_id:
 *                         type: integer
 *                       user_id:
 *                         type: integer
 *                       vehicle_id:
 *                         type: integer
 *                       score:
 *                         type: integer
 *                         minimum: 1
 *                         maximum: 5
 *                       comment:
 *                         type: string
 *       500:
 *         description: Error al obtener las calificaciones.
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
 *                   example: "Hubo un error al obtener las calificaciones."
 */
router.get("/get-ratings", getAllRatings);

/**
 * @swagger
 * /api/ratings/get-rating/{id}:
 *   get:
 *     summary: Obtiene una calificación por ID
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la calificación
 *     responses:
 *       200:
 *         description: Datos de la calificación obtenidos con éxito.
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
 *                     rating_id:
 *                       type: integer
 *                     user_id:
 *                       type: integer
 *                     vehicle_id:
 *                       type: integer
 *                     score:
 *                       type: integer
 *                       minimum: 1
 *                       maximum: 5
 *                     comment:
 *                       type: string
 *       404:
 *         description: Calificación no encontrada.
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
 *                   example: "Calificación no encontrada."
 *       500:
 *         description: Error al obtener la calificación.
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
 *                   example: "Hubo un error al obtener la calificación."
 */
router.get("/get-rating/:id", getOneRating);

/**
 * @swagger
 * /api/ratings/create-rating:
 *   post:
 *     summary: Crea una nueva calificación
 *     tags: [Ratings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               vehicle_id:
 *                 type: integer
 *                 example: 10
 *               score:
 *                 type: integer
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Excelente servicio."
 *     responses:
 *       201:
 *         description: Calificación creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Calificación creada con éxito:"
 *                 data:
 *                   type: object
 *                   properties:
 *                     rating_id:
 *                       type: integer
 *       500:
 *         description: Error al crear la calificación.
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
 *                   example: "Hubo un error al crear la calificación."
 */
router.post("/create-rating", addRating);

/**
 * @swagger
 * /api/ratings/update-rating/{id}:
 *   put:
 *     summary: Actualiza una calificación existente
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la calificación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Calificación actualizada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Calificación actualizada con éxito:"
 *       404:
 *         description: Calificación no encontrada.
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
 *                   example: "Calificación no encontrada."
 *       500:
 *         description: Error al actualizar la calificación.
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
 *                   example: "Hubo un error al actualizar la calificación."
 */
router.put("/update-rating/:id", updateRatingController);

/**
 * @swagger
 * /api/ratings/delete-rating/{id}:
 *   delete:
 *     summary: Elimina una calificación por ID
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la calificación
 *     responses:
 *       200:
 *         description: Calificación eliminada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Calificación eliminada con éxito:"
 *       404:
 *         description: Calificación no encontrada.
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
 *                   example: "Calificación no encontrada."
 *       500:
 *         description: Error al eliminar la calificación.
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
 *                   example: "Hubo un error al eliminar la calificación."
 */
router.delete("/delete-rating/:id", deleteRating);

export default router;
