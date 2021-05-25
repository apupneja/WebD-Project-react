const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { secret } = require("../config/keys");
const Inventory = require("../models/product");

async function authCheck(token) {
  try {
    const decodedToken = await jwt.verify(token, secret);
  } catch (err) {
    throw Error("Invalid credentials");
    err.status(401);
  }
}

router.use(async (req, res, next) => {
  try {
    let token;
    if (
      req.method === "PATCH" ||
      req.method === "POST" ||
      req.method === "DELETE"
    ) {
    token = req.body.headers.Authorization;
    } else {
      token = req.headers["authorization"];
    }
    await authCheck(token);
    next();
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: err.message });
  }
});

const Errors = (err) => {
  let errors = { cost: "", quantity: "", aisle: "" };
  if (err._message.includes("inventorie validation failed")) {
    Object.values(err.errors).forEach((property) => {
      errors[property.path] = "Please enter a valid " + property.kind;
    });
  }
  return errors;
};

router.get("/inventory", async (req, res) => {
  try {
    const data = await Inventory.findOne();
    res.status(200).json({
      inventory: data.inventory,
    });
  } catch (err) {
    console.log(err);
  }
});

// Change the details of a prooduct
router.patch("/edit/:ID/:id", async (req, res) => {
  try {
    const ID = req.params.ID;
    const id = req.params.id;
    const result = await Inventory.findOneAndUpdate();
    const doc = result.inventory.id(ID);
    const subdoc = doc.details.id(id);
    subdoc.cost = req.body.data.items.cost;
    subdoc.quantity = req.body.data.items.quantity;
    subdoc.aisle = req.body.data.items.aisle;
    await result.save();
    res.status(200).json({ message: "Products updated successfully" });
  } catch (err) {
    const errors = Errors(err);
    console.log(err);
    res.status(422).json({ errors });
  }
});

//Add new items
router.patch("/add", async (req, res) => {
  try {
    const result = await Inventory.findOneAndUpdate();
    result.inventory.push(req.body.data.new);
    /*new:
      {
      product: "Facial",
      details:[
        {
          name:"Perfume",
          cost: 150,
          quantity: 500,
          aisle: 9
        },
        {
          name:"Skin cream",
          cost: 200,
          quantity: 650,
          aisle: 9
        },
        {
          name:"Lipstick",
          cost: 150,
          quantity: 1000,
          aisle: 9
        }
      ]
    }
       */
    result.save();
    res.status(200).json({ message: "Hi" });
  } catch (err) {
    console.log(err);
  }
});

router.patch("/add/:ID", async (req, res) => {
  try {
    const ID = req.params.ID;
    const result = await Inventory.findOneAndUpdate();
    const doc = result.inventory.id(ID);
    doc.details.push(req.body.data.new);
    /*new:
      {
      name: "Papaya",
      cost: 48,
      quantity: 377,
      aisle: 4,
    }
       */
    result.save();
    res.status(200).json({ message: "Hi" });
  } catch (err) {
    console.log(err);
  }
});

// Delete the product itself
router.delete("/delete/:ID", async (req, res) => {
  try {
    const ID = req.params.ID;
    const result = await Inventory.findOneAndUpdate();
    result.inventory.id(ID).remove();
    result.save();
    res.status(200).json({ message: "Hi" });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete/:ID/:id", async (req, res) => {
  try {
    const ID = req.params.ID;
    const id = req.params.id;
    const result = await Inventory.findOneAndUpdate();
    const doc = result.inventory.id(ID);
    const subdoc = doc.details.id(id).remove();
    result.save();
    res.status(200).json({ message: "Hi" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
