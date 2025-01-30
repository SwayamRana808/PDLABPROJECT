const Sensor = require('../models/sensorModel');

const createSensorData = async (req, res) => {
  try {
    const sensorData = new Sensor(req.body);
    await sensorData.save();
    res.status(201).json({ message: 'Data stored successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSensorData };
