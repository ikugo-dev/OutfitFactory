import {Request, Response} from 'express'; 
import Outfit from './models/outfit.ts';


export async function getOutfit(req: Request, res: Response): Promise <any>  {
    try 
    {
        const { ID } = req.body;
        const outfit = await Outfit.find({_id: ID}).exec();

        if (!outfit) 
        {
            return res.status(404).json({error: "Outfit not found."});
        }
        
        return res.status(200).json(outfit);
    }
    catch (error) 
    {
        return res.status(500).json({error, "Server error."});
    }
} 
/*
export async function createOutfit(req: Request, res: Response): Promise<any>
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
*/