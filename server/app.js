const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { dbURI } = require("./config/keys");
const apiRoutes = require("./api/auth");
const productRoutes = require("./api/products");
const { dirname } = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT);
mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to db");
  }
);

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(--dirname, "client", "build"));
  app.get("/*", (req, res) => {
    res.sendFile(__dirname, "build", "index.html");
  });
} else {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method == "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET,  POST, PATCH , DELETE");
      return res.status(200).json({});
    }
    next();
  });
}

app.use("/api", apiRoutes);
app.use("/api", productRoutes);
