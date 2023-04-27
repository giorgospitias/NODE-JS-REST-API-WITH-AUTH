import express from "express";
const router = express.Router();
import {
  getTask,
  setTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getTask).post(protect, setTask);
router.route("/:id").delete(protect, deleteTask).put(protect, updateTask);

export default router;
