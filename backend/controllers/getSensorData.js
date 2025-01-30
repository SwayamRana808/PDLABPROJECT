const Sensor = require('../models/sensorModel');

const getSensorData = async (req, res) => {
    try {
        const sensors = await Sensor.find(); // Fetch all documents from the 'sensors' collection
        res.status(200).json(sensors); // Respond with the data
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    }
    
module.exports = { getSensorData };
