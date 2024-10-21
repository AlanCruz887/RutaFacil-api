import { CODES_HTTP } from "../constants/global.js";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUserById,
} from "../DAO/users.DAO.js";

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Usuarios obtenidos con éxito:",
            data: users,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error al obtener los usuarios.",
        });
    }
};

// Obtener un usuario por ID
export const getOneUser = async (req, res) => {
    try {
        const user = await getUserById(parseInt(req.params.id));

        if (user == null) {
            return res.status(CODES_HTTP.NOT_FOUND).json({
                success: false,
                message: "Usuario no encontrado",
            });
        }

        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Petición exitosa:",
            data: user,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error al obtener el usuario.",
        });
    }
};

// Crear un nuevo usuario
export const addUser = async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.status(CODES_HTTP.CREATED).json({
            success: true,
            message: "Usuario creado con éxito:",
            data: newUser,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error al crear el usuario." + error,
        });
    }
};

// Actualizar un usuario existente
export const updateUserController = async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await getUserById(userId);
  
      if (!user) {
        return res.status(CODES_HTTP.NOT_FOUND).json({
          success: false,
          message: "Usuario no encontrado",
        });
      }
  
      // Actualizar el estado del usuario si el parámetro 'status' está presente
      const newStatus = req.query.status || user.status;
  
      const updatedUser = await updateUser(userId, {
        ...user, // Mantener los datos existentes
        status: newStatus, // Cambiar el estado a 'verified'
      });
  
      res.status(CODES_HTTP.OK).json({
        success: true,
        message: "Usuario actualizado con éxito",
        data: updatedUser,
      });
    } catch (error) {
      return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error al actualizar el usuario.",
      });
    }
  }

// Eliminar un usuario por ID
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await deleteUserById(parseInt(req.params.id));
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Usuario eliminado con éxito:",
            data: deletedUser,
        });
    } catch (error) {
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error al eliminar el usuario.",
        });
    }
};
