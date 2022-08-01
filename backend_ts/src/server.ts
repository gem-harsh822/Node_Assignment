const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const express = require("express");
// import express from "express";
const cors = require("cors");
import connectDb from "./db/connectDb";
import userRoutes from "./routes/userRoutes";
const app = express();
const port = process.env.SERVER_PORT;
const DATABASE_URL = process.env.DATABASE_URL;
app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);
// Database connection
connectDb(DATABASE_URL);
//for creating json api's

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

console.log("Server running...");
