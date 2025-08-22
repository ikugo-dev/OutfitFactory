import {Request, Response} from 'express'; 
import { OutfitModel } from "../models/outfit.ts";

export async function getOutfit(req: Request, res: Response): Promise <void>  {
    try 
    {
        const { ID } = req.body;
        const outfit = await OutfitModel.findById(ID).exec();

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
} 

export async function createOutfit(req: Request, res: Response): Promise<void>
{
    try
    {
        const newOutfit = await OutfitModel.create({ garments: [] });

        if (newOutfit == null){
            res.status(500).json({error: "Outfit creation error."}).send();
            return;
        }

        res.status(200).json(newOutfit).send();
        return;

    }
    catch(error)
    {
        res.status(500).json({error: "Server error."}).send();
        return; 
    }

}


export async function addGarment(req: Request, res: Response): Promise <void>  {
    try 
    {
        const { ID, Garment } = req.body;
        const outfit = await OutfitModel.find({_id: ID}).exec();

        if (!outfit) {
            res.status(404).json({error: "Outfit not found."}).send();
            return;
        }
        
        let newOutfit = await OutfitModel.updateOne({_id: ID}, { $push: { garments : Garment }}).exec();
        if(newOutfit.upsertedCount == 0) {
            throw new Error();
        }

        res.status(200).json({garment: Garment}).send();
        return;
    }
    catch (error) 
    {
        res.status(500).json({error: "Server error."}).send();
        return;
    }
} 


export async function deleteOutfit(req: Request, res: Response): Promise <void>  {
    try 
    {
        const { ID } = req.body;
        const outfit = await OutfitModel.findById(ID).exec();

        if (!outfit) {
            res.status(404).json({error: "Outfit not found."}).send();
            return;
        }

        const deleteRes = await OutfitModel.deleteOne({ _id: ID }).exec();
        if (deleteRes.deletedCount == 0 ) { 
            throw new Error();
        }

        res.status(200).json("Successfully deleted outfit").send();
        return;
    }
    catch (error) 
    {
        res.status(500).json({error: "Server error."}).send();
        return;
    }
} 

