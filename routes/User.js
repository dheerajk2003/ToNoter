const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('../Schema');

const DataModel = mongoose.model("DataModel", User);

router.get("/",async (req,res)=>{
    try {
        res.send( await DataModel.find());
    }
    catch (e) {
        console.log(e);
        res.send("error");
    }
});

router.get("/getSpec", async (req, res) => {
    try{
        const name = req.query.name;
        const id = req.query.id;
        if(name){
            res.send(await DataModel.findOne({"name": name}));
        }
        else if(id){
            res.send(await DataModel.findOne({"_id": id}));
        }
    }
    catch (e) {
        console.log(e);
        res.send("error");
    }
});

router.post("/register",(req, res) => {
    const data = req.body;
    var dm = new DataModel(data);
    dm.save();
    res.send("done");
});

router.put("/update", async (req,res) => {
    try{
        const data = req.body;
        if(!data){
            res.status(500).send("error");
            return;            
        } 

        await DataModel.findByIdAndUpdate(data._id, {name:data.name, password:data.password});

        // var oneUser = await DataModel.findById(data._id);
        // oneUser.name = data.name;
        // oneUser.password = data.password;
        // oneUser.save();
        res.send("done");
    }
    catch(e){
        console.log(e);
        res.status(500).send("error");
    }
});

router.delete("/remove",(req, res) => {
    const id = req.query.id;
    DataModel.findByIdAndDelete(id).exec();
    res.status(200).send("done");
})

module.exports = router;