import {Request, Response} from 'express'; 
import user from './models/user.ts';




export async function getUser(req: Request, res: Response): Promise <any>  //TODO nejasno mi ovde sta treba da stavim i da li je any
{
    try 
    {
        const { Username } = req.body;
        const User = await user.find({username: Username}).exec();

        if (!User) 
        {
            return res.status(404).json({error: "No such user."});
        }
        
        return res.status(200).json(User);
    }
    catch (error) 
    {
        return res.status(500).json({error, "Server error."});
    }
} 

export async function createUser(req: Request, res: Response): Promise<any>
{
    try
    {
        const { Username, Email, Password } = req.body;
        
        let foundUsername = await user.exists({username: Username}).exec();  
        if ( foundUsername != null ) return res.status(400).json({error: "Username already taken."});  
        
        let foundEmail = await user.exists({email: Email}).exec();  
        if ( foundEmail != null ) return res.status(400).json({error: "Account with this email address already exists."});  

        const newUser = new user(Username, Email, Password);

        if (newUser == null)
        {
            return res.status(400).json({error: "User creation error."});
        }

        return res.status(200).json(newUser);

    }
    catch(error)
    {
        return(res.status(500).json({error: "Server error."})); 
    }

}

export async function removeUser(req: Request, res: Response) : Promise<any> 
{
    try
    {
        const { Username } = req.body;

        const User = await user.find({username: Username}).exec();

        if (!User)  return res.status(404).json({error: "No such user."});
        
        const deleteRes = await User.deleteOne({ username: Username });
        if (deleteRes.deletedCount == 0 )  return(res.status(500).json({error: "Server error."})); //TODO da li treba 500
    
    }
    catch(error)
    {
        return(res.status(500).json({error: "Server error."})); 
    }

}


export async function updateUsername(req: Request, res: Response) : Promise<any> 
{
    try
    {
        const { Username, newUsername } = req.body;

        const User = await user.find({username: Username}).exec();

        if (!User)  return res.status(404).json({error: "No such user."});
        

        let foundUsername = await user.exists({username: newUsername}).exec();  
        if ( foundUsername != null )    return res.status(400).json({error: "Username already taken."}); 
        
        const updateRes = await User.updateOne({ username: Username });
        if (updateRes.upsertedCount == 0 )  return(res.status(500).json({error: "Server error."})); //TODO da li treba 500
    
    }
    catch(error)
    {
        return(res.status(500).json({error: "Server error."})); 
    }

}


export async function updatePassword(req: Request, res: Response) : Promise<any> 
{
    try
    {
        const {Username, newPassword } = req.body;

        const User = await user.find({username: Username}).exec();

        if (!User)  return res.status(404).json({error: "No such user."});
        
        const updateRes = await User.updateOne({ password: newPassword });
        if (updateRes.upsertedCount == 0 )  return(res.status(500).json({error: "Server error."})); //TODO da li treba 500
    
    }
    catch(error)
    {
        return(res.status(500).json({error: "Server error."})); 
    }
}

export async function updateAvatar(req: Request, res: Response) : Promise<any> 
{
    try
    {
        const {Username, newAvatar } = req.body;

        const User = await user.find({username: Username}).exec();

        if (!User)  return res.status(404).json({error: "No such user."});
        
        const updateRes = await User.updateOne({ avatar: newAvatar });
        if (updateRes.upsertedCount == 0 )  return(res.status(500).json({error: "Server error."})); //TODO da li treba 500
    
    }
    catch(error)
    {
        return(res.status(500).json({error: "Server error."})); 
    }
}

export async function removeAvatar(req: Request, res: Response) : Promise<any> 
{
        try
    {
        const {Username} = req.body;

        const User = await user.find({username: Username}).exec();

        if (!User)  return res.status(404).json({error: "No such user."});
        
        const updateRes = await User.updateOne({ avatar: "https://cdn-icons-png.flaticon.com/512/53/53101.png" });
        if (updateRes.upsertedCount == 0 )  return(res.status(500).json({error: "Server error."})); //TODO da li treba 500
    
    }
    catch(error)
    {
        return(res.status(500).json({error: "Server error."})); 
    }
}


export async function follow(req: Request, res: Response) : Promise<any> 
{
    try
    {
        const {Username, UsernameToFollow } = req.body;

        const User = await user.find({username: Username}).exec();
        if (!User)  return res.status(404).json({error: "No such user."});
        
        const UserToFollow = await user.find({username: UsernameToFollow}).exec();
        if (!UserToFollow)  return res.status(404).json({error: "No such user."});
/*
        const User = await user.find({username: Username, followinf}).exec();
        if (!User)  return res.status(404).json({error: "No such user."});
        
            */
    }
    catch(error)
    {
        return(res.status(500).json({error: "Server error."})); 
    }
}


export async function unfollow(req: Request, res: Response) : Promise<any> 
{

}

//TODO treba li za posts