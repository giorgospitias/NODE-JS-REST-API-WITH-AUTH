import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: "50mb" })); //body must have only 50mb size
app.use(express.urlencoded({ extended: false })); //To be able to put urlencoded data to the body

app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/user", userRoutes);

app.use(errorHandler); //Overwrite the default express error handler

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from server",
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(port, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
