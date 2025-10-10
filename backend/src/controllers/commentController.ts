import { Request, Response } from "express";
import {Types} from "mongoose";
const CommentModel = require("../models/comment");
const UserModel = require("../models/user");

async function getUserOr404(id: string) {
    // if (!Types.ObjectId.isValid(id)) {
    //     throw new Error("400");
    // }
    const user = await UserModel.findById(id).exec();

    if (!user) { 
        throw Error("404");
    }
    return user;
}

const commentCtrl = {


async getComment(req: Request, res: Response): Promise<void> {
    try {
        const id  = req.params.id;
        const comment = await CommentModel.findById(id).exec();

        if (!comment) {
            res.status(404).json({ error: "No such comment." });
            return;
        }

        res.status(200).json(comment);
        return;
    } catch (error) {
        res.status(500).json({ error: "Server error." });
        return;
    }
},

async createComment( req: Request, res: Response): Promise<void> {
    try {
        const { id, text } = req.body;

        let foundUser = await getUserOr404(id);
        console.log(foundUser);
        let strText = text.toString();
        const newComment = await CommentModel.create({user: id, text: strText});

        if (!newComment) {
            throw new Error("500");
        }

        res.status(200).json(newComment);
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error." });
        return;
    }
},

async deleteComment(req: Request, res: Response): Promise<void> {
    try {
        const id  = req.params.id;

        const comment = await CommentModel.findById(id).exec();

        if (!comment) {
            res.status(404).json({ error: "No such comment."});
            return;
        }

        const deleteRes = await CommentModel.deleteOne({ _id: id });
        if (deleteRes.deletedCount == 0) {
            throw new Error();
        }
    } catch (error) {
        res.status(500).json({ error: "Server error." });
        return;
    }
},

async likeComment(req: Request, res: Response): Promise<void> { //--
    try {
        const { id, userId } = req.body;

        const comment = await CommentModel.findById(id).exec();
        if (!comment) {
            res.status(404).json({ error: "No such comment." });
            return;
        }
        const user = await getUserOr404(userId); 
        
        const findRes = await CommentModel.find({likers: userId}).exec();
        if(findRes.length != 0){
            res.status(400).json({message: "Already liked."}); return;
        }

        let likeNum = new Number(comment.likes+1);
        console.log(likeNum);

        const updateRes = await CommentModel.updateOne({_id: id}, {$set: { likes: likeNum }}).exec();
        const updateRes2 = await CommentModel.updateOne({_id: id}, {$push: {likers: userId}}).exec();

        console.log(updateRes);
        if (updateRes.modifiedCount == 0 || updateRes2.modifiedCount == 0) {
            res.status(500).json({ error: "Server error. (Modified is zero)" });
            return;
        }
        res.status(200);
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error." });
        return;
    }
},



async unlikeComment(req: Request, res: Response): Promise<void> { //--
    try {
        const { id, userId } = req.body;

        const comment = await CommentModel.findById(id).exec();
        if (!comment) {
            res.status(404).json({ error: "No such comment." });
            return;
        }
        const user = await getUserOr404(userId); 
        
        const findRes = await CommentModel.find({likers: userId}).exec();
        if(findRes.length == 0){
            res.status(400).json({message: "Not liked."}); return;
        }

        let likeNum;
        if(comment.likes-1 < 0) likeNum = new Number(0);
        else likeNum = new Number(comment.likes-1);
        console.log(likeNum);

        const updateRes = await CommentModel.updateOne({_id: id}, {$set: { likes: likeNum }}).exec();
        const updateRes2 = await CommentModel.updateOne({_id: id}, {$pull: {likers: userId}}).exec();

        console.log(updateRes || updateRes2);
        if (updateRes.modifiedCount == 0 || updateRes2.modifiedCount == 0) {
            res.status(500).json({ error: "Server error. (Modified is zero)" });
            return;
        }
        res.status(200);
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error." });
        return;
    }
},


}

module.exports = commentCtrl;
