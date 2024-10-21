import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Obtener todos los usuarios
export async function getUsers() {
    const users = await prisma.users.findMany();
    await prisma.$disconnect();
    return users;
}

// Obtener un usuario por ID
export async function getUserById(id) {
    const user = await prisma.users.findUnique({
        where: {
            user_id: id,
        },
    });
    await prisma.$disconnect();
    return user;
}

// Crear un nuevo usuario
export async function createUser(data) {
    const newUser = await prisma.users.create({
        data: {
            username: data.username,
            password_hash: data.password_hash,
            email: data.email,
            role: data.role,
            status: data.status,
        },
    });
    await prisma.$disconnect();
    return newUser;
}

// Actualizar un usuario existente
export async function updateUser(id, data) {
    const updatedUser = await prisma.users.update({
        where: { user_id: id },
        data: {
            username: data.username,
            password_hash: data.password_hash,
            email: data.email,
            role: data.role,
            status: data.status,
        },
    });
    await prisma.$disconnect();
    return updatedUser;
}

// Eliminar un usuario por ID
export async function deleteUserById(id) {
    const deletedUser = await prisma.users.delete({
        where: { user_id: id },
    });
    await prisma.$disconnect();
    return deletedUser;
}
