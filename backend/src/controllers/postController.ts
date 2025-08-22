import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { PostModel } from "../models/post.ts";
import { UserModel } from "../models/user.ts";
import { Types } from "mongoose";

async function getPostOr404(id: string) {
    if (!Types.ObjectId.isValid(id)) {
        throw { status: 400, message: "Invalid post ID." };
    }
    const post = await PostModel.findById(id).exec();
    if (!post) {
        throw { status: 404, message: "Post not found." };
    }
    return post;
}

/*
export const getPost = asyncHandler(async (req: Request, res: Response) => {
    const { ID } = req.body;
    const post = await getPostOr404(ID);
    res.json(post);
}); 
*/
export async function getPost (req: Request, res: Response) {
    try{
        const { ID } = req.body;
        const post = await getPostOr404(ID);
        
        res.status(200).json(post).send();
        return;
    } 
    catch(error) {

        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "Post not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;
    }
}; 

export async function createPost(req: Request, res: Response) {
    try {
        const { Username, Text, Outfit } = req.body;

        const user = await UserModel.findOne({ username: Username }).exec();
        if (!user) {
            throw { status: 404, message: "No such user." };
        }

        if (Text && Text.length > 128) {
            throw { status: 400, message: "Text too long." };
        }

        if (Outfit.garments.length == 0)
            throw {status: 400, message: "No garments in outfit."}
        

        const post = await PostModel.create({   //TODO fix creates
            user: user._id,
            text: Text,
            outfit: Outfit,
            published: false,
        });

        res.status(201).json(post);
        return;
    }   
    catch(error) {

        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "Post not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;
    }
};

export async function like(req: Request, res: Response) {
    try{
        const { ID } = req.body;
        const post = await getPostOr404(ID);

        post.likes++;
        await post.save();

        res.status(202).json({ likes: post.likes }).send();
    }
    catch(error) {

        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "Post not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;
    }
};

export async function unlike(req: Request, res: Response){
    try{
        const { ID } = req.body;
        const post = await getPostOr404(ID);

        post.likes = Math.max(0, post.likes - 1);
        await post.save();

        res.status(202).json({ likes: post.likes }).send();

    }
    catch(error) {

        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "Post not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;   
    
    }
};

export async function addComment(req: Request, res: Response){
    try{
        const { ID, Comment } = req.body;
        const post = await getPostOr404(ID);

        post.comments.push(Comment);
        await post.save();

        res.status(203).json({comment: Comment}).send();
        return;

    } 
    catch(error) {

        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "Post not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;    
    }

};

export async function addGrade(req: Request, res: Response) {
    try {
        const { ID, Grade } = req.body;
        const post = await getPostOr404(ID);

        post.grades.push(Grade);
        await post.save();

        res.status(204).json({grade: Grade}).send();
        return;

    }
    catch(error) {

        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "Post not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;  
    }
};

export async function publish (req: Request, res: Response) {
    
    try {
        const { ID } = req.body;
        const post = await getPostOr404(ID);

        if (post.published) {
            throw { status: 400, message: "Post already published." };
        }

        post.published = true;
        await post.save();

        res.status(205).json({Comment}).send();
        return;
    }
    catch(error){

        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "Post not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;   
    }
};

export async function unpublish (req: Request, res: Response) {
    try{
        const { ID } = req.body;
        const post = await getPostOr404(ID);

        if (!post.published) {
            throw { status: 400, message: "Post already private." };
        }

        post.published = false;
        await post.save();

        res.status(205).send();
        
        return;
    }
    catch (error) {

        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "Post not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;
    }
};

export async function deletePost (req: Request, res: Response) {
    try{
        const { ID } = req.body;
        const post = await getPostOr404(ID);

        await post.deleteOne();
        res.status(206).send();  //TODO
        
        return;
    }
    catch (error)
    {
        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "Post not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;
    
    }
};
