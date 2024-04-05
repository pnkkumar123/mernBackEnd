import Products from "../models/Product";



const authorizeUpdate = (req,res,next)=>{
    const userId = req.user._id;

    // product fetching from database
    Products.findById(req.params.productId,(err,product)=>{
        if(err || !product){
            return res.status(404).json({error:"product not found"})
        }
        // checking user is owner of product
        if(product.seller.toString() !== userId){
            return res.status(403).json({error:"unauthorized access"})
        }
        next();
    })
}
export default authorizeUpdate