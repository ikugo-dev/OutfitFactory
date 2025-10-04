import { Request, Response } from "express";
import {Types} from "mongoose";
const CommentModel = require("../models/comment");
const UserModel = require("../models/user");



async function getUserOr404(id: string) {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("400");
    }
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

        res.status(200).json(comment).send();
        return;
    } catch (error) {
        res.status(500).json({ error: "Server error." }).send();
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

        res.status(200).json(newComment).send();
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error." }).send();
        return;
    }
},

async deleteComment(req: Request, res: Response): Promise<void> {
    try {
        const id  = req.params.id;

        const comment = await CommentModel.findById(id).exec();

        if (!comment) {
            res.status(404).json({ error: "No such comment."}).send();
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

async likeComment(req: Request, res: Response): Promise<void> {
    try {
        const { id, idUser } = req.body;

        const comment = await CommentModel.findById(id).exec();
        

        if (!comment) {
            res.status(404).json({ error: "No such comment." }).send();
            return;
        }

        const user = await getUserOr404(idUser);   
        //const alreadyLiked = await user.likedComments.find() //todo sredi ovo  
        let likeNum = comment.likes;
        likeNum += 1;
        console.log(likeNum);

        const updateRes = await CommentModel.updateOne({_id: id}, {$set: { likes: likeNum }}).exec();
        console.log(updateRes);
        if (updateRes.modifiedCount == 0) {
            res.status(500).json({ error: "Server error. (Modified is zero)" }).send();
            return;
        }
        res.status(200).send();
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error." }).send();
        return;
    }
},



async unlikeComment(req: Request, res: Response): Promise<void> {
    try {
        const { id, idUser } = req.body;

        const comment = await CommentModel.findById(id).exec();

        if (!comment) {
            res.status(404).json({ error: "No such comment." }).send();
            return;
        }

        const user = await getUserOr404(idUser);      
       
        let likeNum = comment.likes;
        likeNum -= 1;
        if (likeNum < 0) likeNum = 0;
        const updateRes = await CommentModel.updateOne({_id: id}, { likes: likeNum }).exec();
        if (updateRes.modifiedCount == 0) {
            res.status(500).json({ error: "Modified error." }).send();
        }
    } catch (error) {
        res.status(500).json({ error: "Server error." }).send();
        return;
    }
}

}

module.exports = commentCtrl;