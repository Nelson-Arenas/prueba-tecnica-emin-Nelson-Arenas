import { Request, Response } from 'express';
import { Activo } from '../models/Activo';

export const registerActivo = async (req, res) => {
    try {
        const activoExists = await Activo.findOne({ serialNumber: req.body.serialNumber });
        if (activoExists) {
            return res.status(409).json({ message: 'El activo ya existe' });
        }
        await Activo.create({ ...req.body });
        res.status(201).json({ message: 'Activo registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al registrar el activo',
            error: error instanceof Error ? error.message : 'Error desconocido'
            });
    }
};

export const getActivos = async (req: Request, res: Response) => {
    try {
        const activos = await Activo.find();
        res.status(200).json(activos);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener los activos',
            error: error instanceof Error ? error.message : 'Error desconocido'
            });
    }
};