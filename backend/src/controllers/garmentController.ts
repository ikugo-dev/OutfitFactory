import {Request, Response} from 'express'; 
import Garment from './models/garment.ts'


export async function getGarment(req: Request, res: Response): Promise <void>
{
    try{
        const {ID} = req.body;

        const garment = await Garment.findById(ID).exec();
        if (garment == null) {
            res.status(404).json({error: "No such post."});
            return;
        }

        res.status(200).json(garment);
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."});
    }

}


export async function createGarment(req: Request, res: Response): Promise <void>
{
    try{
        const {Images, Category, Color, Material, Gender, Brand} = req.body;

        let newGarment = new Garment(Images, Category, Color, Material, Gender, Brand);
        if (newGarment == null) {
            res.status(500).json({error: "Server error."});
            return;
        }

        res.status(200).json(newGarment);
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
        
        const garment = await Garment.findById(ID).exec();
        if (garment == null) {
            res.status(404).json({error: "No such post."});
            return; 
        }
        
        const newGarment = await garment.Update({ $push: { images: Image } }, { new: true })
        if(garment == null) {
            res.status(500).json({error: "Server error."});
            return;
        }

        res.status(200).json(garment);
        return;
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."});
    }

}


export async function addColor(req: Request, res: Response): Promise <void>
{
    try{
        const {ID, Color} = req.body;
       
        const garment = await Garment.findById(ID).exec();
        if (garment == null) {
            res.status(404).json({error: "No such post."});
            return; 
        }
        
        const newGarment = await garment.Update( {$push: { color: Color } }, { new: true })
        if(garment == null) {
            res.status(500).json({error: "Server error."});
            return;
        }

        res.status(200).json(garment);
        return;
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."});
    }
}

export async function addMaterial(req: Request, res: Response): Promise <void>
{
    try{
        const {ID, Material} = req.body;

        const garment = await Garment.findById(ID).exec();
        if (garment == null) {
            res.status(404).json({error: "No such post."});
            return; 
        }
        
        const newGarment = await garment.Update({ $push: { material: Material } }, { new: true })
        if(garment == null) {
            res.status(500).json({error: "Server error."});
            return;
        }

        res.status(200).json(garment);
        return;
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."});
    }
}

export async function addGender(req: Request, res: Response): Promise <void>
{
    try{
        const {ID, Gender} = req.body;
        const garment = await Garment.findById(ID).exec();
        if (garment == null) {
            res.status(404).json({error: "No such post."});
            return;
        }
        
        const newGarment = await garment.Update({ $push: { gender: Gender } }, { new: true })
        if(garment == null) {
            res.status(500).json({error: "Server error."});
            return;
        }

        res.status(200).json(garment);
        return;
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."});
    }
}


export async function deleteGarment(req: Request, res: Response): Promise <void>
{
    try{
        const {ID} = req.body;

        const post = await Garment.findById(ID).exec();
        if (post == null) {
            res.status(404).json({error: "No such garment."});
            return;
        }

        const deleteRes = await Garment.deleteOne({ _id: ID });
        if (deleteRes.deletedCount == 0 ) { 
            res.status(500).json({error: "Server error."});
            return;
        }

        res.status(200).json("Successfully deleted garment");
        return;
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."});
        return;
    }
}