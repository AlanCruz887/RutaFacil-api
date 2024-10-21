import { Router } from "express";
import {
    getAllVehicleLocations,
    getOneVehicleLocation,
    addVehicleLocation,
    deleteVehicleLocation,
} from "../controllers/vehicle_locations.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: VehicleLocations
 *   description: API para la gestión de ubicaciones de vehículos
 */

/**
 * @swagger
 * /api/vehicle-locations/get-vehicle-locations:
 *   get:
 *     summary: Obtiene todas las ubicaciones de vehículos
 *     tags: [VehicleLocations]
 *     responses:
 *       200:
 *         description: Lista de todas las ubicaciones de vehículos obtenidas con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Ubicaciones de vehículos obtenidas con éxito."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       location_id:
 *                         type: integer
 *                       vehicle_id:
 *                         type: integer
 *                       lat:
 *                         type: number
 *                       lon:
 *                         type: number
 *                       event_type:
 *                         type: string
 *                       direction:
 *                         type: string
 *       500:
 *         description: Error al obtener las ubicaciones de vehículos.
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
 *                   example: "Error al obtener las ubicaciones de vehículos."
 */
router.get("/get-vehicle-locations", getAllVehicleLocations);

/**
 * @swagger
 * /api/vehicle-locations/get-vehicle-location/{id}:
 *   get:
 *     summary: Obtiene una ubicación de vehículo por ID
 *     tags: [VehicleLocations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la ubicación del vehículo
 *     responses:
 *       200:
 *         description: Datos de la ubicación del vehículo obtenidos con éxito.
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
 *                     location_id:
 *                       type: integer
 *                     vehicle_id:
 *                       type: integer
 *                     lat:
 *                       type: number
 *                     lon:
 *                       type: number
 *                     event_type:
 *                       type: string
 *                     direction:
 *                       type: string
 *       404:
 *         description: Ubicación de vehículo no encontrada.
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
 *                   example: "Ubicación de vehículo no encontrada."
 *       500:
 *         description: Error al obtener la ubicación del vehículo.
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
 *                   example: "Error al obtener la ubicación del vehículo."
 */
router.get("/get-vehicle-location/:id", getOneVehicleLocation);

/**
 * @swagger
 * /api/vehicle-locations/create-vehicle-location:
 *   post:
 *     summary: Crea una nueva ubicación de vehículo
 *     tags: [VehicleLocations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicle_id:
 *                 type: integer
 *                 example: 1
 *               lat:
 *                 type: number
 *                 example: -34.603722
 *               lon:
 *                 type: number
 *                 example: -58.381592
 *               event_type:
 *                 type: string
 *                 example: "start"
 *               direction:
 *                 type: string
 *                 example: "north"
 *     responses:
 *       201:
 *         description: Ubicación de vehículo creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Ubicación de vehículo creada con éxito."
 *                 data:
 *                   type: object
 *                   properties:
 *                     location_id:
 *                       type: integer
 *       500:
 *         description: Error al crear la ubicación del vehículo.
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
 *                   example: "Error al crear la ubicación del vehículo."
 */
router.post("/create-vehicle-location", addVehicleLocation);

/**
 * @swagger
 * /api/vehicle-locations/delete-vehicle-location/{id}:
 *   delete:
 *     summary: Elimina una ubicación de vehículo por ID
 *     tags: [VehicleLocations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la ubicación del vehículo
 *     responses:
 *       200:
 *         description: Ubicación de vehículo eliminada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Ubicación de vehículo eliminada con éxito."
 *       404:
 *         description: Ubicación de vehículo no encontrada.
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
 *                   example: "Ubicación de vehículo no encontrada."
 *       500:
 *         description: Error al eliminar la ubicación del vehículo.
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
 *                   example: "Error al eliminar la ubicación del vehículo."
 */
router.delete("/delete-vehicle-location/:id", deleteVehicleLocation);

export default router;
