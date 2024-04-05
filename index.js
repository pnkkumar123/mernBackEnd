import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import createProduct from './api/routes/createProduct.js'
import route from './api/routes/Auth.js'
import cors from 'cors';
import consumerroute from './api/routes/Consumer.js'
import path from 'path'

dotenv.config()

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("connected to mongodb")})
.catch((error)=>{
    console.log(error);
})
const __dirname = path.resolve();

const app = express();
app.use(cors())
app.use(express.json())
app.listen("5000",()=>{
    console.log("port listed");
})
app.use("/createProduct",createProduct)
app.use("/seller",route)
app.use("/consumer",consumerroute)
app.get("/consumer/getkey",(req,res)=>
      res.status(200).json({key:process.env.RAZORPAY_API_KEY})
)
app.get('/api/env', (req, res) => {
    const envVariables = {
      RAZORPAY_API_KEY: process.env.RAZORPAY_API_KEY,
      RAZORPAY_API_SECRET_KEY: process.env.RAZORPAY_API_SECRET_KEY,
      JWT_SECRET: process.env.JWT_SECRET,
      MONGODB_URI: process.env.MONGODB_URI
      // Add more variables as needed
    };
    
    // Return environment variables as JSON
    res.json(envVariables);
  });
app.use(express.static(path.join(__dirname, '/frontEnd/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontEnd', 'dist', 'index.html'));
})