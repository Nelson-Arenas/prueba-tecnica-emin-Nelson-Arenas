import mongoose from "mongoose";
const { Schema } = mongoose;

const assetSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, trim: true },   // ej: NB-001
    name: { type: String, required: true, trim: true },

    type: {type: String, enum: ["NOTEBOOK", "MONITOR", "LICENCIA", "PERIFERICO", "OTRO"], required: true,},

    brand: { type: String, trim: true },
    model: { type: String, trim: true },

    serialNumber: { type: String, required: true, unique: true, trim: true },

    status: {type: String, enum: ["DISPONIBLE", "ASIGNADO", "MANTENCION", "BAJA"], default: "DISPONIBLE",},

    purchaseDate: { type: Date },

    company: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },

    assignedTo: { type: String, default: null, trim: true },

    notes: { type: String, default: null, trim: true },

    // Soft delete
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

assetSchema.index({ code: 1 }, { unique: true });
assetSchema.index({ serialNumber: 1 }, { unique: true });
assetSchema.index({ deletedAt: 1 });

export const Asset = mongoose.model("Asset", assetSchema);
