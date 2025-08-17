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

module.exports = mongoose.model('outfit', outfitSchema);
