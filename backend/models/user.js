var mongoose = require('mongoose');

// Define user schema
var UserSchema = new mongoose.Schema({
    user_name: {type: String, unique: true, required: true},
    first_name: {type: String, default: ""},
    last_name: {type: String, default: ""},
    avatar_url: {type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    outerLinks: {type:JSON, default:{"linkedin":"", "facebook":"", "github":"", "twitter":"", "instgram":""}},
    componentList: {type: Array, default: []},
    dateCreated: {type: Date, default: Date.now},
    latitude: {type: String, default:"40.113994"},
    longitude: {type: String, default:"-88.224470"}
}, {versionKey: false});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
