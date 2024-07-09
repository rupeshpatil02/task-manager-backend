import { boolean } from "joi";
import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Task document
export interface ITask extends Document {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  createDate: Date;
  dueDate: Date | null;
  category: string;
  user: number;
  taskId: number;
  starred: boolean;
  status: boolean;
  completedDate: Date; // Reference to the user who created the task
}

// Define the task schema
const taskSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
  },
  createDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  user: {
    type: Number,
    ref: "User", // Reference to the User model
    required: true,
  },
  taskId: {
    type: Number,
    required: true,
  },
  starred: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: false,
  },
  completedDate: {
    type: Date,
    default: null,
  },
});

// Create a Task model using the schema
const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
