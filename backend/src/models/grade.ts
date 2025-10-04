import mongoose from 'mongoose';
const { Schema } = mongoose;

const gradeSchema = new Schema(
    {
        
        fit_quality:
        {
            type: Number,
            min: 0.0,
            max: 5.0,
            default: 0.0
        },

        material_quality:
        {
            type: Number,
            min: 0.0,
            max: 5.0,
            default: 0.0
        },

        design:
        {
            type: Number,
            min: 0.0,
            max: 5.0,
            default: 0.0
        },

        comfort:
        {
            type: Number,
            min: 0.0,
            max: 5.0,
            default: 0.0
        }
        

    });

module.exports = mongoose.model('GradeModel', gradeSchema);
