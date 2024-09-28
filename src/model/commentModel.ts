import mongoose from 'mongoose';
import { IComment } from '../types/blogType';

const CommentSchema = new mongoose.Schema<IComment>({
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    commentMessage: { type: String, required: true },
    likes: { type: Number, default: 0 },
    reply: [this],
}, { timestamps: true });
export default mongoose.model<IComment>('comment', CommentSchema);