import mongoose, { Schema, Types } from 'mongoose';

const Consumer = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    userName:{type:String,required:true},
    isSeller:{
        type:Boolean,
        default:false
       },
    cart:[{type:Schema.Types.ObjectId,ref:'Cart'}],
    orders:[{type:Schema.Types.ObjectId,ref:'Order'}]
})

const User = mongoose.model("Consumer",Consumer);
export default User