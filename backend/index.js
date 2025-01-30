const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const sensorRoutes = require('./routes/sensorRoutes');

const cors = require('cors');
const app = express();
app.use(express.json());

// Allow requests from all origins or specify your Next.js frontend domain
const corsOptions = {
  origin: 'http://localhost:3000', // Update this with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions));

dotenv.config();
connectDB();


app.use('/api/sensors', sensorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
