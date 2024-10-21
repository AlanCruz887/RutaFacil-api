import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Obtener todas las calificaciones
export async function getRatings() {
    const ratings = await prisma.ratings.findMany();
    await prisma.$disconnect();
    return ratings;
}

// Obtener una calificación por ID
export async function getRatingById(id) {
    const rating = await prisma.ratings.findUnique({
        where: {
            rating_id: id,
        }
    });
    await prisma.$disconnect();
    return rating;
}

// Crear una nueva calificación
export async function createRating(data) {
    const newRating = await prisma.ratings.create({
        data: {
            vehicle_id: data.vehicle_id,
            user_id: data.user_id,
            score: data.score,
            comment: data.comment,
        },
    });
    await prisma.$disconnect();
    return newRating;
}

// Actualizar una calificación existente
export async function updateRating(id, data) {
    const updatedRating = await prisma.ratings.update({
        where: { rating_id: id },
        data: {
            vehicle_id: data.vehicle_id,
            user_id: data.user_id,
            score: data.score,
            comment: data.comment,
        },
    });
    await prisma.$disconnect();
    return updatedRating;
}

// Eliminar una calificación por ID
export async function deleteRatingById(id) {
    const deletedRating = await prisma.ratings.delete({
        where: { rating_id: id },
    });
    await prisma.$disconnect();
    return deletedRating;
}
