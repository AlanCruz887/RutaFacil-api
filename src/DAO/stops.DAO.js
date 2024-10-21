import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Obtener todas las paradas
export async function getStops() {
    const stops = await prisma.stops.findMany({
        include: {
            route: false, // Incluir la relación con la tabla de rutas
        }
    });
    await prisma.$disconnect();
    return stops;
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
