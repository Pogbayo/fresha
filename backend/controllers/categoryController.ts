import { NextFunction, Request, Response } from "express";
import { Category } from "../models/CategorySchema"; 


export const getCategories = async (req:Request, res:Response, next:NextFunction):Promise<void>  => {
try {
    const categories = await Category.find();
    res.status(200).json(categories)

} catch (error) {
    res.status(500).json({message:`Server error`, error})
}}

export const createCategory = async (req:Request, res: Response, next:NextFunction):Promise<void>  => {
    const {name,services,images, reviews,team} = req.body

    try {
        const newCategory = new Category({name,services,images,reviews,team});
        await newCategory.save();
        res.status(200).json({message:'Category created successfully',newCategory});
    } catch (error) {
        console.error("Error details:", error); 

        res.status(500).json({ message: 'Error creating category', error: (error as Error).message || error });
    }
};
