const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    fristname: { type: String, unique: true,
                  index: { unique: true, sparse: true } 
              },
    lastname: { type: String },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  }).index({ fristname: 1, lastname: 1 }, { unique: true })
);


//User.index({ fristname: 1, lastname: 1 }, { unique: true });
module.exports = User;