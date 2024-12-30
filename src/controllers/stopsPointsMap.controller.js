import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getRouteDetailsById = async (req, res) => {
  try {
    const { routeId } = req.params; // Obtener el ID de la ruta desde los parámetros

    // Consultar la ruta, sus paradas y horarios asociados
    const routeDetails = await prisma.routes.findUnique({
      where: { route_id: parseInt(routeId) }, // Filtro por ID de la ruta
      include: {
        stops: {
          orderBy: { sequence: 'asc' }, // Ordenar paradas por secuencia
          include: {
            stop_schedules: {
              select: {
                arrival_time: true, // Solo obtener el horario de llegada
              },
            },
          },
        },
      },
    });

    // Verificar si la ruta existe
    if (!routeDetails) {
      return res.status(404).json({
        success: false,
        message: 'Ruta no encontrada',
      });
    }

    // Estructurar la respuesta
    const result = {
      route_name: routeDetails.route_name,
      starting_point: routeDetails.starting_point,
      ending_point: routeDetails.ending_point,
      stops: routeDetails.stops.map((stop) => ({
        stop_name: stop.stop_name,
        sequence: stop.sequence,
        latitude: stop.latitude,
        longitude: stop.longitude,
        arrival_time: stop.stop_schedules?.[0]?.arrival_time || null, // Si hay horarios asociados
      })),
    };

    return res.status(200).json({
      success: true,
      message: 'Detalles de la ruta obtenidos correctamente',
      data: result,
    });
  } catch (error) {
    console.error('Error al obtener detalles de la ruta:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor' +error,
    });
  }
};
