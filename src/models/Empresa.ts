import mongoose from "mongoose";
const { Schema } = mongoose;

interface ICompany {
    name: string;
}

const companySchema = new Schema<ICompany>(
  {
    name: { type: String, required: true, unique: true, trim: true }
  },
  { timestamps: true }
);

companySchema.index({ name: 1 }, { unique: true });

export const Company = mongoose.model<ICompany>("Company", companySchema);