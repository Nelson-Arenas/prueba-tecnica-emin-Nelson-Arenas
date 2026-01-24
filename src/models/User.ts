import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });
export const User = mongoose.model('User', userSchema);