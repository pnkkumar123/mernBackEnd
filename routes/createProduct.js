import express from 'express';
import Products from '../models/Product.js';
import Seller from '../models/Seller.js';


const route = express.Router();



route.post("/create", async (req, res) => {
    const {
        userId,
        productName,
        description,
        price,
        category,
        brand,
        quantityAvailable,
        photo,
        color,
        size
    } = req.body;
    
    try {
        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }
        
        // Check if the seller exists
        const seller = await Seller.findById(userId);
        if (!seller) {
            return res.status(404).json({ error: "Seller not found" });
        }
        
        // Create the product
        const product = new Products({
            productName,
            description,
            price,
            category,
            brand,
            quantityAvailable,
            photo,
            color,
            size
        });
        
        // Save the product
        const savedProduct = await product.save();
        
        // Add the product to the seller's list of products
        seller.products.push(savedProduct._id);
        await seller.save();
        
        return res.status(201).json({ product: savedProduct });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while saving the product." });
    }
});


route.get("/products/:userId", async (req, res) => {
    try {
        const userId = req.params.userId; // Access userId from route parameters
        
        // Check if the seller exists
        const seller = await Seller.findById(userId);
        if (!seller) {
            return res.status(404).json({ error: "Seller not found" });
        }
        
        // Fetch products uploaded by the seller
        const products = await Products.find({ _id: { $in: seller.products } });
        
        return res.json({ products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while fetching the products." });
    }
});
route.get("/consumerproducts/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while fetching the product" });
    }
});

// 
route.get("/consumerproducts",(req,res)=>{
    Products.find()
    .then(products=>{
        return res.status(200).json({products})
    })
    .catch(error=>{
        console.error(error);
        return res.status(500).json({error: "An error occured while retrieved"})
    })
})


route.put("/products/:productId", async (req, res) => {
    const productId = req.params.productId;
    const updatedData = req.body;
    const userId = req.params.userId; // Assuming you have user information in the request

    try {
        // Check if the user making the request is the owner of the product
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        if (product.owner !== userId) {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        // Update the product
        const updatedProduct = await Products.findByIdAndUpdate(productId, updatedData, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

    

route.delete("/products/:productId",(req,res)=>{
    const productId = req.params.productId;
    Products.findByIdAndDelete(productId)
    .then(()=>{
        res.status(204).send();
    })
    .catch(error=>{
        console.error(error);
    })
})



export default route;
