import mongoose from 'mongoose';
import { IUser } from '../types/userType';


const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 72
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 255
    },
    photo: {
        type: String,
    },
    last_active_at: {
        type: Number,
    },
    last_sign_in_at: {
        type: Number,
    }
}, { timestamps: true });
export default mongoose.model<IUser>('user', userSchema);