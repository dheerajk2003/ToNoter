const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    password: String
},{collection: "users"});

const NotesSchema = new Schema({
    userId: Schema.ObjectId,
    note: String
},{collection: "notes"});

const TodoSchema = new Schema({
    userId: Schema.ObjectId,
    task: String,
    done: Boolean
},{collection: "todos"});

const ReminderSchema = new Schema({
    userId: Schema.ObjectId,
    note: String,
    time: Date
},{collection: "remainder"});

const User = mongoose.model("userModel", UserSchema);
const Notes = mongoose.model("notesModel", NotesSchema);
const Todo = mongoose.model("todosModel", TodoSchema);
const Reminder = mongoose.model("reminderModel", ReminderSchema);


module.exports = {User, Notes, Todo, Reminder};