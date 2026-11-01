const mongoose = require("mongoose");
const User = require("./User.js");

const entrySchema = new mongoose.Schema({
    title: { type: String, required: true , maxlength: 100 },
    entryBody: { type: String, required: true  , maxlength: 350 },
    isPublic: { type: Boolean, default: false },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

const Entry = mongoose.model("Entry", entrySchema);
module.exports = Entry;