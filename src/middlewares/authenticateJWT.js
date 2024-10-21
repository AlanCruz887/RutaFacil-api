import { verifyToken } from '../config/jwt.js';

export const authenticateJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided!' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Guardamos la información del usuario decodificado en el request
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Failed to authenticate token.' + error});
  }
};
