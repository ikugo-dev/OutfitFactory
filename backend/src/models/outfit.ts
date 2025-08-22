import mongoose from 'mongoose';
const { Schema } = mongoose;

const outfitSchema = new Schema(
    {
        garments:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'garment'
        }]
    });

export const OutfitModel = mongoose.model('outfit', outfitSchema);
