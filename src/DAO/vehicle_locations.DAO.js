import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Obtener todas las ubicaciones de vehículos
export async function getVehicleLocations() {
    const locations = await prisma.vehicle_locations.findMany();
    await prisma.$disconnect();
    return locations;
}

// Obtener una ubicación de vehículo por ID
export async function getVehicleLocationById(id) {
    const location = await prisma.vehicle_locations.findUnique({
        where: {
            location_id: id,
        },
    });
    await prisma.$disconnect();
    return location;
}

// Crear una nueva ubicación de vehículo
export async function createVehicleLocation(data) {
    const newLocation = await prisma.vehicle_locations.create({
        data: {
            vehicle_id: data.vehicle_id,
            lat: data.lat,
            lon: data.lon,
            event_type: data.event_type,
            direction: data.direction,
        },
    });
    await prisma.$disconnect();
    return newLocation;
}

// Eliminar una ubicación de vehículo por ID
export async function deleteVehicleLocationById(id) {
    const deletedLocation = await prisma.vehicle_locations.delete({
        where: { location_id: id },
    });
    await prisma.$disconnect();
    return deletedLocation;
}
