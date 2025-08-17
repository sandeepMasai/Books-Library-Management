const express = require("express");
const dotenv = require("dotenv");

// Import DB connection
const connectDb = require("./config/db");

const cors = require("cors");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const getMyBooks = require("./routes/mybooksRoutes");
const bookRoutes = require("./routes/booksRoutes");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDb();

// CORS (allow frontend access)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: false, 
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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
