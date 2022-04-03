const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    //Creating a schema for the notes to be added in the database
    //Using the foreign key method to associate a particular note with the user
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type:  String,
        required:true
    },
    description:{
        type:  String,
        required:true,
    },
    tag:{
        type:  String,
        default: "General"
    },
    date:{
        type:  Date,
        default: Date.now
    },

  });

module.exports = mongoose.model('notes',NotesSchema);