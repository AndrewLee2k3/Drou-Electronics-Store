import mongoose from "mongoose";

const dbConnect = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("mongo url not defined");
    }
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDb connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default dbConnect;
