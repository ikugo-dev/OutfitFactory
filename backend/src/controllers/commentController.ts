import {Request, Response} from 'express'; 
import Comment from './models/comment.ts';
import User from './models/user.ts';


export async function getComment(req: Request, res: Response): Promise <void>  
{
    try 
    {
        const { ID } = req.body;
        const comment = await Comment.findById(ID).exec();

        if (!comment) {
            res.status(404).json({error: "No such comment."});
            return;
        }
        
        res.status(200).json(comment);
        return;
    }
    catch (error) {
        res.status(500).json({error: "Server error."});
        return;
    }
} 

export async function createComment(req: Request, res: Response): Promise<void>
{
    try
    {
        const { Username, Text } = req.body;
        
        let foundUsername = await User.exists({username: Username}).exec();  
        if ( foundUsername != null ){ 
            res.status(400).json({error: "Username already taken."});  
            return;
        }   
        const newComment = new Comment(Username, Text, 0);

        if (newComment == null){
            res.status(400).json({error: "User creation error."});
            return;
        }

        res.status(200).json(newComment);
        return;

    }
    catch(error){
        res.status(500).json({error: "Server error."});
        return; 
    }

}

export async function deleteComment(req: Request, res: Response) : Promise<void> 
{
    try
    {
        const { ID } = req.body;

        const comment = await Comment.findById(ID).exec(); 

        if (!comment){
            res.status(404).json({error: "No such comment."});
            return;
        }
        
        const deleteRes = await Comment.deleteOne({ _id: ID });
        if (deleteRes.deletedCount == 0 ){
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


export async function likeComment(req: Request, res: Response) : Promise<void> 
{
    try
    {
        const { ID, Username } = req.body;

        const comment = await Comment.findById(ID).exec();

        if (! comment) {
            res.status(404).json({error: "No such comment."});
            return;
        }
        
        const user = await User.find({username: Username}).exec();
        if ( !user ) {
            res.status(400).json({error: "No such user."}); 
            return;
        }
        
        var likeNumber = comment.likes;
        likeNumber++;

        const updateRes = await comment.updateOne({ likes: likeNumber});
        if (updateRes.upsertedCount == 0 )  {
            res.status(500).json({error: "Server error."}); 
        }
    }
    catch(error){
        res.status(500).json({error: "Server error."}); 
        return;
    }

}
