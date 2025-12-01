const express = require("express");
const dotenv = require("dotenv");

// Import DB connection
const connectDb = require("./config/db");

const cors = require("cors");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const getMyBooks = require("./routes/mybooksRoutes");
const bookRoutes = require("./routes/booksRoutes");

// Import Error Handler
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDb();

// CORS (allow frontend access)
const allowedOrigins = [
  'http://localhost:5173',
  'https://books-library-management-yga0.onrender.com'
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // In development, allow all localhost origins
      if (process.env.NODE_ENV !== 'production') {
        if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
          return callback(null, true);
        }
      }

      // Check if origin is in allowed list
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        // In development, allow all origins
        if (process.env.NODE_ENV !== 'production') {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    },
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/mybooks", getMyBooks);
app.use("/api/books", bookRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handler Middleware (must be after all routes)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
