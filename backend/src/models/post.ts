import mongoose, {Schema, Types } from "mongoose";


const PostSchema = new Schema(
    {
        user: { type: Types.ObjectId, ref: "UserModel", required: true },
        outfit: { type: Types.ObjectId, ref: "OutfitModel", required: true },
        text: { type: String, maxlength: 128, default: null },
        likes: { type: Number, min: 0, default: 0 },
        likers: [{ type: Types.ObjectId, ref: "UserModel" }],
        comments: [{ type: Types.ObjectId, ref: "CommentModel" }],
        grades: [{ type: Types.ObjectId, ref: "GradeModel" }]
    },
    { 
        timestamps: true
    }
);

module.exports = mongoose.model('PostModel', PostSchema);
