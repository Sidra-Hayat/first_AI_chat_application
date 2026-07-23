require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const chatRoutes = require("./routes/chatRoutes");


const app = express();


app.use(cors());

app.use(express.json());


// Connect Database
connectDB();


app.use("/", chatRoutes);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Chat backend running on port ${PORT}`);
});