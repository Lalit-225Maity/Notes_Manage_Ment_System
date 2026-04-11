const { Schema, model } = require('mongoose');
const Note = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    
},{timestamps:true})
const note = model("Note", Note);
module.exports = note;