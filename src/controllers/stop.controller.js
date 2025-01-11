import { CODES_HTTP } from "../constants/global.js";
import {
    getStops,
    getStopById,
    createStop,
    updateStop,
    deleteStopById,
} from "../DAO/stops.DAO.js";

// Obtener todas las paradas
export const getAllStops = async (req, res) => {
    try {
        const stops = await getStops();
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Paradas obtenidas con éxito:",
            data: stops,
        });
    } catch (error) {
        console.log(error);
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error al obtener las paradas.",
        });
    }
};

// Obtener una parada por ID
export const getOneStop = async (req, res) => {
    try {
        const stop = await getStopById(parseInt(req.params.id));

        if (stop === null) {
            return res.status(CODES_HTTP.NOT_FOUND).json({
                success: false,
                message: "Parada no encontrada.",
            });
        }

        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Petición exitosa:",
            data: stop,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error al obtener la parada.",
        });
    }
};

// Crear una nueva parada
export const addStop = async (req, res) => {
    try {
        const newStop = await createStop(req.body);
        res.status(CODES_HTTP.CREATED).json({
            success: true,
            message: "Parada creada con éxito:",
            data: newStop,
        });
    } catch (error) {
        console.log(error)
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error al crear la parada.",
        });
    }
};

// Actualizar una parada existente
export const updateStopController = async (req, res) => {
    try {
        const updatedStop = await updateStop(parseInt(req.params.id), req.body);
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Parada actualizada con éxito:",
            data: updatedStop,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error al actualizar la parada.",
        });
    }
};

// Eliminar una parada por ID
export const deleteStop = async (req, res) => {
    try {
        const deletedStop = await deleteStopById(parseInt(req.params.id));
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Parada eliminada con éxito:",
            data: deletedStop,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error al eliminar la parada.",
        });
    }
};
