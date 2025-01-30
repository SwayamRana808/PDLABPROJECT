const express = require('express');
const { createSensorData } = require('../controllers/sensorController');
const {getSensorData} = require('../controllers/getSensorData');
const router = express.Router();

router.post('/data', createSensorData);
router.get('/getData',getSensorData);
module.exports = router;
