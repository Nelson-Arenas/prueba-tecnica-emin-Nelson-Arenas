import mongoose from "mongoose";

const { Schema } = mongoose;

interface IActivo {
  code: string;
  name: string;
  type: "NOTEBOOK" | "MONITOR" | "LICENCIA" | "PERIFERICO" | "OTRO";
  brand?: string;
  model?: string;
  serialNumber: string;
  status: "DISPONIBLE" | "ASIGNADO" | "MANTENCION" | "BAJA";
  purchaseDate?: Date;
  company: mongoose.Types.ObjectId;
  location: string;
  assignedUser: mongoose.Types.ObjectId | null;
  
  notes?: string | null;
  deletedAt: Date | null;
  priority: 'ALTA' | 'MEDIA' | 'BAJA';
}

const ActivoSchema = new Schema<IActivo>(
  {
    code: { type: String, required: true, unique: true, trim: true },   // ej: NB-001
    name: { type: String, required: true, trim: true },

    type: {type: String, enum: ["NOTEBOOK", "MONITOR", "LICENCIA", "PERIFERICO", "OTRO"], required: true,},

    brand: { type: String, trim: true },
    model: { type: String, trim: true },

    serialNumber: { type: String, required: true, unique: true, trim: true },

    status: {type: String, enum: ["DISPONIBLE", "ASIGNADO", "MANTENCION", "BAJA"], default: "DISPONIBLE",},

    purchaseDate: { type: Date },

    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    location: { type: String, required: true, trim: true },

    assignedUser: { type: Schema.Types.ObjectId, ref: "User", default: null },

    notes: { type: String, default: null, trim: true },

    // Soft delete
    deletedAt: { type: Date, default: null },
    priority: { type: String, enum: ['ALTA', 'MEDIA', 'BAJA'], required: false },
  },
  { timestamps: true }
);

ActivoSchema.index({ code: 1 }, { unique: true });
ActivoSchema.index({ serialNumber: 1 }, { unique: true });
ActivoSchema.index({ deletedAt: 1 });
ActivoSchema.index({ company: 1, status: 1 });

ActivoSchema.pre("validate", function () {
  if (this.assignedUser) {
    this.status = "ASIGNADO";
  } else if (this.status === "ASIGNADO") {
    this.status = "DISPONIBLE";
  }
});

export const Activo = mongoose.model<IActivo>("Activo", ActivoSchema);