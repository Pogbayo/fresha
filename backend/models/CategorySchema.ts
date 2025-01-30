import mongoose from "mongoose"
 
const subServiceSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    duration:{type:String,required:true
    },
})

const serviceSchema = new mongoose.Schema({
    name:{type:String,required:true},
    subServices:{type:[subServiceSchema],required:true}
})

const shopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, 
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }], 
    team: [
      {
        name: { type: String, required: true },
        role: { type: String, required: true },
      },
    ],
    reviews: { type: [String], required: true },
    about: { type: String, required: true },
    openingTimes: {
      monday: { type: String, required: true },
      tuesday: { type: String, required: true },
      wednesday: { type: String, required: true },
      thursday: { type: String, required: true },
      friday: { type: String, required: true },
      saturday: { type: String, required: true },
      sunday: { type: String, required: true },
    },
  });

const categorySchema = new mongoose.Schema({
    name:{type:String,required:true},
    shops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shop" }],  

})

export const Category = mongoose.model("Category", categorySchema);
export const Shop = mongoose.model("Shop", shopSchema);
export const Service = mongoose.model("Service", serviceSchema);