import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import createProduct from './routes/createProduct.js'
import route from './routes/Auth.js'
import cors from 'cors';
import consumerroute from './routes/Consumer.js'


dotenv.config()

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("connected to mongodb")})
.catch((error)=>{
    console.log(error);
})


const app = express();
app.use(cors())
app.use(express.json())
app.listen("5000",()=>{
    console.log("port listed");
})
app.use("/createProduct",createProduct)
app.use("/seller",route)
app.use("/consumer",consumerroute)



