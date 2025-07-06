require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const uploadRoutes = require('./routes/upload');
const categoryRoutes = require('./routes/categories')

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: true, // Accept all origins
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/categories', categoryRoutes);

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI,{
  family: 4
}).then(()=>{
  console.log(`mongodb connected with server: ${mongoose.connection.host}`);
}).catch((err)=>{
  console.log(err);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
