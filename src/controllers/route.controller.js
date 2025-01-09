import { CODES_HTTP } from "../constants/global.js";
import {
    getRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRouteById,
} from "../DAO/routes.DAO.js";
import haversine from 'haversine-distance';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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


export const getNearbyRoutes = async (req, res) => {
  try {
    const { lat, lon } = req.body; // Coordenadas del usuario

    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: 'Se requieren las coordenadas lat y lon.',
      });
    }

    const userLocation = { latitude: parseFloat(lat), longitude: parseFloat(lon) };

    // 1. Obtener todas las paradas de la base de datos
    const stops = await prisma.stops.findMany();

    // 2. Calcular la distancia entre cada parada y la ubicación del usuario
    const maxDistance = 1000; // 1 km
    const nearbyStops = stops.filter((stop) => {
      const stopLocation = { latitude: parseFloat(stop.latitude), longitude: parseFloat(stop.longitude) };
      const distance = haversine(userLocation, stopLocation);
      return distance <= maxDistance;
    });

    // 3. Obtener los IDs únicos de las rutas asociadas a las paradas cercanas
    const routeIds = [...new Set(nearbyStops.map((stop) => stop.route_id))];

    if (routeIds.length === 0) {
      return res.status(204).json({
        success: true,
        message: 'No se encontraron rutas cercanas.',
        data: [],
      });
    }

    // 4. Obtener las rutas correspondientes a los IDs
    const routes = await prisma.routes.findMany({
      where: {
        route_id: { in: routeIds },
      },
    });

    // 5. Construir la respuesta combinando rutas y paradas cercanas
    const result = routes.map((route) => ({
      route_id: route.route_id,
      route_name: route.route_name,
      nombreInicio: route.nombreInicio,
      nombreFinal: route.nombreFinal,
      stops: nearbyStops
        .filter((stop) => stop.route_id === route.route_id)
        .map((stop) => ({
          stop_id: stop.stop_id,
          stop_name: stop.stop_name,
          latitude: stop.latitude,
          longitude: stop.longitude,
        })),
    }));

    return res.status(200).json({
      success: true,
      message: 'Rutas cercanas obtenidas correctamente.',
      data: result,
    });
  } catch (error) {
    console.error('Error al obtener rutas cercanas:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor.',
    });
  }
};