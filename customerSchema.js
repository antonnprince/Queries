import mongoose from "mongoose";


const customerSchema = new mongoose.Schema({}, {strict:false})
export const customer = mongoose.model("customer", customerSchema)