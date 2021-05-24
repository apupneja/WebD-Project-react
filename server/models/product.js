const mongoose = require("mongoose");
const Schema = mongoose.Schema;

function isNumber(val){
  return !isNaN(val)
}

const detailSchema = new Schema({
  name: {
    type: String,
    required: [true, "This is a required field !"],
  },
  cost: {
    type: Number,
    required: [true, "This is a required field !"],
    validate:[isNumber, "Please enter a valid number"]
  },
  quantity: {
    type: Number,
    required: [true, "This is a required field !"],
    validate:[isNumber, "Please enter a valid number"]
  },
  aisle: {
    type: Number,
    required: [true, "This is a required field !"],
    validate:[isNumber, "Please enter a valid number"]
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