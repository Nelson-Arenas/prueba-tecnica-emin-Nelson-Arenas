import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Company } from "../models/Empresa";
import { checkPassword, hashPassword } from "../utils/auth";


// Handler para registrar una Empresa
export const registerCompany = async (req: Request, res: Response) => {
  try {
    const companyExists = await Company.findOne({ name: req.body.name });
    if (companyExists) {
      return res.status(409).json({ message: 'La empresa ya existe' });
    }
    await Company.create({ ...req.body });
    res.status(201).json({ message: 'Empresa registrada exitosamente' });

    
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al registrar la empresa', 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    });
  }
};

