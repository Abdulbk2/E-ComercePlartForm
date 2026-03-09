const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  const product = await Product.create({
    ...req.body,
    createdBy: req.user._id,
  });
  res.status(201).json(product);
};

exports.getProducts = async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  const count = await Product.countDocuments();
  const products = await Product.find()
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .lean();

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).json({ message: "Product not found" });

  Object.assign(product, req.body);
  await product.save();

  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};