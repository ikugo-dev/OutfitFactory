import {Request, Response} from 'express'; 
const Outfit = require("../models/postModel");

export async function getOutfit(req: Request, res: Response): Promise <void>  {
    try 
    {
        const { ID } = req.body;
        const outfit = await Outfit.findByID(ID).exec();

        if (!outfit) {
            res.status(404).json({error: "Outfit not found."});
            return;
        }
        
        res.status(200).json(outfit);
        return;
    }
    catch (error) 
    {
        res.status(500).json({error: "Server error."});
        return;
    }
} 

export async function createOutfit(req: Request, res: Response): Promise<void>
{
    try
    {
        const { Top, Bottom, Shoes } = req.body;
        
        if (Top == null || Bottom == null || Shoes == null){
            res.status(400).json({error: "Not enough garments for outfit."});
            return; 
        }
        const newOutfit = new Outfit(Top, Bottom, Shoes);

        if (newOutfit== null){
            res.status(500).json({error: "Outfit creation error."});
            return;
        }

        res.status(200).json(newOutfit);
        return;

    }
    catch(error)
    {
        res.status(500).json({error: "Server error."});
        return; 
    }

}


export async function addGarment(req: Request, res: Response): Promise <void>  {
    try 
    {
        const { ID, Garment } = req.body;
        const outfit = await Outfit.find({_id: ID}).exec();

        if (!outfit) {
            res.status(404).json({error: "Outfit not found."});
            return;
        }
        
        let newOutfit = await outfit.Update({ $push: { garments : Garment } }, { new: true })
        if(newOutfit == null) {
            res.status(500).json({error: "Server error."});
            return;
        }

        res.status(200).json(outfit);
        return;
    }
    catch (error) 
    {
        res.status(500).json({error: "Server error."});
        return;
    }
} 


export async function deleteOutfit(req: Request, res: Response): Promise <void>  {
    try 
    {
        const { ID } = req.body;
        const outfit = await Outfit.findByID(ID).exec();

        if (!outfit) {
            res.status(404).json({error: "Outfit not found."});
            return;
        }

        const deleteRes = await Outfit.deleteOne({ _id: ID });
        if (deleteRes.deletedCount == 0 ) { 
            res.status(500).json({error: "Server error."});
            return;
        }

        res.status(200).json("Successfully deleted outfit");
        return;
    }
    catch (error) 
    {
        res.status(500).json({error: "Server error."});
        return;
    }
} 

