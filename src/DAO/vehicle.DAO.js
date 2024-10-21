import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Obtener todos los vehículos
export async function getVehicles() {
    const vehicles = await prisma.vehicles.findMany();
    await prisma.$disconnect();
    return vehicles;
}

// Obtener un vehículo por ID
export async function getVehicleById(id) {
    const vehicle = await prisma.vehicles.findUnique({
        where: {
            vehicle_id: id,
        }
    })
    await prisma.$disconnect();
    return vehicle;
}

// Crear un nuevo vehículo
export async function createVehicle(data) {
    const newVehicle = await prisma.vehicles.create({
        data: {
            plate_number: data.plate_number,
            model: data.model,
            capacity: data.capacity,
        },
    });
    await prisma.$disconnect();
    return newVehicle;
}

// Actualizar un vehículo existente
export async function updateVehicle(id, data) {
    const updatedVehicle = await prisma.vehicles.update({
        where: { vehicle_id: id },
        data: {
            plate_number: data.plate_number,
            model: data.model,
            capacity: data.capacity,
        },
    });
    await prisma.$disconnect();
    return updatedVehicle;
}

// Eliminar un vehículo por ID
export async function deleteVehicleById(id) {
    const deletedVehicle = await prisma.vehicles.delete({
        where: { vehicle_id: id },
    });
    await prisma.$disconnect();
    return deletedVehicle;
}
