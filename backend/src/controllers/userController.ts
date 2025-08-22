import {Request, Response} from 'express'; 
import { PostModel } from "../models/post.ts";
import { UserModel } from "../models/user.ts";
import { Types } from "mongoose";


async function getUserOr404(id: string) {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("400");
    }
    const user = await UserModel.findById(id).exec();
    if (!user) { //TODO FIX THIS
        throw Error("404");
    }
    return user;
}

export async function getUser(req: Request, res: Response): Promise <void> 
{
    try {
        const { ID } = req.body;
        const user = await getUserOr404(ID);
        
        res.status(200).json(user).send(); //TODO json returns
        return;
    }
    catch (error) {
        
        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "User not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;
    
    }
} 

export async function createUser(req: Request, res: Response): Promise<void>
{
    try {
        const { Username, Email, Password } = req.body;
        
        const foundUsername = await UserModel.exists({username: Username}).exec();  
        if ( foundUsername != null ){ 
            res.status(400).json({error: "Username already taken."}).send();  
            return;
        }   

        let foundEmail = await UserModel.exists({email: Email}).exec();  
        if ( foundEmail != null ) {
            res.status(400).json({error: "Account with this email address already exists."}).send();  
            return;
        }

        const newUser = new UserModel(Username, Email, Password);

        if (newUser == null){
            res.status(400).json({error: "User creation error."}).send();
            return;
        }

        res.status(200).json(newUser).send();
        return;

    }
    catch(error) {
        
        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "User not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;
    ; 
    }

}

export async function getPosts(req: Request, res: Response): Promise <void> 
{
    try {
        const { ID } = req.body;
        const user = await getUserOr404(ID);
        
        if (user.posts.length == 0) {
            res.status(404).json({error: "No posts."}).send();
            return;
        }

        res.status(200).json(user.posts).send();
        return;
    }
    catch (error) {
        
        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "User not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;
    
    }
} 


export async function removeUser(req: Request, res: Response) : Promise<void> 
{
    try {
        const { ID } = req.body;

        const user = await getUserOr404(ID) ;
        
        const deleteRes = await user.deleteOne();
        if (deleteRes.deletedCount == 0 ){
            res.status(501).json({error: "Server error."}).send(); 
            return;
        }
    }
    catch(error) {
        
        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "User not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;
    
    }

}


export async function updateUsername(req: Request, res: Response) : Promise<void> 
{
    try
    {
        const { ID, newUsername } = req.body;

        const user = await getUserOr404(ID);

        const foundUsername = await UserModel.exists({username: newUsername}).exec();  
        if ( foundUsername != null ) {
            res.status(400).json({error: "Username already taken."}).send();    //fix throws

            return;
        }  
        const updateRes = await UserModel.updateOne({ _id: ID },  {$set: { username: newUsername}} );
        if (updateRes.upsertedCount == 0 )  {
            res.status(501).json({error: "Server error."}). send(); 
        }
    }
    catch(error){
            
        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "User not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;
    
    }

}


export async function updatePassword(req: Request, res: Response) : Promise<void> 
{
    try {
        const {ID, oldPassword, newPassword } = req.body;

        const user = await getUserOr404(ID);

        if (oldPassword != user.password) {
            res.status(400).json({error: "Wrong password."}).send();
        }
            
        const updateRes = await UserModel.updateOne({ _id: ID },  {$set: { password: newPassword}}); //TODO set
        if (updateRes.upsertedCount == 0 ) { 
            res.status(500).json({error: "Server error."}).send();
            return;
        }
    }
    catch(error){
        
        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "User not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;
     
    }
}

export async function updateAvatar(req: Request, res: Response) : Promise<void> 
{
    try{
        const {ID, newAvatar } = req.body;

        const user = await getUserOr404(ID);

        const updateRes = await UserModel.updateOne({ _id: ID },  {$set: { avatar: newAvatar}}).exec();
        if (updateRes.upsertedCount == 0 )  {
            res.status(500).json({error: "Server error."}).send();
            return;
        }
   
    } catch(error)
    {
        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "User not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;
    
    }
}

export async function removeAvatar(req: Request, res: Response) : Promise<void> 
{
    try {
        const {ID} = req.body;

        const user = await getUserOr404(ID);

        const updateRes = await user.updateOne({_id: ID}, {$set: { avatar: "https://cdn-icons-png.flaticon.com/512/53/53101.png" }}).exec();
        if (updateRes.upsertedCount == 0 ) {
            res.status(500).json({error: "Server error."}).send();
            return;
        }   
    }
    catch(error)
    {
        
        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "User not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;
     
    }
}


export async function addPost(req: Request, res: Response) : Promise<void> 
{
    try
    {
        const {ID, PostID} = req.body;

        const user = await getUserOr404(ID);

        const post = await PostModel.findById(PostID).exec();

        const updateRes = await UserModel.updateOne({_id: ID}, { $push: {posts : PostID}}).exec(); //TODO exec
        if (updateRes.upsertedCount == 0 ) {
            res.status(500).json({error: "Server error."}).send();
            return;
        }   
    }
    catch(error)
    {
        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "User not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;
    
    }
}

export async function follow(req: Request, res: Response) : Promise<any> 
{
    try
    {
        const {Username, UsernameToFollow } = req.body;

        const user = await UserModel.find({username: Username, following : {$nin : [UsernameToFollow]}}).exec();
        const userToFollow = await UserModel.find({username: UsernameToFollow}).exec();
        
        if (!user || !userToFollow)  {
            res.status(404).json({error: "No such user."}).send(); 
            return;
        }

        const updateRes = await UserModel.updateOne({username: Username}, {$push: { following: userToFollow } }).exec();
        const updateRes2= await UserModel.updateOne({username: UsernameToFollow}, {$push: { followers: user } }).exec();
        
        if(updateRes.upsertedCount == 0 || updateRes2.upsertedCount == 0) {
            res.status(500).json({error: "Server error."}).send();
            return;
        }
    }
    catch(error)
    {  
        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "User not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;
    
    }
}


export async function unfollow(req: Request, res: Response) : Promise<any> 
{
    try
    {
        const {UserID, IDToUnfollow } = req.body;

        const user = await UserModel.find({_id : UserID , following : {$nin : [IDToUnfollow]}}).exec();
        if (!user)  {
            res.status(404).json({error: "No such user."}).send(); 
            return;
        }
        const userToUnfollow = await getUserOr404(IDToUnfollow);
        

        const newUser = await UserModel.updateOne( {_id : UserID}, {$pull: { following: IDToUnfollow } }).exec();  //TODO SREDI ovo i gornju
        const newUserToUnfollow = await UserModel.updateOne( {_id: IDToUnfollow}, {$pull: {followers: UserID } }).exec();

        if (newUser.upsertedCount == 0 || newUserToUnfollow)
             throw Error;
            
    }
    catch(error)
    {
        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "User not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;
     
    }
}

