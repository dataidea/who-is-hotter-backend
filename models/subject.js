const mongoose = require("mongoose");

const subjectModel = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  has_voted: { type: Boolean, default: false },
  votes: { type: Number, default: 0 },
});

module.exports = new mongoose.model("Subject", subjectModel);
