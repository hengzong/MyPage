var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// Define Component Schema
var ComponentSchema = new mongoose.Schema({
    user_name: {type: String, required: true},
    title: {type: String, default: ""},
    innerHTML: {type: String, default: ""},
    editorState: {type: String, default: ""},
    dateCreated : {type: Date, default: Date.now}
}, {versionKey: false});

// Expose the Mongoose Model
module.exports = mongoose.model('Component', ComponentSchema);