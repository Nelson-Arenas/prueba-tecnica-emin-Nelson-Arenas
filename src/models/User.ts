import mongoose, {Schema} from "mongoose";

interface IUser {
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true , trim: true },
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });
export const User = mongoose.model<IUser>('User', userSchema);