import express from "express";
import {
    getAllVehicles,
    getOneVehicle,
    addVehicle,
    updateVehicleController,
    deleteVehicle,
} from "../controllers/vehicle.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: API para la gestión de vehículos
 */

/**
 * @swagger
 * /api/vehicles/get-vehicles:
 *   get:
 *     summary: Obtiene todos los vehículos
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: Lista de todos los vehículos obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Vehículos obtenidos con éxito."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       vehicle_id:
 *                         type: integer
 *                       plate_number:
 *                         type: string
 *                       model:
 *                         type: string
 *                       capacity:
 *                         type: integer
 *       500:
 *         description: Error al obtener los vehículos.
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
 *                   example: "Error al obtener los vehículos."
 */
router.get("/get-vehicles", getAllVehicles);

/**
 * @swagger
 * /api/vehicles/get-vehicle/{id}:
 *   get:
 *     summary: Obtiene un vehículo por ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del vehículo
 *     responses:
 *       200:
 *         description: Datos del vehículo obtenidos con éxito.
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
 *                     vehicle_id:
 *                       type: integer
 *                     plate_number:
 *                       type: string
 *                     model:
 *                       type: string
 *                     capacity:
 *                       type: integer
 *       404:
 *         description: Vehículo no encontrado.
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
 *                   example: "Vehículo no encontrado."
 *       500:
 *         description: Error al obtener el vehículo.
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
 *                   example: "Error al obtener el vehículo."
 */
router.get("/get-vehicle/:id", getOneVehicle);

/**
 * @swagger
 * /api/vehicles/create-vehicle:
 *   post:
 *     summary: Crea un nuevo vehículo
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plate_number:
 *                 type: string
 *                 example: "ABC123"
 *               model:
 *                 type: string
 *                 example: "Toyota Prius"
 *               capacity:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Vehículo creado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Vehículo creado con éxito."
 *                 data:
 *                   type: object
 *                   properties:
 *                     vehicle_id:
 *                       type: integer
 *       500:
 *         description: Error al crear el vehículo.
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
 *                   example: "Error al crear el vehículo."
 */
router.post("/create-vehicle", addVehicle);

/**
 * @swagger
 * /api/vehicles/update-vehicle/{id}:
 *   put:
 *     summary: Actualiza un vehículo existente
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del vehículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plate_number:
 *                 type: string
 *               model:
 *                 type: string
 *               capacity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Vehículo actualizado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Vehículo actualizado con éxito."
 *       404:
 *         description: Vehículo no encontrado.
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
 *                   example: "Vehículo no encontrado."
 *       500:
 *         description: Error al actualizar el vehículo.
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
 *                   example: "Error al actualizar el vehículo."
 */
router.put("/update-vehicle/:id", updateVehicleController);

/**
 * @swagger
 * /api/vehicles/delete-vehicle/{id}:
 *   delete:
 *     summary: Elimina un vehículo por ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del vehículo
 *     responses:
 *       200:
 *         description: Vehículo eliminado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Vehículo eliminado con éxito."
 *       404:
 *         description: Vehículo no encontrado.
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
 *                   example: "Vehículo no encontrado."
 *       500:
 *         description: Error al eliminar el vehículo.
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
 *                   example: "Error al eliminar el vehículo."
 */
router.delete("/delete-vehicle/:id", deleteVehicle);

export default router;
