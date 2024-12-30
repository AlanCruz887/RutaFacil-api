import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your-secret-key'; 

export const generateToken = (user) => {
  const token = jwt.sign({ id: user.user_id, email: user.email, role: user.role }, secret, {
    expiresIn: '24h', 
  });
  return token;
};

export const verifyToken = (token) => {
  return jwt.verify(token, secret);
};
