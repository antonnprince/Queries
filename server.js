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

app.get('/all', async(req, res)=>{
    try {
        const result = await customer.find({})
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(404).json({message:"Error in fetching data"})
    }
})

app.get('/find_one', async(req,res)=>{
    try {
        const result = await customer.findOne({
            "username":"hymen69"
        })
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(404).json({message:"Error in fetching data"})
    }
})

app.get('/find_one2', async(req,res)=>{
    try {
        const {username} = req.body
        const result = await customer.findOne({
            "username":username
        })
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(404).json({message:"Error in fetching data"})
    }
})

app.get('/find_one3/:username', async(req, res)=>{
    const {username} = req.params
    const result = await customer.findOne({username:username})
    return res.status(200).json(result)
})

app.get('/find_one_update/:username', async (req, res) => {
    try {
        const { username } = req.params;

        // New data for updating
        const newData = { username: 'hymen69' }; // You might want to update other fields or take dynamic input

        const result = await customer.findOneAndUpdate(
            { username: username }, // Find the document by username
            { $set: {username:"HYMEN69"} },      // Update operation
            { new: true }           // Return the updated document
        );

        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Error in updating data" });
    }
});

