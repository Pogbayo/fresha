import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt"
import { User } from "../models/User"; 
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); 

export const getUsers = (req: Request, res: Response, next: NextFunction): void => {
    const users = [
        {id:1,name:"John Doe"},
        {id:2,name:"Jane Doe"}
    ];
     res.status(200).json(users); 
};

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {name,email,password,phone} = req.body;
    try {
        const existingUser = await User.findOne({email})
        if (existingUser) {
             res.status(400).json({error:"Email already in use"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({name,email,password:hashedPassword,telephone:phone});
        await newUser.save();
        res.status(200).json({message:`user ${name} registered successfully!`})
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

    const token = jwt.sign(
        {
         email:existingUser.email,
         name:existingUser.name,
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

    res.status(200).json(`Welcome back ${existingUser.name}`)
   } catch (error) {
    res.status(400).json({error: (error as Error).message})
   };
}


export const deleteAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   const {email} = req.body;
   try {
    const existingUser = await User.findOneAndDelete({email})
    if (!existingUser) {
        res.status(400).json("Error deleting user");
        return;
    }
    res.status(200).json(`Account ${existingUser.name} deleted successfully`);
   } catch (error) {
    res.status(400).json({error: (error as Error).message})
   }
}

export const logOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   res.clearCookie("loginTToken",{
    httpOnly:true,
    secure:true,
    expires: new Date(0),
    sameSite:"strict"
   });
   res.status(200).json({message:"Logged out successfully!"})
}