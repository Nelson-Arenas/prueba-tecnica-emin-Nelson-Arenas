import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../models/User";
import { hashPassword } from "../utils/auth";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
