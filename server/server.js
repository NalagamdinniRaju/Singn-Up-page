const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const  PORT = 3004
const bcrypt =require('bcrypt')
const app = express()
const MONGO_URL = "mongodb+srv://Raju:Raju9398@cluster0.sfed5wq.mongodb.net/SignupDetails"

// middleware 
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

mongoose.connect(MONGO_URL)
    // .then(() => {
    //     console.log("Mongodb Connected successfully");
    // })
    // .catch((err) => {
    //     console.log(err)
    // })
const db = mongoose.connection
    db.on('error', (err) => {
        console.log("Error connecting to the database",err)
    })

    db.once('open', ()=>{
        console.log(`Connected to MongoDB at http:localhost:${PORT}`)
    })

const userSchema = new mongoose.Schema({
    name : String,
    email : {type :String , required : true},
    password : { type : String ,required :true }
});

const UserModel = mongoose.model("User",userSchema);

app.post("/signup", async (req,res) =>{
    try {
        const {name,email,password} = req.body 
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new UserModel({
            name,
            email,
            password:hashedPassword
          }); 
          // Save the new user to the data base
          const savedUser = await newUser.save()
          res.status(201).json(savedUser)
        
    } catch (error) {
        console.log('error during running', error)
        res.status(500).json({error: 'Internal server error'})
    }
})

app.listen(PORT , () => {
    console.log("Server is running at ", PORT)
})