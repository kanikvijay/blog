import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected To Mongodb Database `);
  } catch (error) {
    console.log(`MongoDB Database Error ${error}`);
  }
};

export default connectDB;
