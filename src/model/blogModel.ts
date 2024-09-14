import mongoose from 'mongoose';
import { IBlog } from '../types/blogType';

const blogSchema = new mongoose.Schema<IBlog>({
    
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 72
    },
    content: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 500000
    },
    image_url: {
        type: String,
        required: true,
    },
}, { timestamps: true });
export default mongoose.model<IBlog>('blog', blogSchema);