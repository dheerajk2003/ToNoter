const express = require('express');
const router = express.Router();
const { Reminder } = require('../Schema');

router.get("/", async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            res.status(409).send("inappropriate request");
            return;
        }
        res.send(await Reminder.find({ "userId": id }));
    }
    catch (e) {
        console.log(e);
        res.status(500).send("internal error");
    }
});

router.get("/one", async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            res.status(409).send("inappropriate request");
            return;
        }
        res.send(await Reminder.findOne({ "_id": id }));
    }
    catch (e) {
        console.log(e);
        res.status(500).send("internal error");
    }
})

router.post("/add", (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            res.status(409).send("inappropriate request");
            return;
        }
        const rem = {userId: data.userId, note: data.note, time: new Date(data.time)};
        var reminder = new Reminder(rem);
        reminder.save();
        res.status(200).send("done");
    }
    catch (e) {
        console.log(e);
        res.status(500).send("not created");
    }
});

router.put("/update", async (req,res) => {
    try{
        const data = req.body;
        if (!data) {
            res.status(409).send("inappropriate request");
            return;
        }
        await Reminder.findByIdAndUpdate(data._id, data);
        res.status(200).send("done");
    }
    catch(e){
        console.log(e);
        res.status(500).send("internal error");
    }
});

router.delete("/remove",(req, res) => {
    try{
        const id = req.query.id;
        Reminder.findByIdAndDelete(id).exec();
        res.status(200).send("done");
    }
    catch(e){
        console.log(e);
        res.status(500).send("internal error could not delete");
    }
})

module.exports = router;