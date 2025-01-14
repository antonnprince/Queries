import mongoose from "mongoose";

const customersSchema = mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true   
    },
    birthdate:{
        type:Date,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    accounts:{
        type:[Number],
        requried:true
    },
    

})

export const customer = mongoose.model("customer", customersSchema)