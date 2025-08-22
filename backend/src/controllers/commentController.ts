import { Request, Response } from "express";
import {CommentModel} from "../models/comment.ts";
import {UserModel} from "../models/user.ts";

export async function getComment(req: Request, res: Response): Promise<void> {
    try {
        const { ID } = req.body;
        const comment = await CommentModel.findById(ID).exec();

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
}

export async function createComment( req: Request, res: Response): Promise<void> {
    try {
        const { Username, Text } = req.body;

        let foundUsername = await UserModel.exists({ username: Username }).exec();
        if (foundUsername != null) {
            res.status(400).json({ error: "Username already taken." });
            return;
        }
        const newComment = new CommentModel({username: Username, text: Text, likes: 0});

        if (newComment == null) {
            throw new Error();
        }
        res.status(200).json(newComment).send();
        return;

    } catch (error) {
        res.status(500).json({ error: "Server error." }).send();
        return;
    }
}

export async function deleteComment(req: Request, res: Response): Promise<void> {
    try {
        const { ID } = req.body;

        const comment = await CommentModel.findById(ID).exec();

        if (!comment) {
            res.status(404).json({ error: "No such comment."}).send();
            return;
        }

        const deleteRes = await CommentModel.deleteOne({ _id: ID });
        if (deleteRes.deletedCount == 0) {
            throw new Error();
            return;
        }
    } catch (error) {
        res.status(500).json({ error: "Server error." });
        return;
    }
}

export async function likeComment(req: Request, res: Response): Promise<void> {
    try {
        const { ID, Username } = req.body;

        const comment = await CommentModel.findById(ID).exec();

        if (!comment) {
            res.status(404).json({ error: "No such comment." }).send();
            return;
        }

        const user = await UserModel.find({ username: Username }).exec();
        if (!user) {
            res.status(400).json({ error: "No such user." }).send();
            return;
        }
        
        comment.likes++;

        const updateRes = await comment.updateOne({_id: ID}, { likes: comment.likes }).exec();
        if (updateRes.upsertedCount == 0) {
            res.status(500).json({ error: "Server error." }).send();
        }
    } catch (error) {
        res.status(500).json({ error: "Server error." }).send();
        return;
    }
}
