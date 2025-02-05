import { NextFunction, Request, Response } from "express";
import { Shop } from "../models/CategorySchema"; 
import { Category } from "../models/CategorySchema";  

export const createShop = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {categoryId, name, address, services,images, team, reviews, about, openingTimes } = req.body;
  
    try {
      const category = await Category.findById(categoryId);
      if (!category) {
          res.status(404).json({ message: "Category not found" });
      }

      console.log(category); 
      
      const newShop = new Shop({
        name,
        address,
        category: categoryId,  
        services,
        team,
        images,
        reviews,
        about,
        openingTimes,
      });
  
      await newShop.save();
      category?.shops.push(newShop._id);
      await category?.save();

      // console.log("This is the newShop id",newShop._id)


      res.status(201).json({ message: "Shop created successfully", shop: newShop });
    } catch (error) {
      console.error("Error creating shop:", error);
      res.status(500).json({ message: "Error creating shop", error });
    }
};
 
export const getShop = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
    const {shopId} = req.params
    const fetchedShop = await Shop.findById(shopId)
      if (!fetchedShop) {
        res.status(400).send("Shop not found")
      }
    res.status(200).send(fetchedShop)
   } catch (error) {
    res.status(500).send("Shop not found")
   }
}

export const updateAddress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
    const {shopId} = req.params;
    const {address} = req.body;
    console.log(address);

    const updatedShop = await Shop.findByIdAndUpdate(
      shopId,
      {address},
      {new:true,runValidators:true}
    );

    if (!updatedShop) {
      res.status(400).send("Shop not found")
    }
   res.status(200).send(updatedShop?.address)
   } catch (error) {
    res.status(500).send((error) as Error["message"])
   }
}

export const updateImgUrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {shopId} = req.params;
    const {images} = req.body;
   console.log({images})
    const updatedShop = await Shop.findByIdAndUpdate(
      shopId,
      { images } , 
      { new:true, runValidators:true }
    );

  if (!updatedShop) 
    {res.status(404).send("Shop not found")}
  

  if (updatedShop?.images.length === 0 || images.length === 0) {
     res.status(400).send("No images provided or no changes made");
  }


  res.status(200).send(`${updatedShop?.name} image url(s) has been updated succeessfully`)
  // console.log(updatedShop)
  } catch (error) {
    res.status(500).send((error) as Error["message"])
  }
}