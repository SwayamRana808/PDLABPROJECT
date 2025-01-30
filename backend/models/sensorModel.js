const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  temperature: Number,
  humidity: Number,
});

module.exports = mongoose.model('Sensor', sensorSchema);
