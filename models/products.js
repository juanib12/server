const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: 1,
      maxlength: 100,
    },
    description: {
      required: true,
      type: String,
      maxlength: 100000,
    },
    price: {
      required: true,
      type: Number,
      maxlength: 255,
    },
    typeProduct: {
        required: true,
        type: String,
        maxlength: 100,
    },
    shipping: {
      required: true,
      type: Boolean,
    },
    available: {
      required: true,
      type: Boolean,
    },
    sold: {
      type: Number,
      maxlength: 100,
      default: 0,
    },
    publish: {
      required: true,
      type: Boolean,
    },
    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema, "products");
module.exports = { Product };
