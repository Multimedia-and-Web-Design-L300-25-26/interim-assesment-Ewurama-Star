const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const cryptoRoutes = require('./routes/cryptoRoutes');


dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true
}));

const DB = process.env.MONGODB_URI || 'mongodb://localhost:27017/coinbase_clone';


mongoose.connect(DB).then(() => {
  console.log('DB connection successful!');
}).catch(err => {
  console.log('DB connection error:', err);
});

console.log('Running in MOCK mode (no MongoDB required)');

const Crypto = require('./models/Crypto');
app.get('/api/crypto', async (req, res) => {
  try {
    const cryptos = await Crypto.find();
    res.json(cryptos);
  } catch (err) {
    console.error('Error fetching cryptos:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/crypto', cryptoRoutes);

// Fallback for non-standard routes mentioned in README if needed
app.get('/register', (req, res) => res.status(405).json({ message: 'Please use POST /api/auth/register' }));
app.get('/login', (req, res) => res.status(405).json({ message: 'Please use POST /api/auth/login' }));

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
