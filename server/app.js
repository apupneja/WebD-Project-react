const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const { dbURI } = require("./config/keys");
const apiRoutes = require("./api/auth");
const productRoutes = require("./api/products");


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

app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "build")));

// CORS
// You won't face any errors after running the build so you can remove this
// Also the cookie is recorded in browser so instead of setting the jwt to the localstorage it is set as a cookie
// Access it from backend, for now pass it as data
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PUT, POST, PATCH , DELETE"
    );
    return res.status(200).json({});
  }
  next();
});

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.use("/api", apiRoutes);
app.use("/api", productRoutes);

app.use((req, res) => {
  res.status(404).send("Wrong url");
});
