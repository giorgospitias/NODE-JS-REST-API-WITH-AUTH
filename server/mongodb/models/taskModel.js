import mongoose from "mongoose";

const Task = new mongoose.Schema(
  {
    user: {
      //We must have a user related to a task
      type: mongoose.Schema.Types.ObjectId, //Objectid is the id of the resourse
      required: true,
      ref: "User", // The objectid refers to User model
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

const TaskSchema = mongoose.model("Task", Task);

export default TaskSchema;
