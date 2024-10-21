import { CODES_HTTP } from "../constants/global.js";
import {
    getRatings,
    getRatingById,
    createRating,
    updateRating,
    deleteRatingById,
} from "../DAO/rating.DAO.js";

// Obtener todas las calificaciones
export const getAllRatings = async (req, res) => {
    try {
        const ratings = await getRatings();
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Calificaciones obtenidas con éxito:",
            data: ratings,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al obtener las calificaciones.",
        });
    }
};

// Obtener una calificación por ID
export const getOneRating = async (req, res) => {
    try {
        const rating = await getRatingById(parseInt(req.params.id));

        if (rating == null) {
            return res.status(CODES_HTTP.NOT_FOUND).json({
                success: false,
                message: "Calificación no encontrada",
            });
        }

        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Petición exitosa:",
            data: rating,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al obtener la calificación.",
        });
    }
};

// Crear una nueva calificación
export const addRating = async (req, res) => {
    try {
        const newRating = await createRating(req.body);
        res.status(CODES_HTTP.CREATED).json({
            success: true,
            message: "Calificación creada con éxito:",
            data: newRating,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al crear la calificación.",
        });
    }
};

// Actualizar una calificación existente
export const updateRatingController = async (req, res) => {
    try {
        const updatedRating = await updateRating(parseInt(req.params.id), req.body);
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Calificación actualizada con éxito:",
            data: updatedRating,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al actualizar la calificación.",
        });
    }
};

// Eliminar una calificación por ID
export const deleteRating = async (req, res) => {
    try {
        const deletedRating = await deleteRatingById(parseInt(req.params.id));
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Calificación eliminada con éxito:",
            data: deletedRating,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al eliminar la calificación.",
        });
    }
};
