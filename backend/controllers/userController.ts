import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt"
import { User } from "../models/User"; 

export const getUsers = (req: Request, res: Response, next: NextFunction): void => {
    const users = [
        {id:1,name:"John Doe"},
        {id:2,name:"Jane Doe"}
    ];
     res.status(200).json(users); 
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {name,email,password} = req.body;
    try {
        const existingUser = await User.findOne({email})
        if (existingUser) {
             res.status(400).json({error:"Email already in use"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({name,email,password:hashedPassword});
        await newUser.save();
        res.status(200).json({message:`user ${name} registered successfully!`})
    } catch (error) {
        res.status(400).json({error: (error as Error).message})
    }
};
