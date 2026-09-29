import { logger } from "@/utils/logger";
import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error(`Failed to connect to MongoDB ${error}`);
  }
};
