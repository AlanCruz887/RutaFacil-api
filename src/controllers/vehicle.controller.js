import { CODES_HTTP } from "../constants/global.js";
import {
    getVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicleById,
    getVehiclesByRouteIdDAO,
} from "../DAO/vehicle.DAO.js";

// Obtener todos los vehículos
export const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await getVehicles();
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Vehículos obtenidos con éxito:",
            data: vehicles,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al obtener los vehículos.",
        });
    }
};

export const getVehiclesByRouteId = async (req, res) => {
    const id = req.params.id;
    try {
        const vehicles = await getVehiclesByRouteIdDAO(parseInt(id));
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Vehículos obtenidos con éxito:",
            data: vehicles,
        });
    } catch (error) {
        console.log(error)
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al obtener los vehículos.",
        });
    }
}

// Obtener un vehículo por ID
export const getOneVehicle = async (req, res) => {
    try {
        const vehicle = await getVehicleById(parseInt(req.params.id));

        if (vehicle == null) {
            return res.status(CODES_HTTP.NOT_FOUND).json({
                success: false,
                message: "Vehículo no encontrado"
            });
        }

        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Petición exitosa:",
            data: vehicle
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al obtener el vehículo.",
        });
    }
}

// Crear un nuevo vehículo
export const addVehicle = async (req, res) => {
    try {
        const newVehicle = await createVehicle(req.body);
        res.status(CODES_HTTP.CREATED).json({
            success: true,
            message: "Vehículo creado con éxito:",
            data: newVehicle,
        });
    } catch (error) {
        console.log(error)
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al crear el vehículo.",
        });
    }
};

// Actualizar un vehículo existente
export const updateVehicleController = async (req, res) => {
    try {
        const updatedVehicle = await updateVehicle(parseInt(req.params.vehicleID), req.body);
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Vehículo actualizado con éxito:",
            data: updatedVehicle,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al actualizar el vehículo.",
        });
    }
};

// Eliminar un vehículo por ID
export const deleteVehicle = async (req, res) => {
    try {
        const deletedVehicle = await deleteVehicleById(parseInt(req.params.vehicleID));
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Vehículo eliminado con éxito:",
            data: deletedVehicle,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al eliminar el vehículo.",
        });
    }
};
