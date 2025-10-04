import { Request, Response } from 'express';
import { Types } from "mongoose";

const PostModel = require("../models/post");
const UserModel = require("../models/user");
const OutfitModel = require("../models/outfit");
const CommentModel = require("../models/comment");
const GradeModel = require("../models/grade");

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

const postCtrl = {

async getPost (req: Request, res: Response) : Promise <void> {
    try{
        const id = req.params.id;
        if (!id) throw Error("400");
        const post = await getPostOr404(id);
        
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
},

async createPost(req: Request, res: Response) : Promise <void> {
    try {
        const { id, text, outfitId } = req.body;
         
        const user = await UserModel.findById(id).exec();
        if (!user) {
            throw { status: 404, message: "No such user." };
        }

        if (text.length > 128) {
            throw { status: 400, message: "Text too long." };
        }
        let textStr = text.toString();
        const outfit = await OutfitModel.findById(outfitId);  
        if (!outfit) {
            throw { status: 404, message: "No such outfit." };
        }
        if (outfit.garments.length == 0)
            throw {status: 400, message: "No garments in outfit."}
        
        console.log("aaa");

        const post = await PostModel.create({   
            user: id,
            text: textStr,
            outfit: outfitId,
            published: false,
        });
        
        
        res.status(201).json(post).send();
        return;
    }   
    catch(error) {
        console.log(error);
        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "Post not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;
    }
},

async like(req: Request, res: Response): Promise <void> {
    try{
        const { id } = req.body;
        const post = await getPostOr404(id);

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
},

async unlike(req: Request, res: Response) : Promise <void>{
    try{
        const { id } = req.body;
        const post = await getPostOr404(id);

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
},

async addComment(req: Request, res: Response) : Promise <void>{
    try{
        const { id, commentId } = req.body;
        const post = await getPostOr404(id);
        const comment = await CommentModel.findById(commentId);
        if (!comment) throw Error("404");

        const updateRes = PostModel.updateOne({_id: id}, {$push: {comments: commentId}});
        if (updateRes.modifiedCount ==0) throw Error("500");
        res.status(200).send();
        return;

    } 
    catch(error) {
        console.log(error);

        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "Post not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;    
    }

},

async addGrade(req: Request, res: Response) : Promise <void> {
    try {
        const { id, gradeId } = req.body;
        const post = await getPostOr404(id);
        
        const grade = await GradeModel.findById(gradeId);
        if (!grade) throw Error("404");

        const updateRes = PostModel.updateOne({_id: id}, {$push: {grades: gradeId}});
        if (updateRes.modifiedCount ==0) throw Error("500");
        res.status(200) .send();
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
},

async publish (req: Request, res: Response) : Promise <void> {
    
    try {
        const { id } = req.body;
        const post = await getPostOr404(id);

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
},

async unpublish (req: Request, res: Response) : Promise <void> {
    try{
        const { id } = req.body;
        const post = await getPostOr404(id);

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
},

async deletePost (req: Request, res: Response) : Promise <void> {
    try{
        const id  = req.params.id;
        if (!id) throw Error("400");
        const post = await getPostOr404(id);

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
}

}

module.exports = postCtrl;
