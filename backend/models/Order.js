const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    quantity: Number
  }],

  totalAmount: Number,

  status: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending"
  },

  paymentStatus: {
    type: String,
    enum: ["unpaid", "paid"],
    default: "unpaid"
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);