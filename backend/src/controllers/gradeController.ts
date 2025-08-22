import {Request, Response} from 'express'; 
import { GradeModel } from "../models/grade.ts";


export async function getGrade(req: Request, res: Response): Promise <void>
{
    try{
        const {ID} = req.body;

        const grade = await GradeModel.findById(ID).exec();
        if (grade == null) {
            res.status(404).json({error: "No such post."});
            return; 
        }

        res.status(200).json(grade).send();
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."});
    }

}


export async function createGrade(req: Request, res: Response): Promise <void>
{
    try{
        const newGrade = await GradeModel.create({ fit_quality: 0, material_quality: 0, design: 0, comfort : 0});

        if (newGrade == null) {
            throw new Error();
        }

        res.status(200).json(newGrade).send();
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."}).send();
    }

}


export async function addFit(req: Request, res: Response): Promise <void>
{
    try{
        const {ID, Fit} = req.body;
        
        const grade = await GradeModel.findById(ID).exec();
        if (grade == null) {
            res.status(404).json({error: "No such post."}).send();
            return; 
        }
        
        const newGrade = await grade.updateOne({fit_quality: Fit}).exec();
        if( newGrade.upsertedCount == 0) {
            throw new Error();
        }

        res.status(200).json(grade).send();
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
        
        const grade = await GradeModel.findById(ID).exec();
        if (grade == null) {
            res.status(404).json({error: "No such post."});
            return; 
        }
        
        const newGrade = await grade.updateOne({material_quality: Material}).exec();
        if( newGrade.upsertedCount == 0) {
            throw new Error();
        }

        res.status(200).json(grade).send();
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
        
        const grade = await GradeModel.findById(ID).exec();
        if (grade == null) {
            res.status(404).json({error: "No such post."});
            return; 
        }
        
        const newGrade = await grade.updateOne({design: Design}).exec();
        if( newGrade.upsertedCount == 0) {
            throw new Error();
        }

        res.status(200).json(grade).send();
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
        
        const grade = await GradeModel.findById(ID).exec();
        if (grade == null) {
            res.status(404).json({error: "No such post."});
            return; 
        }
        
        const newGrade = await grade.updateOne({comfort: Comfort}).exec();
        if( newGrade == null) {
            throw new Error();
        }

        res.status(200).json(grade).send();
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

        const post = await GradeModel.findById(ID).exec();
        if (post == null) {
            res.status(404).json({error: "No such garment."});
            return;
        }

        const deleteRes = await GradeModel.deleteOne({ _id: ID });
        if (deleteRes.deletedCount == 0 ) { 
            throw new Error();
        }

        res.status(200).json("Successfully deleted garment").send();
        return;
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."});
        return;
    }
}