import express from "express";
import { body } from "express-validator";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  markCompleted,
} from "./task.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

const taskValidation = [
  body("title").trim().notEmpty().withMessage("Title is required").isLength({ max: 100 }).withMessage("Title max 100 characters"),
  body("status").optional().isIn(["Todo", "In Progress", "Done"]).withMessage("Invalid status"),
  body("priority").optional().isIn(["Low", "Medium", "High"]).withMessage("Invalid priority"),
  body("dueDate").optional({ nullable: true }).isISO8601().withMessage("Invalid date format"),
];

router.route("/").get(getTasks).post(taskValidation, createTask);

router.route("/:id").get(getTaskById).put(taskValidation, updateTask).delete(deleteTask);

router.patch("/:id/complete", markCompleted);

export default router;