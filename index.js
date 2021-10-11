const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://oct94:gmlxo05061011@bilerplate.j1mmk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hello world"));

app.listen(port, () => console.log(`example app listening on port ${port}`));
