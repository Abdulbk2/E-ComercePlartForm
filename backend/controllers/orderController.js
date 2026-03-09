const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  const { items } = req.body;

  let total = 0;

  for (let item of items) {
    const product = await Product.findById(item.product);

    if (product.stockQuantity < item.quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    product.stockQuantity -= item.quantity;
    await product.save();

    total += product.price * item.quantity;
  }

  const order = await Order.create({
    user: req.user._id,
    items,
    totalAmount: total,
  });

  res.status(201).json(order);
};