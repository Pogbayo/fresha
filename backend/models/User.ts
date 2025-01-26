import mongoose from "mongoose";
 const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], // Email validation

    },
    password:{
        type:String,
        required:true,
        minlength: [8, 'Password must be at least 8 characters long'],
        match: [
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
          'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
        ],
    }
})
export const User = mongoose.model('user',userSchema)
module.exports = User;
