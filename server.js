const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const Cards = require("./dbCards");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// parse application/json
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI);

// app.get("/", (req, res) => res.status(200).send("Hello Webdev"));
app.post("/dating/cards", (req, res) => {
  const dbcard = req.body;
  Cards.create(dbcard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/dating/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(3000, () => {
  console.log("App is running");
});
