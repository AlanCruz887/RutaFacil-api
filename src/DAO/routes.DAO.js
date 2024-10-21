import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Obtener todas las rutas
export async function getRoutes() {
    const routes = await prisma.routes.findMany();
    await prisma.$disconnect();
    return routes;
}

// Obtener una ruta por ID
export async function getRouteById(id) {
    const route = await prisma.routes.findUnique({
        where: {
            route_id: id,
        }
    });
    await prisma.$disconnect();
    return route;
}

// Crear una nueva ruta
export async function createRoute(data) {
    const newRoute = await prisma.routes.create({
        data: {
            route_name: data.route_name,
            starting_point: data.starting_point,
            ending_point: data.ending_point,
        },
    });
    await prisma.$disconnect();
    return newRoute;
}

// Actualizar una ruta existente
export async function updateRoute(id, data) {
    const updatedRoute = await prisma.routes.update({
        where: { route_id: id },
        data: {
            route_name: data.route_name,
            starting_point: data.starting_point,
            ending_point: data.ending_point,
        },
    });
    await prisma.$disconnect();
    return updatedRoute;
}

// Eliminar una ruta por ID
export async function deleteRouteById(id) {
    const deletedRoute = await prisma.routes.delete({
        where: { route_id: id },
    });
    await prisma.$disconnect();
    return deletedRoute;
}
