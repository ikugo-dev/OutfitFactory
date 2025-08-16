import {Request, Response} from 'express'; 
import User from './models/user.ts';
import Post from './models/post.ts';



export async function getUser(req: Request, res: Response): Promise <void> 
{
    try 
    {
        const { Username } = req.body;
        const user = await User.find({username: Username}).exec();

        if (!User) {
            res.status(404).json({error: "No such user."});
            return;
        }
        
        res.status(200).json(user);
        return;
    }
    catch (error) {
        res.status(500).json({error, "Server error."});
        return;
    }
} 

export async function createUser(req: Request, res: Response): Promise<void>
{
    try
    {
        const { Username, Email, Password } = req.body;
        
        let foundUsername = await User.exists({username: Username}).exec();  
        if ( foundUsername != null ){ 
            res.status(400).json({error: "Username already taken."});  
            return;
        }   

        let foundEmail = await User.exists({email: Email}).exec();  
        if ( foundEmail != null ) {
            res.status(400).json({error: "Account with this email address already exists."});  
            return;
        }

        const newUser = new User(Username, Email, Password,  "https://cdn-icons-png.flaticon.com/512/53/53101.png",
                                    [], [], [], [] );

        if (newUser == null){
            res.status(400).json({error: "User creation error."});
            return;
        }

        res.status(200).json(newUser);
        return;

    }
    catch(error){
        res.status(500).json({error: "Server error."});
        return; 
    }

}

export async function removeUser(req: Request, res: Response) : Promise<void> 
{
    try
    {
        const { Username } = req.body;

        const user = await User.find({username: Username}).exec();

        if (!User){
            res.status(404).json({error: "No such user."});
            return;
        }
        
        const deleteRes = await User.deleteOne({ username: Username });
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


export async function updateUsername(req: Request, res: Response) : Promise<void> 
{
    try
    {
        const { Username, newUsername } = req.body;

        const user = await User.find({username: Username}).exec();

        if (!User) {
            res.status(404).json({error: "No such user."});
            return;
        }

        let foundUsername = await user.exists({username: newUsername}).exec();  
        if ( foundUsername != null ) {
            res.status(400).json({error: "Username already taken."}); 
            return;
        }  
        const updateRes = await User.updateOne({ username: Username });
        if (updateRes.upsertedCount == 0 )  {
            res.status(500).json({error: "Server error."}); 
        }
    }
    catch(error){
        res.status(500).json({error: "Server error."}); 
        return;
    }

}


export async function updatePassword(req: Request, res: Response) : Promise<void> 
{
    try
    {
        const {Username, newPassword } = req.body;

        const user = await User.find({username: Username}).exec();

        if (!User) { 
            res.status(404).json({error: "No such user."});
            return;
        }
        
        const updateRes = await User.updateOne({ password: newPassword });
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

export async function updateAvatar(req: Request, res: Response) : Promise<void> 
{
    try
    {
        const {Username, newAvatar } = req.body;

        const user = await User.find({username: Username}).exec();

        if (!User) {
            res.status(404).json({error: "No such user."});
            return;
        }
        const updateRes = await User.updateOne({ avatar: newAvatar });
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

export async function removeAvatar(req: Request, res: Response) : Promise<void> 
{
        try
    {
        const {Username} = req.body;

        const user = await User.find({username: Username}).exec();

        if (!user)  {
            res.status(404).json({error: "No such user."});
            return;
        }
        const updateRes = await user.updateOne({ avatar: "https://cdn-icons-png.flaticon.com/512/53/53101.png" });
        if (updateRes.upsertedCount == 0 ) {
            res.status(500).json({error: "Server error."});
            return;
        }   
    }
    catch(error)
    {
        res.status(500).json({error: "Server error."}); 
    }
}


export async function addPost(req: Request, res: Response) : Promise<void> 
{
    try
    {
        const {Username, PostID} = req.body;

        const user = await User.find({username: Username}).exec();

        if (!user)  {
            res.status(404).json({error: "No such user."});
            return;
        }

        const post = await Post.find({_id: PostID}).exec();

        const updateRes = await User.updateOne({ $push: {posts : PostID}});
        if (updateRes.upsertedCount == 0 ) {
            res.status(500).json({error: "Server error."});
            return;
        }   
    }
    catch(error)
    {
        res.status(500).json({error: "Server error."}); 
    }
}

export async function follow(req: Request, res: Response) : Promise<any> 
{
    try
    {
        const {Username, UsernameToFollow } = req.body;

        const user = await User.find({username: Username, following : {$nin : [UsernameToFollow]}}).exec();
        if (!user)  return res.status(404).json({error: "No such user."}); 
        
        const userToFollow = await User.find({username: UsernameToFollow}).exec();
        if (!userToFollow)  return res.status(404).json({error: "No such user."});

        const newUser = await user.Update( {$push: { following: userToFollow } }, { new: true })
        const newUserToFollow = await user.Update( {$push: { followers: user } }, { new: true })
        
        if(newUser == null || newUserToFollow == null) {
            res.status(500).json({error: "Server error."});
            return;
        }
    }
    catch(error)
    {
        return(res.status(500).json({error: "Server error."})); 
    }
}


export async function unfollow(req: Request, res: Response) : Promise<any> 
{
    try
    {
        const {Username, UsernameToUnfollow } = req.body;

        const user = await User.find({username: Username, following : {$in: [UsernameToUnfollow]}}).exec();
        if (!user)  return res.status(404).json({error: "No such user."});        
        
        
        const userToFollow = await User.find({username: UsernameToUnfollow}).exec();
        if (!userToFollow)  return res.status(404).json({error: "No such user."});


        const newUser = await user.Update( {$pull: {following: UsernameToUnfollow } }, { new: true });
        const newUserToUnfollow = await user.Update( {$pull: {followers: UsernameToUnfollow } }, { new: true });

        if(newUser == null) {
            res.status(500).json({error: "Server error."});
            return;
        }
    }
    catch(error)
    {
        return(res.status(500).json({error: "Server error."})); 
    }
}