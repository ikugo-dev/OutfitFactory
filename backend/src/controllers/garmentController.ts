import {Request, Response} from 'express'; 
import {GarmentModel} from "../models/garment.ts";


export async function getGarment(req: Request, res: Response): Promise <void>
{
    try{
        const {ID} = req.body;

        const garment = await GarmentModel.findById(ID).exec();
        if (garment == null) {
            res.status(404).json({error: "No such garment."});
            return;
        }

        res.status(200).json(garment).send();
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."});
    }

}


export async function createGarment(req: Request, res: Response): Promise <void>
{
    try{
        

        let newGarment = await GarmentModel.create(
            {images: [], 
             category: null, 
             color: null, 
             material: null,
             gender: null, 
             brand: null});

        if (newGarment == null) {
            throw new Error();
        }

        res.status(200).json(newGarment).send();
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."});
    }

}


export async function addImage(req: Request, res: Response): Promise <void>
{
    try{
        const {ID, Image} = req.body;
        
        const garment = await GarmentModel.findById(ID).exec();
        if (garment == null) {
            res.status(404).json({error: "No such post."});
            return; 
        }
        
        const newGarment = await garment.updateOne({_id: ID}, { $push: { images: Image }}).exec();
        if(newGarment.upsertedCount == 0) {
            throw new Error();
        }

        res.status(200).json(garment).send();
        return;
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."}).send();
    }

}


export async function addColor(req: Request, res: Response): Promise <void>
{
    try{
        const {ID, Color} = req.body;
       
        const garment = await GarmentModel.findById(ID).exec();
        if (garment == null) {
            res.status(404).json({error: "No such post."}).send();
            return; 
        }
        
        const newGarment = await GarmentModel.updateOne( {_id: ID}, {$push: { color: Color } }).exec();
        if(newGarment.upsertedCount == 0) {
            res.status(500).json({error: "Server error."}).send();
            return;
        }

        res.status(200).json(garment).send();
        return;
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."}).send();
    }
}

export async function addMaterial(req: Request, res: Response): Promise <void>
{
    try{
        const {ID, Material} = req.body;

        const garment = await GarmentModel.findById(ID).exec();
        if (garment == null) {
            res.status(404).json({error: "No such post."});
            return; 
        }
        
        const newGarment = await GarmentModel.updateOne( {_id: ID}, { $push: { material: Material } }).exec()
        if(newGarment.upsertedCount == 0) {
            res.status(500).json({error: "Server error."}).send();
            return;
        }

        res.status(200).json(garment).send();
        return;
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."}).send();
    }
}

export async function addGender(req: Request, res: Response): Promise <void>
{
    try{
        const {ID, Gender} = req.body;
        const garment = await GarmentModel.findById(ID).exec();
        if (garment == null) {
            res.status(404).json({error: "No such post."});
            return;
        }
        
        const newGarment = await garment.updateOne({_id : ID}, { $push: { gender: Gender } }).exec();
        if(newGarment.upsertedCount == 0) {
            res.status(500).json({error: "Server error."}).send();
            return;
        }

        res.status(200).json(garment);
        return;
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."}).send();
    }
}


export async function deleteGarment(req: Request, res: Response): Promise <void>
{
    try{
        const {ID} = req.body;

        const post = await GarmentModel.findById(ID).exec();
        if (post == null) {
            res.status(404).json({error: "No such garment."}).send();
            return;
        }

        const deleteRes = await GarmentModel.deleteOne({ _id: ID }).exec();
        if (deleteRes.deletedCount == 0 ) { 
            throw new Error;
        }

        res.status(200).json("Successfully deleted garment").send();
        return;
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."}).send();
        return;
    }
}