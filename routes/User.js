const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const {User} = require('../Schema');

router.get("/",async (req,res)=>{
    try {
        res.send( await User.find());
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
            res.send(await User.findOne({"name": name}));
        }
        else if(id){
            res.send(await User.findOne({"_id": id}));
        }
    }
    catch (e) {
        console.log(e);
        res.send("error");
    }
});

router.post("/register", async (req, res) => {
    const data = req.body;
    if(await User.findOne({"name": data.name})){
        res.status(409).send("name already taken");
        return;
    }
    var dm = new User(data);
    dm.save();
    res.send("done");
});

router.post("/login", async (req, res) => {
    try{
        const data = req.body;
        if(!data){
            res.status(500).send("error");
            return;
        }
        const oneUser = await User.findOne({"name": data.name, "password": data.password});
        console.log("login cred = " + oneUser);
        if(!oneUser){
            res.status(401).send("not registered");
        }
        else{
            res.status(200).send("logged in successfully");
        }
    }
    catch(e){
        console.log(e);
        res.status(500).send("error");
    }
})

router.put("/update", async (req,res) => {
    try{
        const data = req.body;
        if(!data){
            res.status(500).send("error");
            return;            
        } 

        await User.findByIdAndUpdate(data._id, {name:data.name, password:data.password});

        // var oneUser = await User.findById(data._id);
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
    User.findByIdAndDelete(id).exec();
    res.status(200).send("done");
})

module.exports = router;