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


// Obtener una ubicación de vehículo por IDVehiculo
export async function getOneVehicleLocationByIdVehicle(id) {
    const location = await prisma.vehicle_locations.findFirst({
        where:{
            vehicle_id:id
        }
    })
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

export async function updateVehicleLocationById(id, data) {
    try {
        // Encuentra el registro asociado al vehicle_id
        const idVehicleLocation = await prisma.vehicle_locations.findFirst({
            where: { vehicle_id: id },
            select: { location_id: true },
        });

        // Manejo de caso donde no se encuentra el registro
        if (!idVehicleLocation) {
            throw new Error(`No se encontró una ubicación asociada al vehículo con ID ${id}`);
        }

        // Actualiza la ubicación
        const updatedLocation = await prisma.vehicle_locations.update({
            where: { location_id: idVehicleLocation.location_id },
            data: {
                vehicle_id: id,
                lat: data.lat,
                lon: data.lon,
                event_type: data.event_type,
                direction: data.direction,
            },
        });

        return updatedLocation;
    } catch (error) {
        console.error('Error actualizando la ubicación del vehículo:', error);
        throw error; // Re-lanza el error para que sea manejado por la capa superior
    }
}



