const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },

  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: /.+\@.+\..+/
  },

  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer"
  }

}, { timestamps: true });

userSchema.index({ email: 1 });

module.exports = mongoose.model("User", userSchema);