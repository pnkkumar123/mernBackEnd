import express from 'express';
import Seller from '../models/Seller.js';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const route = express.Router();

route.post("/signup",async (req,res,next)=>{
    const {userName,email,name,password} = req.body;
     try {
      const existingUser = await Seller.findOne({$or:[{email},{userName}]});
      if(existingUser){
        return res.status(400).json({error:"User already exists"})
      }
    //   hashed password
    const hashedPassword = bcryptjs.hashSync(password,10)

        const seller = new Seller({
            name,
            userName,
            password:hashedPassword,
            email
        });

        const result = await seller.save();
        return res.status(201).json({seller:result,message:"User created Sucessfully"})
     } catch (error){
        console.log(error);
        return res.status(401).json({error:"Error occured while saving data"})
     }

})
route.post("/signin",async(req,res,next)=>{
  const {email,password} = req.body;
  try{
    const validUser = await Seller.findOne({email})
  if(!validUser){
    return next(console.log("error"))
  }
  const validPassword = bcryptjs.compareSync(password,validUser.password)
  if(!validPassword){
    return next (console.log("wrong crendential"));
  }
  const {password:hashedPassword,...rest} = validUser._doc;
  const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
  const age = new Date(Date.now()+3600000);
  res.cookie('access_token',token,{httpOnly:true,expires:age},
  
  ).status(200)
  .json(rest)
  }catch(e){
    next(e)
  }


});
route.post("/signout",(req,res,next)=>{
  try{
    res.clearCookie('access_token');
    res.status(201).json('User has been logged out')
  }catch(e){
    console.log(e);
  }
})

export default route