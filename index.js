const express = require("express")
const cors = require("cors")
const jwt = require('jsonwebtoken')
const {connection} = require("./db")
const {authRouter} = require("./routes/register.router")
const {auth} = require("./middleware/auth.middleware")
const {notesRoute} = require("./routes/notes.router")
const app=express()
app.use(express.json())
app.use(cors())
app.use("/auth",authRouter)

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})


//Protected
app.use(auth)
app.use("/notes",notesRoute)

app.get("/music",(req,res)=>{
    res.status(200).send("Music Data")
})

app.get("/series",(req,res)=>{
    res.status(200).send("series Data")
})

app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected to DB!")
    } catch (error) {
        console.log(error)
    }
    console.log("server is running at 8080")
})