const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    language: { type: String, required: true, default: "en" }
});

module.exports = mongoose.model("User", UserSchema);
