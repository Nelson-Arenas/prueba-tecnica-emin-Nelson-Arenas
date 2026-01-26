import { Request, Response } from "express";
import mongoose from "mongoose";
import { Activo } from "../models/Activo";

/** Helpers */
const parseNumber = (value: any, fallback: number) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const registerActivo = async (req: Request, res: Response) => {
  try {
    const { code, serialNumber } = req.body;

    // Buscar duplicados específicos
    const existingByCode = await Activo.findOne({ code });
    if (existingByCode) {
      return res.status(409).json({
        message: "El código ya existe",
        field: "code",
      });
    }

    const existingBySerial = await Activo.findOne({ serialNumber });
    if (existingBySerial) {
      return res.status(409).json({
        message: "El número de serie ya existe",
        field: "serialNumber",
      });
    }

    await Activo.create({ ...req.body });

    return res.status(201).json({
      message: "Activo registrado exitosamente",
    });
  } catch (error) {
    console.error("[registerActivo] error:", error);

    return res.status(500).json({
      message: "Error al registrar el activo",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};


/**
 * GET /activo/list
 * Query params:
 *  - page (default 1)
 *  - limit (default 10)
 *  - q (search global)
 *  - type, status
 *  - companyId
 *  - assignedUserId
 */
export const getActivos = async (req: Request, res: Response) => {
  try {
    const page = parseNumber(req.query.page, 1);
    const limit = parseNumber(req.query.limit, 10);
    const skip = (page - 1) * limit;

    const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
    const type = typeof req.query.type === "string" ? req.query.type.trim() : "";
    const status = typeof req.query.status === "string" ? req.query.status.trim() : "";
    const companyId = typeof req.query.companyId === "string" ? req.query.companyId.trim() : "";
    const assignedUserId =
      typeof req.query.assignedUserId === "string" ? req.query.assignedUserId.trim() : "";

    // Base filter: soft delete
    const filter: any = { deletedAt: null };

    // Field filters
    if (type) filter.type = type;
    if (status) filter.status = status;

    // IDs
    if (companyId && mongoose.Types.ObjectId.isValid(companyId)) {
      filter.company = new mongoose.Types.ObjectId(companyId);
    }
    if (assignedUserId && mongoose.Types.ObjectId.isValid(assignedUserId)) {
      filter.assignedUser = new mongoose.Types.ObjectId(assignedUserId);
    }

    // Global search
    if (q) {
      const safe = escapeRegex(q);
      const rx = new RegExp(safe, "i");

      filter.$or = [
        { code: rx },
        { name: rx },
        { brand: rx },
        { model: rx },
        { serialNumber: rx },
        { location: rx },
        { notes: rx },
      ];
    }

    // Total count (for pagination UI)
    const total = await Activo.countDocuments(filter);

    const items = await Activo.find(filter)
      .populate("company", "name")
      .populate("assignedUser", "name lastName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      items,
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los activos",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const getActivoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const activo = await Activo.findById(id)
      .populate("company", "name")
      .populate("assignedUser", "name lastName email");

    if (!activo) {
      return res.status(404).json({ message: "Activo no encontrado" });
    }

    return res.status(200).json(activo);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener el activo",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const updateActivo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const activo = await Activo.findByIdAndUpdate(id, req.body, { new: true })
      .populate("company", "name")
      .populate("assignedUser", "name lastName email");

    if (!activo) {
      return res.status(404).json({ message: "Activo no encontrado" });
    }

    return res.status(200).json({ message: "Activo actualizado exitosamente", activo });
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar el activo",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// soft delete de activo (usando deletedAt)
export const deleteActivo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const activo = await Activo.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });

    if (!activo) {
      return res.status(404).json({ message: "Activo no encontrado" });
    }

    return res.status(200).json({
      message: "Activo eliminado exitosamente",
      activo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar el activo",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
