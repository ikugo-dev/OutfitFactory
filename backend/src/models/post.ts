import { Document, model, Schema, Types } from "mongoose";

export interface Post extends Document {
    user: number;
    outfit: number;
    text: string;
    likes: number;
    comments: number[];
    grades: number[];
    published: boolean;
}

const PostSchema = new Schema(
    {
        user: { type: Types.ObjectId, ref: "user", required: true },
        outfit: { type: Types.ObjectId, ref: "outfit", required: true },
        text: { type: String, maxlength: 128, default: null },
        likes: { type: Number, min: 0, default: 0 },
        comments: { type: [Types.ObjectId], ref: "outfit" },
        grades: { type: [Types.ObjectId], ref: "grade" },
        published: { type: Boolean, default: false },
    },
);

export const PostModel = model<Post>("Post", PostSchema);
