import mongoose from 'mongoose';
const { Schema } = mongoose;

const garmentSchema = new Schema(
    {
        
        category: 
        {
            type: String,
            maxlength: 25,
            default: null
        },

        color:[
        {
            type: String, //TODO ovde treba color enum nesto i vidi za validate fju
            
        }],

        material:
        {
            type: String, //TODO isto treba da bude u enum 
            default: null
        },

        gender:
        {
            type: String,
            default: null
        },

        brand:
        {
            type: String,
            required: true
        },

        grade:
        {
            type: mongoose.Types.ObjectId,
            ref : 'ocena',
            default: null 
        },

        comments:[
        {
            type: mongoose.Types.ObjectId,
            ref : 'comment',
        }]

    });

module.exports = mongoose.model('garment', garmentSchema);
