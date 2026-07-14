require("dotenv").config();

const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
console.log("******** MY SERVER STARTED ********");
const chatRoutes = require("./routes/chatRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Incoming: ${req.method} ${req.path}`);
  next();
});
// Connect MongoDB
connectDB();

// Routes
app.use("/", contactRoutes);
app.use("/", chatRoutes);

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
