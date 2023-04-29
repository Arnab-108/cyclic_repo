const express = require("express")
const {notesModel} = require("../model/notes.model")
const notesRoute = express.Router()
notesRoute.post("/create",async(req,res)=>{
    try {
        const notes = notesModel(req.body)
        await notes.save()
        res.status(200).send("Data Added")
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


notesRoute.get("/",async(req,res)=>{
    try {
        const data = await notesModel.find({authorId:req.body.authorId})
        res.send(data)
    } catch (error) {
        res.send({"err":error.message})
    }
})

notesRoute.patch("/:id",async(req,res)=>{
    const {id} = req.params
    const note = await notesModel.findOne({_id:id})
    try {
        if(req.body.authorId!==note.authorId){
            res.send("Not Authorised")
        }
        else{
            await notesModel.findByIdAndUpdate({_id:id},req.body)
            res.send(`${id} is updated`)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

notesRoute.delete("/:id",async(req,res)=>{
    const {id} = req.params
    const note = await notesModel.findOne({_id:id})
    try {
        if(req.body.authorId!==note.authorId){
            res.send("Not Authorised")
        }
        else{
            await notesModel.findByIdAndUpdate({_id:id})
            res.send(`${id} is deleted`)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})
module.exports={notesRoute}