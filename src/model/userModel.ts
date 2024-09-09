import mongoose from 'mongoose';
import { EUserRole } from '../constant/userConstant';
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
    phoneNumber: String,
    // phoneNumber: {
    //     _id: false,
    //     isoCode: {
    //         type: String,
    //         required: true
    //     },
    //     countryCode: {
    //         type: String,
    //         required: true
    //     },
    //     internationalNumber: {
    //         type: String,
    //         required: true
    //     }
    // },
    password: {
        type: String,
        required: true,
        minlength: 4,
        select: false
    },
    timeZone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: EUserRole,
        default: EUserRole.USER
    },
    accountConformation: {
        _id: false,
        status: {
            type: Boolean,
            required: true,
            default: true
        },
        token: {
            type: String,
            select: true
        },
        code: {
            type: String,
            select: true
        },
        timestamp: {
            type: Date,
            required: true,
            default: Date.now
        }
    },
    passwordReset: {
        _id: false,
        token: {
            type: String,
            default: null
        },
        expiry: {
            type: Number,
            default: null
        },
        lastReset: {
            type: Date,
            default: null
        }
    },
    lastLogin: {
        type: Date,
        default: null
    },
    consent: {
        type: Boolean,
        required: true,
    }
}, { timestamps: true });
export default mongoose.model<IUser>('user', userSchema);