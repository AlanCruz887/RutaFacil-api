import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Obtener todos los horarios de paradas
export async function getStopSchedules() {
    const schedules = await prisma.stop_schedules.findMany();
    await prisma.$disconnect();
    return schedules;
}

// Obtener un horario de parada por ID
export async function getStopScheduleById(id) {
    const schedule = await prisma.stop_schedules.findUnique({
        where: {
            schedule_id: id,
        }
    });
    await prisma.$disconnect();
    return schedule;
}

// Crear un nuevo horario de parada
export async function createStopSchedule(data) {
    const newSchedule = await prisma.stop_schedules.create({
        data: {
            stop_id: data.stop_id,
            arrival_time: data.arrival_time,
        },
    });
    await prisma.$disconnect();
    return newSchedule;
}

// Actualizar un horario de parada existente
export async function updateStopSchedule(id, data) {
    const updatedSchedule = await prisma.stop_schedules.update({
        where: { schedule_id: id },
        data: {
            stop_id: data.stop_id,
            arrival_time: data.arrival_time,
        },
    });
    await prisma.$disconnect();
    return updatedSchedule;
}

// Eliminar un horario de parada por ID
export async function deleteStopScheduleById(id) {
    const deletedSchedule = await prisma.stop_schedules.delete({
        where: { schedule_id: id },
    });
    await prisma.$disconnect();
    return deletedSchedule;
}
