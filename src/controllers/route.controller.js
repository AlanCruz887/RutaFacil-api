import { CODES_HTTP } from "../constants/global.js";
import {
    getRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRouteById,
} from "../DAO/routes.DAO.js";

// Obtener todas las rutas
export const getAllRoutes = async (req, res) => {
    try {
        const routes = await getRoutes();
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Rutas obtenidas con éxito:",
            data: routes,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al obtener las rutas.",
        });
    }
};

// Obtener una ruta por ID
export const getOneRoute = async (req, res) => {
    try {
        const route = await getRouteById(parseInt(req.params.id));

        if (route == null) {
            return res.status(CODES_HTTP.NOT_FOUND).json({
                success: false,
                message: "Ruta no encontrada"
            });
        }

        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Petición exitosa:",
            data: route
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al obtener la ruta.",
        });
    }
}

// Crear una nueva ruta
export const addRoute = async (req, res) => {
    try {
        const newRoute = await createRoute(req.body);
        res.status(CODES_HTTP.CREATED).json({
            success: true,
            message: "Ruta creada con éxito:",
            data: newRoute,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al crear la ruta.",
        });
    }
};

// Actualizar una ruta existente
export const updateRouteController = async (req, res) => {
    try {
        const updatedRoute = await updateRoute(parseInt(req.params.id), req.body);
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Ruta actualizada con éxito:",
            data: updatedRoute,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al actualizar la ruta.",
        });
    }
};

// Eliminar una ruta por ID
export const deleteRoute = async (req, res) => {
    try {
        const deletedRoute = await deleteRouteById(parseInt(req.params.id));
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Ruta eliminada con éxito:",
            data: deletedRoute,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Hubo un error al eliminar la ruta.",
        });
    }
};
