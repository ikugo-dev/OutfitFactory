import {Request, Response} from 'express'; 
import { Types } from "mongoose";

const UserModel = require("../models/user");
const PostModel = require("../models/post");
const GarmentModel = require("../models/garment");

async function getUserOr404(id: string) {
    // if (!Types.ObjectId.isValid(id)) {
    //     throw new Error("400");
    // }
    console.log("getUserOr404 → id:", id);
    const user = await UserModel.findById(id).exec();

    if (!user) { 
        throw Error("404");
    }
    return user;
}

const userCtrl = {

async getUser(req: Request, res: Response): Promise <void> 
{
    try {
        const id = req.params.id;  //username
        console.log(id);    
        if(!id) throw Error("404");
        const user = await getUserOr404(id);
        
        res.status(200).json(user).send(); //todo json returns
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
},

async createUser(req: Request, res: Response): Promise<void>
{
    try {
        const { username, email, password } = req.body;
        if (!username || !email  || !password){
            res.status(400).json({error: "JSON body is empty."}).send();
        }

        const foundUsername = await UserModel.exists({username: username}).exec();  
        if ( foundUsername != null ){ 
            res.status(400).json({error: "Username already taken."}).send();  
            return;
        }   

        let foundEmail = await UserModel.exists({email: email}).exec();  
        if ( foundEmail != null ) {
            res.status(400).json({error: "Account with this email address already exists."}).send();  
            return;
        }

        const newUser = new UserModel({username, email, password});
        
        if (newUser == null){
            res.status(400).json({error: "User creation error."}).send();
            return;
        }
        await newUser.save();

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

},

async getPosts(req: Request, res: Response): Promise <void> 
{
    try {
        const id  = req.params.id; 
        if(!id) throw Error("404");
        const user = await getUserOr404(id);
        
        if (user.posts.length == 0) {
            res.status(404).json({error: "No posts."}).send();
            return;
        }

        const posts = await PostModel.find({ _id: { $in: user.posts } });
        res.status(200).json(posts).send();
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
},


async removeUser(req: Request, res: Response) : Promise<void> 
{
    try {
        const id  = req.params.id;
        if (!id) throw Error("404");
        const user = await getUserOr404(id) ;
        
        const deleteRes = await user.deleteOne();
        if (deleteRes.deletedCount == 0 ){
            res.status(501).json({error: "Server error."}).send(); 
            return;
        }
        res.status(200).send();
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
    
    }

},


async updateUsername(req: Request, res: Response) : Promise<void> 
{
    try
    {
        const { id, newUsername } = req.body;
        console.log(id, newUsername);
        const user = await getUserOr404(id);

        const foundUsername = await UserModel.exists({username: newUsername}).exec();  
        if ( foundUsername != null ) {
            res.status(400).json({error: "Username already taken."}).send();   

            return;
        }  
        const updateRes = await UserModel.updateOne({ _id: id },  {$set: { username: newUsername}}).exec();
        if (updateRes.modifiedCount == 0 )  {
            res.status(501).json({error: "Server error."}).send(); return;
        }
        res.status(200).send();
        return;
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

},


async updatePassword(req: Request, res: Response) : Promise<void> 
{
    try {
        const {id, oldPassword, newPassword } = req.body;
        //console.log(oldPassword, newPassword);
        const user = await getUserOr404(id);

        if (oldPassword != user.password) {
            res.status(400).json({error: "Wrong password."}).send(); return;
        }
            
        const updateRes = await UserModel.updateOne({ _id: id }, {$set: { password: newPassword}}).exec();
        if (updateRes.modifiedCount == 0 ) { 
            res.status(500).json({error: "Server error."}).send();
            return;
        }
        res.status(200).send();
        return;
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
},

async updateAvatar(req: Request, res: Response) : Promise<void> 
{
    try{
        const {id, newAvatar } = req.body;  //todo sredi da lice na json 

        const user = await getUserOr404(id);

        const updateRes = await UserModel.updateOne({ _id: id },  {$set: { avatar: newAvatar}}).exec();
        if (updateRes.modifiedCount == 0 )  {
            res.status(500).json({error: "Server error."}).send();
            return;
        }
        res.status(200).send();
        return;
   
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
},

async removeAvatar(req: Request, res: Response) : Promise<void> 
{
    try {
        const {id} = req.body;

        const user = await getUserOr404(id);

        const updateRes = await UserModel.updateOne({_id: id}, {$set: { avatar: "https://cdn-icons-png.flaticon.com/512/53/53101.png" }}).exec();
        if (updateRes.modifiedCount == 0 ) {
            res.status(500).json({error: "Server error. (Modified is zero)"}).send();
            return;
        }   
        res.status(200).send();
        return;
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
},


async follow(req: Request, res: Response) : Promise<any> 
{
    try
    {
        const {id, idToFollow } = req.body;

        const user = await getUserOr404(id);
        const userToFollow = await getUserOr404(idToFollow);

        if (user.following.find((id: string) => id == idToFollow)) throw Error("401");
        if (userToFollow.following.find((id: string)=> id == id)) throw Error("401");
        
        console.log("proslo")

        const updateRes = await UserModel.updateOne({_id: id}, {$push: { following: userToFollow._id } }).exec();
        const updateRes2= await UserModel.updateOne({_id: idToFollow}, {$push: { followers: user._id } }).exec();
        
        if(updateRes.modifiedCount == 0 || updateRes2.modifiedCount == 0) {
            res.status(500).json({error: "Server error. (Modified is zero)"}).send();
            return;
        }
        res.status(200).send();
        return;
    }
    catch(error)
    {  
        console.log(error);
        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "User error."}).send(); return;
        }
        if (error instanceof Error && error.message == "401"){
            res.status(400).json({message: "Already following each other."}).send(); return;
        }
        
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "User(s) not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;
    
    }
},


async unfollow(req: Request, res: Response) : Promise<any> 
{
    try
    {
        const {id, idToUnfollow } = req.body;

        const user = await getUserOr404(id);
        const userToUnfollow = await getUserOr404(idToUnfollow);

        if (user.following.find((id: string) => id == idToUnfollow) == undefined) throw Error("401");
        if (userToUnfollow.followers.find((id: string)=> id == id) == undefined) throw Error("401");
        
        const updateRes = await UserModel.updateOne( {_id : id}, {$pull: { following: idToUnfollow } }).exec();  
        const updateRes2 = await UserModel.updateOne( {_id: idToUnfollow}, {$pull: {followers: id } }).exec();

        if (updateRes.modifiedCount == 0 || updateRes2.modifiedCount == 0)
             throw Error("500");
            
    }
    catch(error)
    {
        console.log(error);
        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "User error."}).send(); return;
        }
        if (error instanceof Error && error.message == "401"){
            res.status(400).json({message: "Not following each other."}).send(); return;
        }
        
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "User not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;
     
    }
},

async getFollowers(req: Request, res: Response): Promise <void> 
{
    try {
        const id = req.params.id;
        if (!id) throw Error("404");
        const user = await getUserOr404(id);
        
        if (user.followers.length == 0) {
            res.status(404).json({error: "No followers."}).send();
            return;
        }

        res.status(200).json(user.followers).send();
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
},


async getFollowing(req: Request, res: Response): Promise <void> 
{
    try {
        const id = req.params.id;
        if (!id) throw Error("404");
        const user = await getUserOr404(id);
        
        if (user.following.length == 0) {
            res.status(404).json({error: "No following."}).send();
            return;
        }

        res.status(200).json(user.following).send();
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
},

async getCloset(req: Request, res: Response): Promise<void>
{
    try {
        const id = req.params.id;
        if (!id) throw Error("404");
        const user = await getUserOr404(id);
        
        if (user.closet.length == 0) {
            res.status(404).json({error: "No clothes in closet."}).send();
            return;
        }

        res.status(200).json(user.closet).send();
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
},



async addToCloset(req: Request, res: Response): Promise <void> { //--
    try{
        const {id, garmentId} = req.body;
        const garment = await GarmentModel.findById(garmentId).exec();
        const user = await getUserOr404(id);
        console.log(garment, garmentId);
        if (!garment) {
            res.status(404).json({error: "No such garment."});
            return;
        }
        
        const updateRes = await UserModel.updateOne({_id : id}, { $push: {closet: garmentId } }).exec();
        if(updateRes.modifiedCount == 0) {
            res.status(500).json({error: "Modified error."}).send();  
            return;
        }

        res.status(200).json(garment);
        return;
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."}).send();
    }
},


async removeFromCloset(req: Request, res: Response): Promise <void> { //--
    try{
        const {id, garmentId} = req.body;
        const garment = await GarmentModel.findById(garmentId).exec();
        const user = await getUserOr404(id);

        if (!garment) {
            res.status(404).json({error: "No such garment."});
            return;
        }
        
        const updateRes = await UserModel.updateOne({_id : id}, { $pull: {closet: garmentId } }).exec(); //provera prvo?
        if(updateRes.modifiedCount == 0) {
            res.status(500).json({error: "Modified error."}).send();
            return;
        }

        res.status(200).json(garment);
        return;
    }
    catch(error)    
    {
        res.status(500).json({error: "Server error."}).send();
    }
},


async getOutfits(req: Request, res: Response): Promise<void>
{
    try {
        const id = req.params.id;
        if (!id) throw Error("404");
        const user = await getUserOr404(id);
        
        if (user.outfits.length == 0) {
            res.status(404).json({error: "No outfits."}).send();
            return;
        }

        res.status(200).json(user.outfits).send();
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
},

async logIn(req: Request, res: Response): Promise<void>
{
    try {
        const {username, email, password} = req.body;
        console.log(username, email, password);
        if (username == "" && email == "") {
            res.status(400).json({error: "No params."}).send();
            return;
        }

        let findRes;
        if (username != "" ) {
            findRes = await UserModel.find({username: username, password: password}).exec();
        } else {
            findRes = await UserModel.find({email: email, password: password}).exec();
        }

        if(findRes.length == 0) {
            res.status(400).json({error: "Wrong paramegers for login."}).send();
            return;
        }
        res.status(200).json({findRes}).send();
        return;
    }
    catch (error) { 
        console.log(error);
        if (error instanceof Error && error.message == "400"){
            res.status(400).json({message: "Invalid ID."}).send(); return;
        }
        if (error instanceof Error && error.message == "404") {
            res.status(404).json({message: "User not found."}).send(); return;
        }
        
        res.status(500).json({message: "Server error."}).send(); return;
    
    }
},

async getOne(req: Request, res: Response): Promise <void> 
{
    try {
        const user = await UserModel.findOne();
        /*
        if (user.followers.length == 0) {
            res.status(404).json({error: "No posts."}).send();
            return;
        }
*/
        res.status(200).json(user).send();
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

}

module.exports = userCtrl;

