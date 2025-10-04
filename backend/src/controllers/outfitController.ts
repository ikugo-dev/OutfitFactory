import {Request, Response} from 'express'; 
const OutfitModel = require("../models/outfit");
const GarmentModel = require("../models/garment");

const outfitCtrl = {

async getOutfit(req: Request, res: Response): Promise <void>  {
    try 
    {
        const  id  = req.params.id;
        const outfit = await OutfitModel.findById(id).exec();

        if (!outfit) {
            res.status(404).json({error: "Outfit not found."}).send();
            return;
        }
        
        res.status(200).json(outfit).send();
        return;
    }
    catch (error) 
    {
        res.status(500).json({error: "Server error."}).send();
        return;
    }
},

async createOutfit(req: Request, res: Response): Promise<void>
{
    try{
        const newOutfit = await OutfitModel.create({ garments: [] });

        if (newOutfit == null){
            res.status(500).json({error: "Outfit creation error."}).send();
            return;
        }

        res.status(200).json(newOutfit).send();
        return;

    }
    catch(error){
        res.status(500).json({error: "Server error."}).send();
        return; 
    }
},


async addGarment(req: Request, res: Response): Promise <void>  {
    try {
        const { id, garmentId } = req.body;
        const outfit = await OutfitModel.findById(id).exec();
        const garment = await GarmentModel.findById(garmentId).exec();

        console.log("")
        if (!outfit || !garment) {
            res.status(404).json({error: "Not found."}).send();
            return;
        }
        
        let newOutfit = await OutfitModel.updateOne({_id: id}, { $push: { garments : garmentId }}).exec();
        if(newOutfit.modifiedCount == 0) {
            throw new Error("500");
        }

        res.status(200).json().send();
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error."}).send();
        return;
    }
},


async deleteOutfit(req: Request, res: Response): Promise <void>  {
    try {
        const id  = req.params.id;
        const outfit = await OutfitModel.findById(id).exec();

        if (!outfit) {
            res.status(404).json({error: "Outfit not found."}).send();
            return;
        }

        const deleteRes = await OutfitModel.deleteOne({ _id: id }).exec();
        if (deleteRes.deletedCount == 0 ) { 
            throw new Error();
        }

        res.status(200).json("Successfully deleted outfit").send();
        return;
    }
    catch (error) {
        res.status(500).json({error: "Server error."}).send();
        return;
    }
} 
}


module.exports = outfitCtrl;
