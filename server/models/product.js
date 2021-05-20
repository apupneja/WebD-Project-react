const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const detailSchema = new Schema({
  name: {
    type: String,
    required: [true, "This is a required field !"],
  },
  cost: {
    type: Number,
    required: [true, "This is a required field !"],
  },
  quantity: {
    type: Number,
    required: [true, "This is a required field !"],
  },
  aisle: {
    type: Number,
    required: [true, "This is a required field !"],
  },
});

const productSchema = new Schema({
  product: {
    type: String,
    required: true,
  },
  details: [detailSchema],
});

const inventorySchema = new Schema({
  inventory: [productSchema],
}, {timestamps: true});

const Inventory = mongoose.model("inventorie", inventorySchema);
module.exports = Inventory;