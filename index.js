const express = require('express');
const mongoose = require('mongoose');

const User = require('./Schema');

const UserFile = require('./routes/User');
const NotesFile = require('./routes/Notes');
const TodoFile = require('./routes/Todos');
const ReminderFile = require('./routes/Reminder');

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

app.get("/", (req, res) => {
    res.send("heelo");
});

app.use("/User", UserFile);
app.use("/Notes", NotesFile);
app.use("/Todo", TodoFile);
app.use("/Reminder", ReminderFile);

// app.get("/helo", (req,res) => {
//     res.redirect("/");
// });

app.listen(4000);