const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Please enter a name"],
    minlength: [4, "Minimum length of username should be of 4 characters"]
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [5, "Password length should be of minimum 5 characters"],
  },
}, {timestamps: true});

const User = mongoose.model("user", userSchema);
module.exports = User;

userSchema.pre("save", async (next)=>{
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
})