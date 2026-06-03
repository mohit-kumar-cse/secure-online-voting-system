// server/config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in environment variables");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
     
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
 
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB disconnected");
    });

  } catch (error) {
     
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

 
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed on app termination.");
  process.exit(0);
});

export default connectDB;