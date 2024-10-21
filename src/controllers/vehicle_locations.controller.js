import { CODES_HTTP } from "../constants/global.js";
import {
    getVehicleLocations,
    getVehicleLocationById,
    createVehicleLocation,
    deleteVehicleLocationById,
} from "../DAO/vehicle_locations.DAO.js";

// Obtener todas las ubicaciones de vehículos
export const getAllVehicleLocations = async (req, res) => {
    try {
        const locations = await getVehicleLocations();
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Ubicaciones de vehículos obtenidas con éxito:",
            data: locations,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error al obtener las ubicaciones de vehículos.",
        });
    }
};

// Obtener una ubicación de vehículo por ID
export const getOneVehicleLocation = async (req, res) => {
    try {
        const location = await getVehicleLocationById(parseInt(req.params.id));

        if (location == null) {
            return res.status(CODES_HTTP.NOT_FOUND).json({
                success: false,
                message: "Ubicación de vehículo no encontrada",
            });
        }

        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Petición exitosa:",
            data: location,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error al obtener la ubicación del vehículo.",
        });
    }
};

// Crear una nueva ubicación de vehículo
export const addVehicleLocation = async (req, res) => {
    try {
        const newLocation = await createVehicleLocation(req.body);
        res.status(CODES_HTTP.CREATED).json({
            success: true,
            message: "Ubicación de vehículo creada con éxito:",
            data: newLocation,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error al crear la ubicación del vehículo.",
        });
    }
};

// Eliminar una ubicación de vehículo por ID
export const deleteVehicleLocation = async (req, res) => {
    try {
        const deletedLocation = await deleteVehicleLocationById(parseInt(req.params.id));
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Ubicación de vehículo eliminada con éxito:",
            data: deletedLocation,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error al eliminar la ubicación del vehículo.",
        });
    }
};
