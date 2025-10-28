import mongoose from "mongoose";
const { Schema } = mongoose;

const garmentSchema = new Schema({
    image_url: { type: String, required: true },
    url: { type: String, required: true },
    gender: { type: String, required: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    color: { type: String, required: true },
    material: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
});

module.exports = mongoose.model("GarmentModel", garmentSchema);
