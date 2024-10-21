import { Router } from "express";
import {
    getAllRoutes,
    getOneRoute,
    addRoute,
    updateRouteController,
    deleteRoute,
} from "../controllers/route.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Routes
 *   description: API para la gestión de rutas
 */

/**
 * @swagger
 * /api/routes/get-routes:
 *   get:
 *     summary: Obtiene todas las rutas
 *     tags: [Routes]
 *     responses:
 *       200:
 *         description: Lista de todas las rutas obtenidas con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Rutas obtenidas con éxito:"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       route_id:
 *                         type: integer
 *                       route_name:
 *                         type: string
 *                       starting_point:
 *                         type: string
 *                       ending_point:
 *                         type: string
 *       500:
 *         description: Error al obtener las rutas.
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
 *                   example: "Hubo un error al obtener las rutas."
 */
router.get("/get-routes", getAllRoutes);

/**
 * @swagger
 * /api/routes/get-route/{id}:
 *   get:
 *     summary: Obtiene una ruta por ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la ruta
 *     responses:
 *       200:
 *         description: Datos de la ruta obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Petición exitosa:"
 *                 data:
 *                   type: object
 *                   properties:
 *                     route_id:
 *                       type: integer
 *                     route_name:
 *                       type: string
 *                     starting_point:
 *                       type: string
 *                     ending_point:
 *                       type: string
 *       404:
 *         description: Ruta no encontrada.
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
 *                   example: "Ruta no encontrada."
 *       500:
 *         description: Error al obtener la ruta.
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
 *                   example: "Hubo un error al obtener la ruta."
 */
router.get("/get-route/:id", getOneRoute);

/**
 * @swagger
 * /api/routes/create-route:
 *   post:
 *     summary: Crea una nueva ruta
 *     tags: [Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               route_name:
 *                 type: string
 *                 example: "Ruta 2"
 *               starting_point:
 *                 type: string
 *                 example: "Punto de inicio 2"
 *               ending_point:
 *                 type: string
 *                 example: "Punto final 2"
 *     responses:
 *       201:
 *         description: Ruta creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Ruta creada con éxito:"
 *                 data:
 *                   type: object
 *                   properties:
 *                     route_id:
 *                       type: integer
 *       500:
 *         description: Error al crear la ruta.
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
 *                   example: "Hubo un error al crear la ruta."
 */
router.post("/create-route", addRoute);

/**
 * @swagger
 * /api/routes/update-route/{id}:
 *   put:
 *     summary: Actualiza una ruta existente
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la ruta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               route_name:
 *                 type: string
 *               starting_point:
 *                 type: string
 *               ending_point:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ruta actualizada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Ruta actualizada con éxito:"
 *       404:
 *         description: Ruta no encontrada.
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
 *                   example: "Ruta no encontrada."
 *       500:
 *         description: Error al actualizar la ruta.
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
 *                   example: "Hubo un error al actualizar la ruta."
 */
router.put("/update-route/:id", updateRouteController);

/**
 * @swagger
 * /api/routes/delete-route/{id}:
 *   delete:
 *     summary: Elimina una ruta por ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la ruta
 *     responses:
 *       200:
 *         description: Ruta eliminada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Ruta eliminada con éxito:"
 *       404:
 *         description: Ruta no encontrada.
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
 *                   example: "Ruta no encontrada."
 *       500:
 *         description: Error al eliminar la ruta.
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
 *                   example: "Hubo un error al eliminar la ruta."
 */
router.delete("/delete-route/:id", deleteRoute);

export default router;
