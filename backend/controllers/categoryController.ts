import { NextFunction, Request, Response } from "express";
import { Category, Shop } from "../models/CategorySchema"; 


export const getCategories = async (req:Request, res:Response, next:NextFunction):Promise<void>  => {
try {
   
    const categories = await Category.find()
    .populate({
      path:"shops",
      populate:{
        path:"services",
        populate:{
          path:"subservices",
        }
      }
    });

     res.status(200).json({categories})
} catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: `Server error`, error });
}}



export const createCategory = async (req:Request, res: Response, next:NextFunction):Promise<void>  => {
    const {name} = req.body

    try {
        const existingCategory = await Category.findOne({name});
        if (existingCategory) {
            res.status(409).json({ message: "Category already exists" });
            return;
          }
        const newCategory = new Category({name});
        await newCategory.save();

        res.status(200).json({message:'Category created successfully',newCategory});
    } catch (error) {
        console.error("Error details:", error); 
        res.status(500).json({ message: 'Error creating category', error: (error as Error).message || error });
    }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {categoryId} = req.body
  try {
    const category = await Category.findByIdAndDelete(categoryId)
    if (!category) {
       res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({message:`Category with ${category?.name} has been deleted`})
  } catch (error) {
    console.error("Error deleting category", error)
    res.status(500).json({message:"Error deleting category"})
  }
}

export const addShopToCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { categoryId, shopId } = req.body;
  
    try {
      const category = await Category.findById(categoryId);
      if (!category) {
         res.status(404).json({ message: "Category not found" });
      }
  
      const shop = await Shop.findById(shopId);
      if (!shop) {
         res.status(404).json({ message: "Shop not found" });
         return;
      }
  
      category?.shops.push(shopId);
  
      await category?.save();
  
      res.status(200).json({ message: "Shop added to category successfully", category });
    } catch (error) {
      console.error("Error adding shop to category:", error);
      res.status(500).json({ message: "Error adding shop to category", error: (error as Error).message || error });
    }
  };
  