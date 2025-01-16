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

// fetch all users
app.get('/all', async(req, res)=>{
    try {
        const result = await customer.find({})
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(404).json({message:"Error in fetching data"})
    }
})

//find one with field specified in body
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

//find one with field specified in parameter
app.get('/find_one3/:username', async(req, res)=>{
    const {username} = req.params
    const result = await customer.findOne({username:username})
    return res.status(200).json(result)
})

// update user with value in parameter
app.get('/find_one_update/:username', async (req, res) => {
    try {
        const { username } = req.params;
        
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

//create new document
 app.post('/create', async(req,res)=>{
    try {
        const data = await customer.create({username:"test"})
        return res.status(200).json({message:"Successfully Created"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"Error"})
    }
 })

 //delete document
 app.delete('/delete', async(req,res)=>{
    try {
        const data = await customer.findOneAndDelete({usermname:"test"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"Error"})
    }
 })


// update username of a document
 app.put('/update_many', async(req,res)=>{
    try {
        const data = await customer.updateMany({username:"test"},
             {$set: {username:"test2"}})
        return res.status(200).json({message:"successful"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"Error"})
    }
 })

//  insert a new field using udpateMany method
 app.post('/insert', async(req,res)=>{
    try {
        const d = await customer.updateMany({},{$set:{age:200}})
        return res.status(200).json({message:"DONE"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"Error"})
    }
 })

//  increment age field
app.put('/update_age', async(req,res)=>{
    try {
        const d = await customer.updateMany({}, {$inc:{age:100}})
        return res.status(200).json({message:"Completed"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"Error"})
    }
})


app.get('/operators', async(req,res)=>{
    // const d = await customer.find({age:{$gte:300}})
    // const d= await customer.find({age: {$eq:300}})
    // const d = await customer.find({age: {$gt:100}})
    // const d=await customer.find({age: {$lt:300}})
    // const d = await customer.find({username: {$in:["test2","hymen69"]}})
    // const d = await customer.find({age: {$gt:250, $lte:300}})
    // const d = await customer.updateMany({}, {$push:{accounts:696969}})
    // const d = await customer.updateOne(
    //     {username:"hymen69"},
    //     {$push:{accounts:421326}}
    // )

    const d = await customer.updateOne({username:"hymen69"},
        {$pull:{accounts:421326}}
    )
    return res.status(200).json(d)
})

app.post('/test', async(req,res)=>{
    const d = await customer.findOneAndUpdate({username:null}, {
        $set:{username:"HELOO"}
    })
    return res.status(200).json(d)
})