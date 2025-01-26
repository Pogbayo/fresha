import mongoose from "mongoose"
 
const serviceSchema = new mongoose.Schema({
    name:{type:String,required:true},
    time:{type:String,required:true},
    price:{type:Number,required:true},
});

const teamMember = new mongoose.Schema({
    name:{type:String,required:true},
    role:{type:String,required:true}
})

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    images:{
        type:[String],
        required:true
    },
    services:{type:[serviceSchema],required:true},
    reviews:{type:[String],required:true},
    team:{type:[teamMember],required:true}
})
const Category = mongoose.model("Category", categorySchema);
module.exports = Category