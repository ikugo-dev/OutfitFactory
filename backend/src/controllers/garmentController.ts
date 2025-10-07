import { Request, Response } from "express";
const GarmentModel = require("../models/garment");

const garmentCtrl = {
    // simpler call for easier webscrapper use
    async createGarment(req: Request, res: Response): Promise<void> {
        try {
            const {
                id,
                image_url,
                gender,
                category,
                name,
                color,
                material,
                price,
                brand,
            } = req.body;

            // Basic validation
            if (
                !id ||
                !image_url ||
                !gender ||
                !category ||
                !name ||
                !color ||
                !material ||
                !price ||
                !brand
            ) {
                res.status(400).json({
                    error: "Missing required garment fields",
                });
                return;
            }

            const existing = await GarmentModel.findOne({ id }).exec();
            if (existing) {
                res.status(409).json({
                    error: "Garment with this ID already exists",
                });
                return;
            }

            const newGarment = new GarmentModel({
                id,
                image_url,
                gender,
                category,
                name,
                color,
                material,
                price,
                brand,
            });

            const saved = await newGarment.save();
            res.status(201).json(saved);
        } catch (error) {
            res.status(500).json({ error: "Server error." });
        }
    },

    async getGarment(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;

            const garment = await GarmentModel.findById(id).exec();
            if (garment == null) {
                res.status(404).json({ error: "No such garment." });
                return;
            }

            res.status(200).json(garment).send();
        } catch (error) {
            res.status(500).json({ error: "Server error." });
        }
    },

    async getGarments(req: Request, res: Response): Promise<void> {
        try {
            const garments = await GarmentModel.find().exec();
            if (!garments || garments.length === 0) {
                res.status(404).json({ error: "No garments in database." });
                return;
            }
            res.status(200).json(garments).send();
        } catch (error) {
            res.status(500).json({ error: "Server error." });
        }
    },

    // async createGarment(req: Request, res: Response): Promise <void> { //--
    //     try{
    //         const newGarment = await GarmentModel.create({brand: "nobrand"});
    //         if (newGarment == null) {
    //             throw new Error("500");
    //         }
    //         res.status(200).json(newGarment).send();
    //     }
    //     catch(error)
    //     {
    //         console.log(error);
    //         res.status(500).json({error: "Server error."}).send();
    //         return;
    //     }
    //
    // },

    async addImage(req: Request, res: Response): Promise<void> {
        try {
            const { id, image } = req.body;

            const imageURL = image.toString();
            const garment = await GarmentModel.findById(id).exec();
            if (!garment) {
                res.status(404).json({ error: "No such garment." });
                return;
            }

            const newGarment = await GarmentModel.updateOne({ _id: id }, {
                $push: { images: imageURL },
            }).exec();
            if (newGarment.modifiedCount == 0) {
                console.log("modified");
                throw new Error("500");
            }

            res.status(200).json().send();
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Server error." }).send();
        }
    },

    async addColor(req: Request, res: Response): Promise<void> {
        try {
            const { id, color } = req.body;
            console.log(id, color);

            const garment = await GarmentModel.findById(id).exec();
            if (!garment) {
                res.status(404).json({ error: "No such garment." }).send();
                return;
            }

            const newGarment = await GarmentModel.updateOne({ _id: id }, {
                $push: { color: color },
            }).exec();
            if (newGarment.modifiedCount == 0) {
                res.status(500).json({ error: "Server error." }).send();
                return;
            }

            res.status(200).json(garment).send();
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Server error." }).send();
        }
    },

    async addMaterial(req: Request, res: Response): Promise<void> {
        try {
            const { id, material } = req.body;

            const garment = await GarmentModel.findById(id).exec();
            if (!garment) {
                res.status(404).json({ error: "No such garment." });
                return;
            }

            const newGarment = await GarmentModel.updateOne({ _id: id }, {
                $addToSet: { material: material },
            }).exec();
            if (newGarment.modifiedCount == 0) {
                res.status(500).json({ error: "Modified error." }).send();
                return;
            }

            res.status(200).json(garment).send();
            return;
        } catch (error) {
            res.status(500).json({ error: "Server error." }).send();
        }
    },

    async addGender(req: Request, res: Response): Promise<void> {
        try {
            const { id, gender } = req.body;
            const garment = await GarmentModel.findById(id).exec();
            if (!garment) {
                res.status(404).json({ error: "No such garment." });
                return;
            }

            const newGarment = await GarmentModel.updateOne({ _id: id }, {
                $addToSet: { gender: gender },
            }).exec();
            if (newGarment.modifiedCount == 0) {
                res.status(500).json({ error: "Modified error." }).send();
                return;
            }

            res.status(200).json(garment);
            return;
        } catch (error) {
            res.status(500).json({ error: "Server error." }).send();
        }
    },

    async deleteGarment(req: Request, res: Response): Promise<void> //vrv ne treba
    {
        try {
            const id = req.params.id;

            const post = await GarmentModel.findById(id).exec();
            if (post == null) {
                res.status(404).json({ error: "No such garment." }).send();
                return;
            }

            const deleteRes = await GarmentModel.deleteOne({ _id: id }).exec();
            if (deleteRes.deletedCount == 0) {
                throw new Error();
            }

            res.status(200).json("Successfully deleted garment").send();
            return;
        } catch (error) {
            res.status(500).json({ error: "Server error." }).send();
            return;
        }
    },
};

module.exports = garmentCtrl;
