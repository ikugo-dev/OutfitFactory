import { Request, Response } from 'express';
import { Types } from "mongoose";

const PostModel = require("../models/post");
const UserModel = require("../models/user");
const OutfitModel = require("../models/outfit");
const CommentModel = require("../models/comment");
const GradeModel = require("../models/grade");

async function getPostOr404(id: string) {
    // if (!Types.ObjectId.isValid(id)) {
    //     throw { status: 400, message: "Invalid post ID." };
    // }
    const post = await PostModel.findById(id).exec();
    if (!post) {
        console.log(id);
        throw { status: 404, message: "Post not found." };
    }
    return post;
}

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


const postCtrl = {

async getPost (req: Request, res: Response) : Promise <void> {
    try{
        const id = req.params.id;
        if (!id) throw Error("400");
        const post = await getPostOr404(id);
        
        res.status(200).json(post);
        return;
    } 
    catch(error) {

        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "Post not found."}); return;
        }
        
        res.status(500).json({message: "Server error."}); return;
    }
},

async getPosts (req: Request, res: Response) : Promise <void> {
    try{
        const userId = !req.query.userId
            ? "" 
            : req.query.userId;
        let filter = {};
        if (userId != "") {
            const user = await getUserOr404(userId as string)
            if (!user) {
                res.status(400).json({message: "User not found"})
            }
            filter = { user: { $in: user.following } }
        }
        const posts = await PostModel
            .find(filter)
            .populate({
                path: "user",
                select: "_id username avatar",
            })
            .sort({ createdAt: -1 })
            .exec();
        res.status(200).json(posts);
        return;
    } 
    catch(error) {
        res.status(500).json({message: `Server error. ${error}`}); return;
    }
},

async createPost(req: Request, res: Response) : Promise <void> {
    try {
        const { id, text, outfitId} = req.body;
        
        const user = await getUserOr404(id);

        if (text.length > 128) { //potencijalno nebitno
            throw { status: 400, message: "Text too long." };
        }
        let textStr = text.toString();
        const outfit = await OutfitModel.findById(outfitId);  
        if (!outfit) {
            throw { status: 404, message: "No such outfit." };
        }
        
        const post = await PostModel.create({   
            user: id,
            text: textStr,
            outfit: outfitId,
        });
        
        const updateRes = await UserModel.updateOne({_id: id}, { $push: {posts : post._id}}).exec();
        if (updateRes.modifiedCount == 0 ) {
            res.status(500).json({error: "Server error."});
            return;
        }   
        res.status(201).json(post);
        return;
    }   
    catch(error) {
        console.log(error);
        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "Post not found."}); return;
        }
        
        res.status(500).json({message: "Server error."}); return;
    }
},

async like(req: Request, res: Response): Promise <void> { 
    try{
        const { id, userId } = req.body;
        console.log(id, userId);
        const post = await getPostOr404(id);
        const user = await getUserOr404(userId);

        const findRes = await PostModel.find({likers: userId}).exec();
        if(findRes.length != 0){
            res.status(400).json({message: "Already liked."}); return;
        }


        let newLikes = new Number(post.likes +1);
        const updateRes = await PostModel.updateOne({_id: id}, {$set: {likes: newLikes}});
        const updateRes2 = await PostModel.updateOne({_id: id}, {$push: {likers: userId}});

        if (updateRes.modifiedCount == 0 || updateRes2.modifiedCount == 0){
            res.status(500).json({message: "Server error. (Update error)"}); return;
        }

        res.status(200).json(newLikes);
        return;
    }
    catch(error) {

        console.log(error);
        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "Post not found."}); return;
        }
        
        res.status(500).json({message: "Server error."}); return;
    }
},

async unlike(req: Request, res: Response) : Promise <void>{
    try{
        const { id, userId } = req.body;
        console.log(id, userId);
        const post = await getPostOr404(id);
        const user = await getUserOr404(userId);

        const findRes = await PostModel.find({likers: userId}).exec();
        if(findRes.length == 0){
            res.status(400).json({message: "Not liked."}); return;
        }

        let newLikes;
        if (post.likes-1 < 0) newLikes = new Number(0);
        else newLikes = new Number(post.likes-1);

        const updateRes = await PostModel.updateOne({_id: id}, {$set: {likes: newLikes}});
        const updateRes2 = await PostModel.updateOne({_id: id}, {$pull: {likers: userId}});

        if (updateRes.modifiedCount == 0 || updateRes2.modifiedCount == 0){
            res.status(500).json({message: "Server error. (Update error)"}); return;
        }

        res.status(200).json(newLikes);
        return;
    }
    catch(error) {

        console.log(error);
        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "Post not found."}); return;
        }
        
        res.status(500).json({message: "Server error."}); return;
    }
},

async addComment(req: Request, res: Response) : Promise <void>{
    try{
        const { id, commentId } = req.body;
        const post = await getPostOr404(id);
        const comment = await CommentModel.findById(commentId);
        if (!comment) throw Error("404");

        const updateRes = await PostModel.updateOne({_id: id}, {$push: {comments: commentId}}).exec();
        console.log(updateRes);
        if (updateRes.modifiedCount == 0) throw Error("500");
        res.status(200);
        return;

    } 
    catch(error) {
        console.log(error);

        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}); return;
        }
        if (error instanceof Error && error.message == "404"){
            res.status(404).json({message: "Post not found."}); return;
        }
        
        res.status(500).json({message: "Server error."}); return;    
    }

},

async addGrade(req: Request, res: Response) : Promise <void> {
    try {
        const { id, gradeId } = req.body;
        const post = await getPostOr404(id);
        
        const grade = await GradeModel.findById(gradeId);
        if (!grade) throw Error("404");

        const updateRes = await PostModel.updateOne({_id: id}, {$push: {grades: gradeId}}).exec();
        if (updateRes.modifiedCount ==0) throw Error("500");
        res.status(200) ;
        return;

    }
    catch(error) {

        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "Post not found."}); return;
        }
        
        res.status(500).json({message: "Server error."}); return;  
    }
},

/*
async publish (req: Request, res: Response) : Promise <void> {
    
    try {
        const { id } = req.body;
        const post = await getPostOr404(id);

        if (post.published) throw Error("400");


        const updateRes = await PostModel.updateOne({_id: id}, {$set: {published: true}}).exec();
        if (updateRes.modifiedCount == 0) throw Error("500");

        res.status(200);
        return;
    }
    catch(error){

        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Post already public."}); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "Post not found."}); return;
        }
        
        res.status(500).json({message: "Server error."}); return;   
    }
},

async unpublish (req: Request, res: Response) : Promise <void> {
    try{
        const { id } = req.body;
        const post = await getPostOr404(id);

        if (!post.published) throw Error("400");

        const updateRes = await PostModel.updateOne({_id: id}, {$set: {published: false}}).exec();
        if (updateRes.modifiedCount == 0) throw Error("500");
        res.status(200);
        
        return;
    }
    catch (error) {

        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Post already private."}); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "Post not found."}); return;
        }
        
        res.status(500).json({message: "Server error."}); return;
    }
},
*/
async deletePost (req: Request, res: Response) : Promise <void> {
    try{
        const id  = req.params.id;
        if (!id) throw Error("400");
        const post = await getPostOr404(id);

        const deleteRes = await PostModel.deleteOne({_id: id});
        if (deleteRes.modifiedCount == 0) throw Error("500");

        res.status(200);  
        
        return;
    }
    catch (error)
    {
        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "Post not found."}); return;
        }
        
        res.status(500).json({message: "Server error."}); return;
    
    }
}

}

module.exports = postCtrl;
