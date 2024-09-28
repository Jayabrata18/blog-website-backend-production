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
    author_Name: { type: String, required: true, maxlength: 255, default: 'Jayabrata Pramanik', },
    isPublic: { type: Boolean, default: true },
    totalLikes: { type: Number, default: 10 },
    totalComments: { type: Number, default: 10 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],  // Array of comments
    tags: { type: [String] },   // Array of tags
    categories: { type: [String] },   // Array of categories
    slug: { type: String, required: true, unique: true },
    readingTime: { type: String },
    metaDescription: { type: String },
    isFeatured: { type: Boolean, default: false },
    views: { type: Number, default: 10 },
}, { timestamps: true });
export default mongoose.model<IBlog>('blog', blogSchema);


