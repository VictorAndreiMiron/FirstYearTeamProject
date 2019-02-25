const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScenarioSchema = new Schema({
  idTree: Number,
  plot: String,
  option1: String,
  option2: String,
  option3: String
});

const Scenario = mongoose.model('scenario',ScenarioSchema);

module.exports = Scenario;
