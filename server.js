import express from "express";
import { customer } from "./customerSchema";

const mongoURL = 'mongodb+srv://Threads:antonprince95@cluster0.asiy8fr.mongodb.net/sample_analytics?retryWrites=true&w=majority&appName=Cluster0'
const m = 'mongodb+srv://antonprince95:<db_password>@threads.xnhc3kw.mongodb.net/?retryWrites=true&w=majority&appName=Threads'
const app = express()
app.use(express.json())

app.listen(3000,()=>console.log("Running at 3000"))