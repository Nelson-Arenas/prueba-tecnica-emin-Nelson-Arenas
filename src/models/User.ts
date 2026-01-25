import mongoose, {Schema} from "mongoose";

interface IUser {
    name: string;
    lastName: string;
    email: string;
    password: string;
    company?: Number;
}

const userSchema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true, select: true },
    company: { type: Number, ref: 'Company', required: false }
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });
export const User = mongoose.model<IUser>('User', userSchema);