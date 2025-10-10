import { Request, Response } from "express";
const OutfitModel = require("../models/outfit");
const GarmentModel = require("../models/garment");
const UserModel = require("../models/user");

const outfitCtrl = {
    async getOutfit(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const outfit = await OutfitModel.findById(id).exec();

            if (!outfit) {
                res.status(404).json({ error: "Outfit not found." });
                return;
            }

            res.status(200).json(outfit);
            return;
        } catch (error) {
            res.status(500).json({ error: "Server error." });
            return;
        }
    },

    async createOutfit(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.body;
            console.log(id);
            const user = await UserModel.findById(id).exec();
            if (!user) {
                res.status(404).json({ error: "No such user." });
                return;
            }

            const newOutfit = await OutfitModel.create({
                owner: id,
                garments: [],
            });

            if (newOutfit == null) {
                res.status(500).json({ error: "Outfit creation error." })
                    ;
                return;
            }

            const updateRes = await UserModel.updateOne({ _id: id }, {
                $push: { outfits: newOutfit._id },
            });
            if (updateRes.modifiedCount == 0) {
                res.status(500).json({
                    error: "Server error. (Modified error)",
                });
                return;
            }

            res.status(200).json(newOutfit);
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Server error." });
            return;
        }
    },

    async addGarment(req: Request, res: Response): Promise<void> {
        try {
            const { id, garmentId } = req.body;
            console.log(id, garmentId);
            const outfit = await OutfitModel.findById(id).exec();
            const garment = await GarmentModel.findById(garmentId).exec();

            if (!outfit || !garment) {
                res.status(404).json({ error: "Not found." });
                return;
            }

            let newOutfit = await OutfitModel.updateOne({ _id: id }, {
                $push: { garments: garmentId },
            }).exec();
            if (newOutfit.modifiedCount == 0) {
                throw new Error("500");
            }

            res.status(200).json();
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Server error." });
            return;
        }
    },

    async deleteOutfit(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const outfit = await OutfitModel.findById(id).exec();

            if (!outfit) {
                res.status(404).json({ error: "Outfit not found." });
                return;
            }
            const updateRes = await UserModel.updateOne({ _id: outfit.owner }, {
                $pull: { outfits: id },
            });
            if (updateRes.modifiedCount == 0) {
                res.status(500).json({
                    error: "Server error. (Modified error)",
                });
                return;
            }
            const deleteRes = await OutfitModel.deleteOne({ _id: id }).exec();
            if (deleteRes.deletedCount == 0) {
                throw new Error();
            }

            res.status(200).json("Successfully deleted outfit");
            return;
        } catch (error) {
            res.status(500).json({ error: "Server error." });
            return;
        }
    },
};

module.exports = outfitCtrl;
