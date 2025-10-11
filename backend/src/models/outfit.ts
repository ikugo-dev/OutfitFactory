import mongoose from 'mongoose';
const { Schema } = mongoose;

const outfitSchema = new Schema(
    {

        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'UserModel'
        },

        garments:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'GarmentModel'
        }]

        
    });

module.exports =  mongoose.model('OutfitModel', outfitSchema);

