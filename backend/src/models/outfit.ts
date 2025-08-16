import mongoose from 'mongoose';
const { Schema } = mongoose;

const outfitSchema = new Schema(
    {
        
        top:
        {
            type: mongoose.Types.ObjectId,
            ref: 'garment',
            required: true
        },

        bottom:
        {
            type: mongoose.Types.ObjectId,
            ref: 'garment',
            required: true
        },

        shoes:
        {
            type: mongoose.Types.ObjectId,
            ref: 'garment',
            required: true
        },

        head_accessories:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'garment'
        }],

        neck_accessories:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'garment'
        }],

        arm_accessories:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'garment'
        }],

        body_accessories:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'garment'
        }],

        leg_accessories:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'garment'
        }]
        
    });

module.exports = mongoose.model('outfit', outfitSchema);
