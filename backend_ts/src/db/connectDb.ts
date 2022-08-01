// import mongoose from "mongoose";
const mongoose = require("mongoose");

const connectDb = async (DATABASE_URL: any) => {
  try {
    const DB_OPTIONS = {
      dbName: "users",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Connected Successfully ..");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
