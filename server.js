require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Subject = require("./models/subject");
const app = express();

const port = process.env.PORT || 5000;

//connecting to mongo
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    console.log("Established connection to Mongo");

    app.listen(port, () => console.log("Server started on port " + port));
  }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get("/subjects", async (req, res) => {
  const all_subjects = await Subject.find();

  res.status(200).json(all_subjects);
});

app.post("/add-model", async (req, res) => {
  const { name, category } = req.body;

  try {
    const new_subject = await Subject.create({ name, category });
    res.status(200).json(new_subject);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});

app.post("/add-vote/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const subject = await Subject.findOneAndUpdate(
      { _id: id },
      { $inc: { votes: 1 } }
    );
    res.status(200).json({ message: "update done" });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});
