import {Request, Response} from 'express'; 
import Grade from './models/grade.ts'


export async function getGrade(req: Request, res: Response): Promise <void>
{
    try{
        const {ID} = req.body;

        const grade = await Grade.findById(ID).exec();
        if (grade == null) {
            res.status(404).json({error: "No such post."});
            return; 
        }

        res.status(200).json(grade);
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."});
    }

}


export async function createGrade(req: Request, res: Response): Promise <void>
{
    try{

        const newGrade = new Grade();

        if (newGrade == null) {
            res.status(500).json({error: "Server error."});
            return;
        }

        res.status(200).json(newGrade);
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."});
    }

}


export async function addFit(req: Request, res: Response): Promise <void>
{
    try{
        const {ID, Fit} = req.body;
        
        const grade = await Grade.findById(ID).exec();
        if (grade == null) {
            res.status(404).json({error: "No such post."});
            return; 
        }
        
        const newGrade = await grade.updateOne({fit_quality: Fit}, {new: true})
        if( newGrade == null) {
            res.status(500).json({error: "Server error."});
            return;
        }

        res.status(200).json(grade);
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
        
        const grade = await Grade.findById(ID).exec();
        if (grade == null) {
            res.status(404).json({error: "No such post."});
            return; 
        }
        
        const newGrade = await grade.updateOne({fit_quality: Material}, {new: true})
        if( newGrade == null) {
            res.status(500).json({error: "Server error."});
            return;
        }

        res.status(200).json(grade);
        return;
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."});
    }

}

export async function addDesign(req: Request, res: Response): Promise <void>
{
    try{
        const {ID, Design} = req.body;
        
        const grade = await Grade.findById(ID).exec();
        if (grade == null) {
            res.status(404).json({error: "No such post."});
            return; 
        }
        
        const newGrade = await grade.updateOne({fit_quality: Design}, {new: true})
        if( newGrade == null) {
            res.status(500).json({error: "Server error."});
            return;
        }

        res.status(200).json(grade);
        return;
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."});
    }

}

export async function addComfort(req: Request, res: Response): Promise <void>
{
    try{
        const {ID, Comfort} = req.body;
        
        const grade = await Grade.findById(ID).exec();
        if (grade == null) {
            res.status(404).json({error: "No such post."});
            return; 
        }
        
        const newGrade = await grade.updateOne({fit_quality: Comfort}, {new: true})
        if( newGrade == null) {
            res.status(500).json({error: "Server error."});
            return;
        }

        res.status(200).json(grade);
        return;
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."});
    }

}


export async function deleteGrade(req: Request, res: Response): Promise <void>
{
    try{
        const {ID} = req.body;

        const post = await Grade.findById(ID).exec();
        if (post == null) {
            res.status(404).json({error: "No such garment."});
            return;
        }

        const deleteRes = await Grade.deleteOne({ _id: ID });
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