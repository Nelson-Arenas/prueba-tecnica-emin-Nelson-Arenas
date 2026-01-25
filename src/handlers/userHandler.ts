import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";



// Handler para registrar un nuevo usuario
export const registerUser = async (req: Request, res: Response) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }


    const hashedPassword = await hashPassword(req.body.password);
    await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });

    
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al registrar el usuario', 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    });
  }
}


// hanndler para login de usuario
export const loginUser = async (req: Request, res: Response) => {
  try {

    const userExists = await User.findOne({ email: req.body.email });
    if (!userExists) {
      return res.status(404).json({ message: 'Usuario no registrado' });
    }


    const isPasswordValid = await checkPassword(req.body.password, userExists.password!);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    console.log('Usuario encontrado:', userExists.password);

    
    const token = generateJWT({ id: userExists._id, email: userExists.email });
    res.setHeader('Authorization', `Bearer ${token}`);
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });


    
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al iniciar sesión', 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    });
  }
};
