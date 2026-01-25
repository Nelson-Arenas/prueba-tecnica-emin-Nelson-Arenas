import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { IUser } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }
  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    const user = await User.findById(decoded.id).select('-password -__v -_id -updatedAt ');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    req.user = user;
    next();

  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener el perfil del usuario', 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    });
  }
};