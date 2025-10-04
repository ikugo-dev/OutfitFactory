import mongoose, {Schema, Types } from "mongoose";


const PostSchema = new Schema(
    {
        user: { type: Types.ObjectId, ref: "user", required: true },
        outfit: { type: Types.ObjectId, ref: "outfit", required: true },
        text: { type: String, maxlength: 128, default: null },
        likes: { type: Number, min: 0, default: 0 },
        comments: [{ type: Types.ObjectId, ref: "comment" }],
        grades: [{ type: Types.ObjectId, ref: "grade" }],
        published: { type: Boolean, default: false },
    }
);

module.exports = mongoose.model('PostModel', PostSchema);
