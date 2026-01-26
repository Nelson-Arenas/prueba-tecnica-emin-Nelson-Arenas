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

export const getActivoById = async (req: Request, res: Response) => {
    try {
        const activo = await Activo.findById(req.body.id);
        if (!activo) {
            return res.status(404).json({ message: 'Activo no encontrado' });
        }
        res.status(200).json(activo);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener el activo',
            error: error instanceof Error ? error.message : 'Error desconocido'
            });
    }   
};

export const updateActivo = async (req: Request, res: Response) => {
    try {
        const activo = await Activo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!activo) {
            return res.status(404).json({ message: 'Activo no encontrado' });
        }
        res.status(200).json({ message: 'Activo actualizado exitosamente', activo });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al actualizar el activo',
            error: error instanceof Error ? error.message : 'Error desconocido'
            });
    }
};