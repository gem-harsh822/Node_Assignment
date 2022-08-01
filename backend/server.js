import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDb from "./config/connectdb.js";
const app = express();
const port = process.env.SERVER_PORT;
const DATABASE_URL = process.env.DATABASE_URL;
app.use(cors());
// Database connection
connectDb(DATABASE_URL);
//for creating json api's
app.use(express.json());
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
