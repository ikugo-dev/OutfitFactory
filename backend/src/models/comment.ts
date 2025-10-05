import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema(
    {
        
        user: 
        {
            type: mongoose.Types.ObjectId,
            ref: 'user',
            required: true
        },

        text: 
        {
            type: String,
            maxlength: 256,
            minlength: 1,
            required: true
        },

        likes:
        {
            type: Number,
            min: 0,
            default: 0
        },

        likers:
        {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        }



    });

module.exports = mongoose.model('CommentModel', commentSchema);
