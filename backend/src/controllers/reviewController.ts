import {NextFunction, Request, Response} from "express";
import { Review } from "../models/Review";


export const getReviews = async(req:Request, res:Response, next:NextFunction) : Promise<void> => {
    try {
        const reviews = await Review.find()
        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json({message:'Server error'})
    }
}




export const createReview = async(req:Request, res:Response, next:NextFunction) : Promise<void> => {
   const {name,title,description,city,country} = req.body
   try {
    if (!name || !title || !description || !city || !country) {
      res.status(400).json({ message: "All fields are required" });
      }
    const newReview = new Review({name,title,description,city,country});
    await newReview.save();
    res.status(200).json({message:`Review uploaded successfully`})
   } catch (error) {
    console.error("Error details:", error); 
    res.status(500).json({ message: 'Error creating category', error: (error as Error).message || error });
   }
}
