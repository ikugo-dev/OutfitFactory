import mongoose from 'mongoose';
const { Schema } = mongoose;

const outfitSchema = new Schema(
    {

        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },

        garments:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'garment'
        }]

        
    });

module.exports =  mongoose.model('OutfitModel', outfitSchema);

