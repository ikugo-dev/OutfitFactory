import {Request, Response} from 'express'; 
const GradeModel = require("../models/grade");


const gradeCtrl = {

    //treba da se cuva grade

async getGrade(req: Request, res: Response): Promise <void>{
    try{
        const id = req.params.id;

        const grade = await GradeModel.findById(id).exec();
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

},

async createGrade(req: Request, res: Response): Promise <void>{
    
    try {
        const {id} = req.body;
        const newGrade = await GradeModel.create({user: id, fit_quality: 0, material_quality: 0, design: 0, comfort : 0});

        if (newGrade == null) {
            throw new Error();
        }
        res.status(200).json(newGrade).send();
    }
    catch(error){
        res.status(500).json({error: "Server error."}).send();
    }

},


async addFit(req: Request, res: Response): Promise <void>{
    try{
        const {id, fit} = req.body;
        const fitNum = new Number(fit);
        
        const grade = await GradeModel.findById(id).exec();
        if (grade == null) {
            res.status(404).json({error: "No such post."}).send();
            return; 
        }
        
        const newGrade = await GradeModel.updateOne({_id: id}, {$set: {fit_quality: fitNum}}).exec();
        console.log(newGrade);
        if( newGrade.modifiedCount == 0) {
            throw new Error("500");
        }

        res.status(200).json(grade).send();
        return;
    }
    catch(error)    
    {
        console.log(error);
        res.status(500).json({error: "Server error."}).send();
    }

},

async addMaterial(req: Request, res: Response): Promise <void> {
    
    try{
        const {id, material} = req.body;
        
        const grade = await GradeModel.findById(id).exec();
        if (grade == null) {
            res.status(404).json({error: "No such post."});
            return; 
        }
        
        const newGrade = await GradeModel.updateOne({_id: id}, {$set: {material_quality: new Number(material)}}).exec();
        if( newGrade.modifiedCount == 0) {
            throw new Error("500");
        }

        res.status(200).json(grade).send();
        return;
    }
    catch(error) {
        res.status(500).json({error: "Server error."});
    }

},

async addDesign(req: Request, res: Response): Promise <void> {
    try{
        const {id, design} = req.body;
        
        const grade = await GradeModel.findById(id).exec();
        if (grade == null) {
            res.status(404).json({error: "No such post."});
            return; 
        }
        
        const newGrade = await GradeModel.updateOne({_id: id}, {$set: {design: new Number(design)}}).exec();
        if( newGrade.modifiedCount == 0) {
            throw new Error();
        }

        res.status(200).json(grade).send();
        return;
    }
    catch(error) {
        res.status(500).json({error: "Server error."});
    }

},

async addComfort(req: Request, res: Response): Promise <void> {
    try{
        const {id, comfort} = req.body;
        
        const grade = await GradeModel.findById(id).exec();
        if (grade == null) {
            res.status(404).json({error: "No such post."});
            return; 
        }
        
        const newGrade = await GradeModel.updateOne({_id: id},  {$set: {comfort: comfort}}).exec();
        if( newGrade.modifiedCount == 0) {
            throw new Error();
        }

        res.status(200).json(grade).send();
        return;
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."});
    }

},


async deleteGrade(req: Request, res: Response): Promise <void> {
    try{
        const id = req.params.id;

        const post = await GradeModel.findById(id).exec();
        if (post == null) {
            res.status(404).json({error: "No such garment."});
            return;
        }

        const deleteRes = await GradeModel.deleteOne({ _id: id });
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
}

module.exports = gradeCtrl;