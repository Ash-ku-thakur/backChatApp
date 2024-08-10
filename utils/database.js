// getting-started.js
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({})


let databaseConnection = async () => {
  try {
    let dbConnection = await mongoose.connect(process.env.MONGO_URI);
    // .connect(mongoURI, { useNewUrlParser: true })

    if (dbConnection) {
      console.log("db connected");
    } else {
      console.log("db is not connected");
    }
  } catch (error) {
    console.log(error);
  }
};

export default databaseConnection
