const express = require('express');
const mongoose = require('mongoose');
const User = require('./Schema');
const UserFile = require('./routes/User');

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

app.use("/User",UserFile);

app.get("/", (req, res) => {
    res.send("heelo");
});

// app.get("/helo", (req,res) => {
//     res.redirect("/");
// });

app.listen(4000);