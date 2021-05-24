const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { secret } = require("../config/keys");

const max = 3 * 24 * 60 * 60;

const createToken = (id, name) => {
  return jwt.sign({ id, name }, `${secret}`, {
    expiresIn: max,
  });
};

async function authCheck(token) {
  try {
    const decodedToken = await jwt.verify(token, secret);
  } catch (err) {
    throw Error("Invalid credentials");
    err.status(401);
  }
}

const handleErrors = (err) => {
  let errors = { name: "", password: "" };

  if (err.code === 11000) {
    errors.name =
      "That username is already registered. Please enter a different name";
    return errors;
  }

  if (err.message === "Invalid password") {
    errors.password = "The password entered is incorrect";
  }

  if (err.message === "Invalid username") {
    errors.name = "User not found";
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

router.post("/login", async (req, res) => {
  try {
    const result = await User.findOne({ name: req.body.data.name });
    if (result) {
      const auth = await bcrypt.compare(
        req.body.data.password,
        result.password
      );
      if (auth) {
        const token = createToken(result._id, result.name);
        res.cookie("jwt", token, { httpOnly: true, maxAge: max * 1000 });
        res.status(200).json({ jwt: token });
      } else {
        throw Error("Invalid password");
      }
    } else {
      throw Error("Invalid username");
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(401).json({ errors });
  }
});

router.post("/signup", async (req, res) => {
  try {
    await authCheck(req.body.data.cookie);
    const user = await new User({
      name: req.body.data.name,
      password: req.body.data.password,
    });
    const js = await user.save();
    res.status(200).json({
      message: `New user with username ${js.name} has been created`,
    });
  } catch (err) {
    console.log(err);
    if (err.message === "Invalid credentials") {
      res.status(401).json({ message: err.message });
    } else {
      const errors = handleErrors(err);
      res.status(401).json({ errors });
    }
  }
});

router.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({});
});

module.exports = router;
