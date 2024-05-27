const express = require('express');
const mongoose = require('mongoose');
const User = require('./Schema');

const app = express();
app.use(express.json());
const mongoDB = "mongodb://127.0.0.1:27017/faltu";
try {
    mongoose.connect(mongoDB);
}
catch (e) {
    console.log(e);
}
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to the database');
});
const DataModel = mongoose.model("DataModel", User);

app.get("/", (req, res) => {
    try {
        DataModel.find()
            .then(function (doc) {
                // console.log(doc);
                res.send(`${doc} heloo`);
            })

    }
    catch (e) {
        console.log(e);
        res.send("error");
    }
});

app.get("/getSpec", async (req, res) => {
    try{
        const name = req.query.name;
        const id = req.query.id;
        var userData;
        if(name){
            userData = await DataModel.findOne({"name": name});
        }
        else if(id){
            userData = await DataModel.findOne({"_id": id});
        }
        console.log(userData);
        if(!userData){
           res.send("not found");
           return;
        }
        res.send(userData);
    }
    catch (e) {
        console.log(e);
        res.send("error");
    }
});

app.post("/postUser", (req, res) => {
    try{
        const data = req.body;
        console.log(data);
        if(!data){
            return res.status(404).send("Something went wrong");
        }
        var dm = new DataModel(data);
        dm.save();
        res.redirect("/");
    }
    catch(e){
        console.log(e)
        res.send("error");
    };
});

app.put("/updateUser",async (req, res) => {
    try{
        const userData = req.body;
        if (!userData) {
            return res.status(400).send("ID is required");
        }
        console.log(userData);

        const doc = await DataModel.findById(userData._id);
        if (!doc) {
            return res.status(404).send("Document not found");
        }

        doc.name = userData.name;
        doc.password = userData.password;
        doc.save();

        console.log(doc);
        res.redirect("/");
    }
    catch(e){console.log(e);
        res.send("error")};
});

app.delete("/deleteUser", (req, res) => {
    try{
        const userData = req.body;
        DataModel.findByIdAndDelete(userData._id).exec();
        res.redirect("/");
    }
    catch(e){console.log(e);
    res.send("error")};
})

app.get("/helo", (req,res) => {
    res.redirect("/");
})

app.listen(4000);