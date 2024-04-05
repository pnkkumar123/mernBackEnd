import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    quantityAvailable: { type: Number, required: true },
    photo: [{
        type: String,
        require: true
    }],
   
    color: { type: String },
    size: { type: String },
    sellerId:{type:mongoose.Schema.Types.ObjectId,ref:'Seller'}
    
}, { timestamps: true });

const Products = mongoose.model("Products", ProductSchema);
export default Products;
