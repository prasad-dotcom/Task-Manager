import { validationResult } from "express-validator";
import * as taskService from "./task.service.js";

const createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }
    const task = await taskService.createTask(req.user._id, req.body);
    res.status(201).json({ success: true, message: "Task created", data: { task } });
  } catch (error) { next(error); }
};

const getTasks = async (req, res, next) => {
  try {
    const result = await taskService.getTasks(req.user._id, req.query);
    res.status(200).json({ success: true, data: result });
  } catch (error) { next(error); }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user._id);
    res.status(200).json({ success: true, data: { task } });
  } catch (error) { next(error); }
};

const updateTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }
    const task = await taskService.updateTask(req.params.id, req.user._id, req.body);
    res.status(200).json({ success: true, message: "Task updated", data: { task } });
  } catch (error) { next(error); }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id, req.user._id);
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) { next(error); }
};

const markCompleted = async (req, res, next) => {
  try {
    const task = await taskService.markCompleted(req.params.id, req.user._id);
    res.status(200).json({ success: true, message: "Task marked as completed", data: { task } });
  } catch (error) { next(error); }
};

export { createTask, getTasks, getTaskById, updateTask, deleteTask, markCompleted };