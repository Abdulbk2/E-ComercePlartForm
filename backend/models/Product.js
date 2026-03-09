const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  name: { type: String, required: true },

  description: { type: String, required: true },

  price: { type: Number, required: true, min: 0 },

  stockQuantity: { type: Number, required: true, min: 0 },

  category: { type: String, required: true },

  image: { type: String },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

productSchema.index({ name: 1 });
productSchema.index({ category: 1 });
productSchema.index({ category: 1, price: 1 });

module.exports = mongoose.model("Product", productSchema);