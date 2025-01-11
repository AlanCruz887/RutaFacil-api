import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Obtener todas las paradas
export async function getStops() {
    const stops = await prisma.stops.findMany({
        include: {
            routes: true, // Incluye la relación con las rutas
        },
    });

    // Agrupar las paradas por las rutas
    const groupedStops = stops.reduce((acc, stop) => {
        const routeId = stop.routes.route_id; // Asegúrate de usar el campo correcto para la relación
        if (!acc[routeId]) {
            acc[routeId] = {
                route: stop.routes, // Detalles de la ruta
                stops: [],          // Inicializa las paradas
            };
        }

        // Copia la parada pero elimina la relación con `routes` para evitar duplicados
        const { routes, ...stopWithoutRoute } = stop;
        acc[routeId].stops.push(stopWithoutRoute); // Agregar la parada sin duplicar la ruta
        return acc;
    }, {});

    await prisma.$disconnect();

    return Object.values(groupedStops); // Devuelve el resultado como un array
}



// Obtener una parada por ID
export async function getStopById(id) {
    const stop = await prisma.stops.findUnique({
        where: {
            stop_id: id,
        },
        include: {
            route: true, // Incluir la relación con la tabla de rutas
        }
    });
    await prisma.$disconnect();
    return stop;
}

// Crear una nueva parada
export async function createStop(data) {
    const newStop = await prisma.stops.create({
        data: {
            route_id: data.route_id,
            stop_name: data.stop_name,
            latitude: data.latitude,
            longitude: data.longitude,
            sequence: data.sequence,
        },
    });
    await prisma.$disconnect();
    return newStop;
}

// Actualizar una parada existente
export async function updateStop(id, data) {
    const updatedStop = await prisma.stops.update({
        where: { stop_id: id },
        data: {
            route_id: data.route_id,
            stop_name: data.stop_name,
            sequence: data.sequence,
        },
    });
    await prisma.$disconnect();
    return updatedStop;
}

// Eliminar una parada por ID
export async function deleteStopById(id) {
    const deletedStop = await prisma.stops.delete({
        where: { stop_id: id },
    });
    await prisma.$disconnect();
    return deletedStop;
}
