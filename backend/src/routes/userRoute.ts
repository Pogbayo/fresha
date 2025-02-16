import express from "express";
import {  
  deleteAccount, 
  getUsers, 
  login, 
  logout, 
  register 
} from "../../src/controllers/userController";  

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", register);
router.post("/users/login", login);
router.delete("/users", deleteAccount);
router.post("/users/logout", logout);

export { router as userRoute };
