import { CODES_HTTP } from "../constants/global.js";
import {
    getStopSchedules,
    getStopScheduleById,
    createStopSchedule,
    updateStopSchedule,
    deleteStopScheduleById,
} from "../DAO/stopSchedule.DAO.js";

// Obtener todos los horarios de paradas
export const getAllStopSchedules = async (req, res) => {
    try {
        const schedules = await getStopSchedules();
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Horarios de paradas obtenidos con éxito:",
            data: schedules,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al obtener los horarios de paradas.",
        });
    }
};

// Obtener un horario de parada por ID
export const getOneStopSchedule = async (req, res) => {
    try {
        const schedule = await getStopScheduleById(parseInt(req.params.id));

        if (schedule == null) {
            return res.status(CODES_HTTP.NOT_FOUND).json({
                success: false,
                message: "Horario de parada no encontrado",
            });
        }

        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Petición exitosa:",
            data: schedule,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al obtener el horario de parada.",
        });
    }
};

// Crear un nuevo horario de parada
export const addStopSchedule = async (req, res) => {
    try {
        const newSchedule = await createStopSchedule(req.body);
        res.status(CODES_HTTP.CREATED).json({
            success: true,
            message: "Horario de parada creado con éxito:",
            data: newSchedule,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al crear el horario de parada.",
        });
    }
};

// Actualizar un horario de parada existente
export const updateStopScheduleController = async (req, res) => {
    try {
        const updatedSchedule = await updateStopSchedule(parseInt(req.params.id), req.body);
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Horario de parada actualizado con éxito:",
            data: updatedSchedule,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al actualizar el horario de parada.",
        });
    }
};

// Eliminar un horario de parada por ID
export const deleteStopSchedule = async (req, res) => {
    try {
        const deletedSchedule = await deleteStopScheduleById(parseInt(req.params.id));
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Horario de parada eliminado con éxito:",
            data: deletedSchedule,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al eliminar el horario de parada.",
        });
    }
};
