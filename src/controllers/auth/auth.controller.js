import bcrypt from 'bcryptjs';
import { generateToken } from '../../config/jwt.js'; 
import { PrismaClient } from "@prisma/client";
import { sendWelcomeEmail } from '../../config/mailer.js';
const prisma = new PrismaClient();

// Función para el login (ya implementada antes)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const user = await prisma.users.findFirst({
      where: { email: email }
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Comparar la contraseña ingresada con la almacenada
    const isValidPassword = bcrypt.compareSync(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generar el token JWT
    const token = generateToken(user);

    // Enviar el token al cliente
    return res.json({ token });

  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

// Función para registrar un nuevo usuario
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verificar si el email ya existe
    const existingUser = await prisma.users.findFirst({
      where: { email: email }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Encriptar la contraseña
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Crear el nuevo usuario
    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password_hash: hashedPassword,
        role: 'user',
        status: 'unverified',
      }
    });

    // Generar el token JWT para el nuevo usuario
    const token = generateToken(newUser);

    // Generar enlace de verificación
    const verificationLink = `${process.env.HOST}/api/users/update-user/${newUser.user_id}?status=verified`;

    // Enviar correo de bienvenida con enlace de verificación
    try {
      await sendWelcomeEmail(newUser.email, newUser.username, verificationLink);
      console.log('Correo de verificación enviado.');
    } catch (emailError) {
      console.error('Error al enviar el correo de verificación:', emailError);
      return res.status(500).json({ message: 'User registered, but failed to send verification email' });
    }

    return res.json({ token });

  } catch (error) {
    console.error('Error en register:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
