import {Request, Response} from 'express'; 
const Post = require ("../models/post.ts");
const User = require ( "../models/user.ts");


export async function getPost(req: Request, res: Response): Promise <void>
{
    try{
        const {ID} = req.body;

        const post = await Post.findById(ID).exec();
        if (post == null) {
            res.status(404).json({error: "No such post."});
            return;
        }   
        res.status(200).json(post);
        return;

    }
    catch(error)    {
        res.status(500).json({error: "Server error."});
        return;
    }

}

export async function createPost(req: Request, res: Response): Promise <void>
{
    try
    {
        const { Username, Text, Outfit, Published } = req.body;

        let foundUsername = await User.exists({username: Username}).exec();  
        
        if ( foundUsername == null ) {
            res.status(404).json({error: "No such user."});  
            return;
        }
        
        if (Text.length() > 128) {
            res.status(400).json({error: "Text too long."});
            return;
        }
        
        if (Outfit.top == null || Outfit.bottom == null || Outfit.shoes == null){
            res.status(400).json({error: "Outfit requires at least a top, a bottom, and footwear."});
            return;
        }
        
        const post = new Post(Username, Text, 0, null, 0.0, Outfit, Published);

        res.status(200).json(post);
        return;
    }
    catch(error)    {
        res.status(500).json({error: "Server error."});
        return;
    }
}


export async function like(req: Request, res: Response): Promise <void>
{
    try
    {
        const {ID} = req.body;

        let foundPost = await Post.find({_id: ID}).exec();  
        if ( foundPost == null ) {
            res.status(404).json({error: "No such user."});  
            return;
        }

        var likeNumber = foundPost.likes;
        likeNumber++;

        const updateRes = await foundPost.updateOne({likes: likeNumber});
        if (updateRes.upsertedCount == 0 ) {
            (res.status(500).json({error: "Server error."})); 
            return;
        }
    }
    catch(error)
    {
        res.status(500).json({error: "Server error."});
        return;
    }
}

export async function unlike(req: Request, res: Response): Promise <void>
{
    try
    {
        const {ID} = req.body;

        let foundPost = await Post.find({_id: ID}).exec();  
        if ( foundPost == null ) { 
            res.status(404).json({error: "No such user."});
            return;
        }  
        //  TODO cuvanje lajkovanih postova

        let likeNumber = foundPost.likes;
        likeNumber--;

        const updateRes = await foundPost.updateOne({likes: likeNumber});
        if (updateRes.upsertedCount == 0 ) { 
            res.status(500).json({error: "Server error."}); 
            return;
        }

    }
    catch(error)
    {
        res.status(500).json({error: "Server error."});
        return;
    }
}


export async function addComment(req: Request, res: Response): Promise <void>
{
    try
    {
        const {ID, Comment} = req.body;

        let post = await Post.find({_id: ID}).exec();  
        if ( post == null ) { 
            res.status(404).json({error: "No such user."});  
            return;
        }

        const newPost = await post.Update( {$push: { comments: Comment } }, { new: true })
        if(newPost == null) {
            res.status(500).json({error: "Server error."});
            return;
        }

        res.status(200).json(post);
        return;
    }
    catch(error){
        res.status(500).json({error: "Server error."});
        return;
    }
}

export async function addGrade(req: Request, res: Response): Promise <void>
{
    try
    {
        const {ID, Grade} = req.body;

        let post = await Post.findByID(ID).exec();  
        if ( post == null ) {
            res.status(404).json({error: "No such user."});  
            return;
        }

        const newPost = await post.Update( {$push: { grade: Grade } }, { new: true })
        if (newPost == null) {
            res.status(500).json({error: "Server error."});
            return;
        }

        res.status(200).json(post);
        return;
    }
    catch(error){
        res.status(500).json({error: "Server error."});
        return;
    }
}


export async function publish(req: Request, res: Response): Promise <void> 
{
    try
    {
        const {ID, Username, Published} = req.body;

        let foundPost = await Post.find({_id: ID, username: Username}).exec();  
        if ( foundPost == null ) {
            res.status(404).json({error: "No such post from this user."});  
            return;
        }

        if (Published == true) {
            res.status(500).json({error: "Post already published."});
        }

        const updateRes = await foundPost.updateOne({publish: true});
        if (updateRes.upsertedCount == 0 )  {
            res.status(500).json({error: "Server error."});
            return;
        }
    }
    catch(error)
    {
        res.status(500).json({error: "Server error."});
        return;
    }
}

export async function unpublish(req: Request, res: Response): Promise <void>  
{
    try
    {
        const {ID, Username, Published} = req.body;

        let foundPost = await Post.find({_id: ID, username: Username}).exec();  
        if ( foundPost == null ) {
            res.status(404).json({error: "No such post from this user."});  
            return;
        }
        
        if (Published == false) {
            res.status(500).json({error: "Post already private."});
        }

        const updateRes = await foundPost.updateOne({publish: false});
        if (updateRes.upsertedCount == 0 )  {
            res.status(500).json({error: "Server error."});
            return;
        }
    }
    catch(error)
    {
        res.status(500).json({error: "Server error."});
        return;
    }
}



export async function removeComment(req: Request, res: Response): Promise <void>  
{
    try
    {
        const {PostID, Username, Comment} = req.body;
        let foundPost = await Post.find({_id: PostID, username: Username, comment: Comment}).exec();  
        if ( foundPost == null ) {
            res.status(404).json({error: "No such comment from this user on this post."});  
            return;
        }  



    }
    catch(error)
    {
        res.status(500).json({error: "Server error."});
        return;
    }
}


export async function deletePost(req: Request, res: Response): Promise <void>  
{
    try
    {
        const {ID, Username, Published} = req.body;

        let foundPost = await Post.find({_id: ID, username: Username}).exec();  
        if ( foundPost == null ) {
            res.status(404).json({error: "No such post from this user."});  
            return;
        }
        
        if (Published == false) {
            res.status(500).json({error: "Post already private."});
        }

        const updateRes = await foundPost.updateOne({publish: false});
        if (updateRes.upsertedCount == 0 )  {
            res.status(500).json({error: "Server error."});
            return;
        }
    }
    catch(error)
    {
        res.status(500).json({error: "Server error."});
        return;
    }
}