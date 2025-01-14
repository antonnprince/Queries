import express from "express";
import { customer } from "./customerSchema.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(express.json())

mongoose.connect(process.env.mongoURL).then(()=>{
    console.log("DB connected")
    app.listen(3000,()=>console.log("Server running at 3000"))
})