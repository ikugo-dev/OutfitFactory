import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema(
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
            maxlength: 128,
            default: null
        },

        likes:
        {
            type: Number,
            min: 0,
            default: 0,
        },

        outfit:
        {
            type: mongoose.Types.ObjectId,  
            ref: 'outfit',
            required: true
        },

        published:
        {
            type: Boolean,
            default: false

        }

    });

module.exports = mongoose.model('post', postSchema);
