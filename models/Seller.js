import mongoose from 'mongoose'


const SellerSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
          type:String,
          require:true,
          unique:true
    },
    isSeller:{
     type:Boolean,
     default:true
    },
    userName:{
        type:String,
        require:true,
        unique:true
    },
    products:[{type:mongoose.Schema.Types.ObjectId,ref:'Product'}]
})
const Seller =  mongoose.model("SellerSchema",SellerSchema)

export default Seller;