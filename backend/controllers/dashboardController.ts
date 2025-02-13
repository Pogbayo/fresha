import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const dashboard = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
     try {
        const token = req.cookies.loginToken;
        if (!token) {
            res.status(401).json({error:"Unauthorized - no token found"});
            return;
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET as string)as jwt.JwtPayload;
        res.json({message:`Welcome ${decoded.email}`})
     } catch (error) {
        res.status(401).json({ error: "Invalid or expired token" });
     }
}