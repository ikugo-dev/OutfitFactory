import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        
        username: 
        {
            type: String,
            required: true,
            unique: true,
            maxlength: 25
        },
        email:
        {
            type: String,
            required: true,
            unique: true,
            maxlength: 100 
        },

        password:
        {
            type: String,
            required: true,
            unique: true,
            maxlength: 50
        },

        avatar:
        {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/53/53101.png"
        },

        posts:
        {
            type: mongoose.Types.ObjectId,
            ref : 'post',
            default: []
        },

        followers:
        {
            type: mongoose.Types.ObjectId,
            ref : 'user',
            default: [], 
        },

        following:
        {
            type: mongoose.Types.ObjectId,
            ref : 'user',
            default: [] 
        }

    });

module.exports = mongoose.model('user', userSchema);
