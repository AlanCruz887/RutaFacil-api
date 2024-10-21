import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your-secret-key'; // Usa una clave secreta más segura desde .env

export const generateToken = (user) => {
  const token = jwt.sign({ id: user.user_id, email: user.email, role: user.role }, secret, {
    expiresIn: '24h', // Expira en 24 horas
  });
  return token;
};

export const verifyToken = (token) => {
  return jwt.verify(token, secret);
};
