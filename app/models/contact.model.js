const mongoose = require("mongoose");
const Contact = mongoose.model(
    "Contact",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,

        title: String,
        name: String,
        email: String,
        phone: String,
        company: String,
        group: String,
        archive: Boolean,
        user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }        
    })
);
module.exports = Contact;