const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRouter");
const reviewRouter = require("./routes/reviewRouter");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connection
connectDB();

app.get("/", (req, res) => res.status(200).send("API is working correctly"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

app.listen(PORT, () => console.log(`server running on port ${PORT}`.red));
