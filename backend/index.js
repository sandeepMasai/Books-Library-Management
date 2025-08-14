const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Import DB connection
const connectDb = require('./config/db');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const getMyBooks = require('./routes/mybooksRoutes');
const bookRoutes = require('./routes/booksRoutes');


dotenv.config(); 

const app = express();

//  Connect to MongoDB
connectDb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/mybooks', getMyBooks);
app.use('/api/books', bookRoutes);

// Test route
app.get('/', (req, res) => {
  res.send(' API is running...');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server listening on port ${PORT}`);
});
