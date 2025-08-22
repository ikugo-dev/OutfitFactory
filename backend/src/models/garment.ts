import mongoose from 'mongoose';
const { Schema } = mongoose;

const garmentSchema = new Schema(
    {
        
        images:[
        {
            type: String
        }],


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

        material:[
        {
            type: String, //TODO isto treba da bude u enum 
            default: null
        }],

        gender:[
        {
            type: String,
            default: null
        }],

        brand:
        {
            type: String,
            required: true
        },

    });

export const GarmentModel = mongoose.model('garment', garmentSchema);
