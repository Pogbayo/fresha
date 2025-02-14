import { Request, Response, NextFunction } from "express";
import { Category } from "../models/CategorySchema.js"; 
import { Shop } from "../models/CategorySchema.js";

export const deleteShop = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { categoryId, shopId } = req.params;
  try {
    console.log("Received Category ID:", categoryId); 

    const category = await Category.findById(categoryId);
    console.log("Category found:", category); 

    if (!category) {
     return res.status(404).json({message:"Category not found"})
    }

    category.shops = category.shops.filter((id) => id.toString() !== shopId);
    await category.save();

    const shop = await Shop.findByIdAndDelete(shopId)
    if (shop) {
      res.status(200).json({ message: `Shop with name: ${shop.name} deleted successfully` });
    } else {
      res.status(404).json({ message: "Shop not found" });
    }
  } catch (error) {
    console.error("Error deleting shop:", error);
    return res.status(500).json({ message: "Error deleting shop", error });
  }
};
