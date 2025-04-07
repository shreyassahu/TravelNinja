import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT;

const connect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Connected to MongoDB");
  } catch (error) {
    handleError(error);
  }
};

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth/", authRoute);
app.use("/api/hotels/", hotelsRoute);
app.use("/api/users/", usersRoute);
app.use("/api/rooms/", roomsRoute);

//middleware for error handling
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong!";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

app.listen(port, () => {
  connect();
  console.log(`Listening from port ${process.env.port}`);
});
