import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User"; 
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); 

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
 try { 
    const users = await User.find();
    res.status(200).json(users); 
 } catch (error) {
    res.status(400).json({"error": error})
 }
   
};

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {firstname,lastname,email,password,phone} = req.body;
    try {
        const existingUser = await User.findOne({email})
        if (existingUser) {
             res.status(400).json({error:"Email already in use"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({firstname,lastname,email,password:hashedPassword,telephone:phone});
        await newUser.save();
        res.status(200).json({message:`user ${firstname} registered successfully!`})
    } catch (error) {
        res.status(400).json({error: (error as Error).message})
    }
};



export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   const {email,password} = req.body;
   try {
    const existingUser = await User.findOne({email})
  
    if (!existingUser || !existingUser.password) {
        res.status(400).json({ error: "Invalid email or password" });
        return;
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
        res.status(400).json({ error: "Invalid email or password" });
        return;
    }
    const SECRET_KEY = process.env.JWT_SECRET

    if (!SECRET_KEY) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(
        {
         email:existingUser.email,
         firstname:existingUser.firstname,
         lastname:existingUser.lastname,
         telephone:existingUser.telephone
        },
        SECRET_KEY as string,
        { expiresIn: "7d" } 
    )

    res.cookie("loginToken",token,{
        httpOnly:true,
        secure:true,
        sameSite:"strict"
    });

    res.status(200).json({ message: `Welcome back ${existingUser.firstname}`, token })
    console.log(token)
   } catch (error) {
    res.status(400).json({error: (error as Error).message})
   };
}




export const deleteAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
   const token = req.headers.authorization?.split(" ")[1];
   if (!token) {
       res.status(400).json({error:"Unauthorized"});
       return;
   }

   const SECRET_KEY = process.env.JWT_SECRET;

   if (!SECRET_KEY) {
       throw new Error("JWT_SECRET is not defined in environment variables");
   }

   const decoded = jwt.verify(token, SECRET_KEY as string);
   const userEmail = (decoded as jwt.JwtPayload).email;

   const deletedUser = await User.findOneAndDelete({email: userEmail});

   if (!deletedUser) {
       res.status(404).json({error:"User not found"});
       return;
   }
   res.status(200).json({message:"User deleted successfully"});
   } catch (error) {
    res.status(400).json({error: (error as Error).message})
   }
}



export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   res.clearCookie("loginToken",{
    httpOnly:true,
    secure:true,
    expires: new Date(0),
    sameSite:"strict"
   });
   res.status(200).json({message:"Logged out successfully!"})
}