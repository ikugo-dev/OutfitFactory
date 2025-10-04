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
            type: String,
            default: "FFFF"
        }],

        material:[
        {
            type: String

        }],

        gender:[
        {
            type: String
        }],

        brand:
        {
            type: String,
            required: true
        },

    });

module.exports =  mongoose.model('GarmentModel', garmentSchema);
